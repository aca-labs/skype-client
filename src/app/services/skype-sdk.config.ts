// Publicly available API keys for accessing the Skype Web SDK bootstrapper.
// https://msdn.microsoft.com/en-us/skype/websdk/docs/apiproductkeys
const apiKeys = {
    preview: {
        sdk: 'a42fcebd-5b43-4b89-a065-74450fb91255',
        ui: '9c967f6b-a846-4df2-b43d-5167e47d81e1'
    },
    ga: {
        sdk: '595a1aeb-e6dc-4e5b-be96-bb38adc83da1',
        ui: '08c97289-7d57-404f-bd97-a6047403e370'
    }
};

export default {

    // URL provided from https://msdn.microsoft.com/en-us/skype/websdk/docs/gettingstarted
    bootstrapURL: 'https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js',

    // Key to use in the app's SDK instance
    // TODO: switch this to GA when appropriate feature set is available
    apiKey: apiKeys.preview.sdk

};
