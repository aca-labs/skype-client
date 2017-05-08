declare module jCafe {
    export interface Conversation {
        state: Property<string>;

        /**
         * A collection of extensions that provide channels for clients to
         * send and receive data from the corresponding services
         */
        extensions: Collection<ConversationExtension>;

        phoneAudioService: PhoneAudioService;

        /** The participant should then be added to the participants collection */
        createParticipant(sipUri: string): Participant;
    }
}
