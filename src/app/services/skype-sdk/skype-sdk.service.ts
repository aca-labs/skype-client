/// <reference path="skype-sdk.d.ts" />

import { Injectable } from '@angular/core';
import { inject } from '../../util/script-loader';
import config from './skype-sdk.config';


@Injectable()
export class SkypeSDKService {

    client: jCafe.Application;

    constructor() {
        this.initialise(config.apiKey).then(console.log);
    }

    initialise(apiKey: string): Promise<jCafe.Application> {
        // Get the SkypeWebSDK bootstrapper
        const bootstrap = () => new Promise<SkypeBootstrapper>((resolve, reject) => {
            const sdk = () => (<any>window).Skype as SkypeBootstrapper;

            if (sdk()) {
                resolve(sdk());
            }

            inject(config.bootstrapURL)
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

        return new Promise<jCafe.Application>((resolve, reject) =>
            bootstrap()
                .then(initClient)
                .then((client) => {
                    this.client = client;
                    console.log('Skype client initialised');
                    resolve(client);
                })
                .catch((err) => {
                    console.error(`Error initialising Skype client: ${err}`);
                    reject(err);
                })
        );
    }
}
