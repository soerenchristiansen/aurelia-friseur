import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import oidcConfiguration from './oidc-configuration';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration();

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
        config.withDefaults({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/shell/shell')));

}
