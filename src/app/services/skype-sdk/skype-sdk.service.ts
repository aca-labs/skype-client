/// <reference path="skype-sdk.d.ts" />

import { Injectable } from '@angular/core';
import { inject } from '../../util/script-loader';
import * as config from './config';


@Injectable()
export class SkypeSDKService {

    /**
     * Skype SDK client instance this service is wrapping.
     */
    private _client: jCafe.Application;

    /**
     * Lazy loader for the SDK instance.
     *
     * Note: due to the bootstrap and init process this is a Promise.
     */
    get client(): Promise<jCafe.Application> {
        const createInstance = () => this.initialise(config.apiKey)
            .then(client => this._client = client);

        return this._client ? Promise.resolve(this._client) : createInstance();
    }


    initialise(apiKey: string): Promise<jCafe.Application> {
        // Get the SkypeWebSDK bootstrapper
        const bootstrap = (bootstrapURL: string) =>
            new Promise<SkypeBootstrapper>((resolve, reject) => {
                const sdk = () => (<any>window).Skype as SkypeBootstrapper;

                if (sdk()) {
                    resolve(sdk());
                }

                inject(bootstrapURL)
                    .then(() => resolve(sdk()))
                    .catch(() => reject('could not load Skype SDK from CDN'));
            });

        // Initialise a Skype SDK application instance
        const initClient = (sdk: SkypeBootstrapper) =>
            new Promise<jCafe.Application>((resolve, reject) =>
                sdk.initialize({apiKey: config.apiKey}, api => {
                    const client = new api.application();
                    resolve(client);
                }, reject)
            );

        return bootstrap(config.bootstrapURL).then(initClient);
    }
}
