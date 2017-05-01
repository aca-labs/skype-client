import { Injectable } from '@angular/core';

import { inject } from '../util/script-loader';

import config from './skype-sdk.config';


@Injectable()
export class SkypeSDKService {

    app: any;

    constructor() {
        this.initialise(config.apiKey).then(console.log);
    }

    initialise(apiKey: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            // FIXME: check for existint of global Skype object first and only
            // load the bootstrap script if required
            inject(config.bootstrapURL).then(() => {
                const sdk = (<any>window).Skype;

                sdk.initialize({apiKey: config.apiKey}, api => {
                    this.app = api.application();
                    resolve(this.app);
                }, reject);

            }).catch(reject);
        });
    }
}
