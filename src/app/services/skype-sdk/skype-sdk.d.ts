/// <reference path="model/s4b.sdk/Application.d.ts" />

interface RenderConversationArgs {
    participants: string[];
    modalities: string[];
}

interface API {
    application: { new (args?): jCafe.Application };
    UIApplicationInstance: jCafe.Application;
    renderConversation(container: string | HTMLElement, args: RenderConversationArgs): jCafe.Promise<jCafe.Conversation>;
}

interface SkypeBootstrapper {
    initialize(
        args: { apiKey: string },
        onSuccess: (api: API) => void,
        onFailure?: (err) => void): any;
}
