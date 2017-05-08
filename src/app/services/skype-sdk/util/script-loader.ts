/**
 * Inject a script from a remote host (e.g. from a CDN) into the DOM.
 */
export function inject(scriptUrl: string): Promise<Event> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = scriptUrl;
        script.async = true;
        script.onload = resolve;
        script.onerror = script.onabort = reject;

        document.head.appendChild(script);
    });
}
