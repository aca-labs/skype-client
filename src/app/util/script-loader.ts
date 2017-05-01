/**
 * Inject a script from a remote host (e.g. from a CDN) into the DOM.
 */
export function inject(scriptUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const insertionPoint = document.getElementsByTagName('script')[0];
        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = scriptUrl;
        script.async = true;
        script.onload = resolve;
        script.onerror = script.onabort = reject;

        insertionPoint.parentNode.insertBefore(script, insertionPoint);
    });
}
