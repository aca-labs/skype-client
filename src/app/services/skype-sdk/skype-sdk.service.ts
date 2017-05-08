/// <reference path="skype-sdk.d.ts" />

import { Injectable } from '@angular/core';
import { inject } from './util/script-loader';
import * as config from './config';


@Injectable()
export class SkypeSDKService {

    private static bootstrapper: Promise<SkypeBootstrapper>;

    private clientInstance: Promise<jCafe.Application>;

    /**
     * Access the shared client instance wrapped by this service.
     */
    get client(): Promise<jCafe.Application> {
        if (!this.clientInstance) {
            this.clientInstance = SkypeSDKService.createClient();
        }

        return this.clientInstance;
    }

    /**
     * Create a new instance of the SDK.
     *
     * This may be used to spin up an arbitrary number of SDK instances which
     * can operate simultaneously to support multiple concurrent users.
     */
    static createClient(): Promise<jCafe.Application> {
        const bootstrap = () => SkypeSDKService.bootstrap(config.bootstrapURL);

        const init = (sdk: SkypeBootstrapper) =>
            SkypeSDKService.initClient(sdk, config.apiKey);

        return bootstrap().then(init);
    }

    /**
     * Load the SDK bootstrap script.
     */
    private static bootstrap(bootstrapURL: string): Promise<SkypeBootstrapper> {
        type Maybe<T> = () => T | undefined;

        // The bootstrap script loads the SDK into gloabl scope.
        const bootstrapper: Maybe<SkypeBootstrapper> = () => (<any>window).Skype;

        // Load the bootstrap script and resolve the shiny new bootstrapper.
        const load = () =>
            new Promise<SkypeBootstrapper>((resolve, reject) =>
                inject(bootstrapURL)
                    .then(() => resolve(bootstrapper()))
                    .catch(() => reject('could not load Skype SDK from CDN'))
            );

        // Store a reference to a loaded bootstrapper for future use.
        const store = (sdk: Promise<SkypeBootstrapper>) =>
            SkypeSDKService.bootstrapper = sdk;

        const loadAndStoreSDK = () => store(load());

        return SkypeSDKService.bootstrapper || loadAndStoreSDK();
    }

    /**
     * Initialise an application instance on an SDK bootstrapper.
     */
    private static initClient = (sdk: SkypeBootstrapper, apiKey: string) =>
        new Promise<jCafe.Application>((resolve, reject) =>
            sdk.initialize({apiKey: apiKey},
                           api => resolve(new api.application()),
                           reject)
        )
}
