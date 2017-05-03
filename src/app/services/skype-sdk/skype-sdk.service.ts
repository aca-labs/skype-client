/// <reference path="skype-sdk.d.ts" />

import { Injectable } from '@angular/core';
import { inject } from './util/script-loader';
import * as config from './config';


@Injectable()
export class SkypeSDKService {

    /**
     * Skype SDK instance this service is wrapping.
     */
    private _client: jCafe.Application;

    /**
     * Access the shared client instance wrapped by this service.
     */
    get client(): Promise<jCafe.Application> {
        const existingClient = () => Promise.resolve(this._client);

        const newClient = () => SkypeSDKService.createClient()
            .then(client => this._client = client);

        return this._client ? existingClient() : newClient();
    }

    /**
     * Create a new instance of the SDK. This may be used to spin up an
     * arbitrary number of SDK instances which can operate simultaneously to
     * support multiple concurrent users.
     */
    static createClient(): Promise<jCafe.Application> {
        const bootstrap = () => SkypeSDKService.bootstrap(config.bootstrapURL);

        const initClient = (sdk: SkypeBootstrapper) =>
            SkypeSDKService.initClient(sdk, config.apiKey);

        return bootstrap().then(initClient);
    }

    /**
     * Load the SDK bootstrap script.
     */
    private static bootstrap = (bootstrapURL: string) =>
        new Promise<SkypeBootstrapper>((resolve, reject) => {
            // Script loads the SDK into a gloabl `window.Skype` variable
            const sdk = () => (<any>window).Skype as SkypeBootstrapper;

            const loadSDK = () => inject(bootstrapURL)
                .then(() => resolve(sdk()))
                .catch(() => reject('could not load Skype SDK from CDN'));

            sdk() ? resolve(sdk()) : loadSDK();
        });

    /**
     * Initialise an application instance on an SDK bootstrapper.
     */
    private static initClient = (sdk: SkypeBootstrapper, apiKey: string) =>
        new Promise<jCafe.Application>((resolve, reject) =>
            sdk.initialize({apiKey: apiKey},
                           api => resolve(new api.application()),
                           reject)
        );
}
