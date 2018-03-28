import { AuthorizeStep } from './../shared/authorize-step';
import { PLATFORM, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class Shell {
    private router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'AureliaFriseur';
        config.options.pushState = true;
        config.addAuthorizeStep(AuthorizeStep);
        config.map([
            {
                route: '',
                redirect: 'home',
                name: 'app',
                moduleId: PLATFORM.moduleName('../components/app/app'),
                title: 'App'
            },
            {
                route: 'home',
                name: 'home',
                moduleId: PLATFORM.moduleName('../components/home/home'),
                nav: true,
                title: 'Home'
            },
            {
                route: 'counter',
                name: 'counter',
                moduleId: PLATFORM.moduleName('../components/counter/counter'),
                nav: true,
                title: 'Counter'
            },
            {
                route: 'fetch-data',
                name: 'fetchdata',
                moduleId: PLATFORM.moduleName('../components/fetchdata/fetchdata'),
                nav: true,
                title: 'Fetch data'
            },
            {
                route: 'customers',
                name: 'customers',
                moduleId: PLATFORM.moduleName('../components/customers/customers'),
                nav: true,
                title: 'Customers'
            },
            {
                route: 'login',
                name: 'login',
                layoutView: 'app/components/login/login.html',
                layoutViewModel: PLATFORM.moduleName('app/components/login/login'),
                moduleId: PLATFORM.moduleName('../components/login/login'),
                title: 'Login'
            },
            {
                route: 'admin',
                name: 'admin',
                layoutView: 'app/administration/admin/admin.html',
                layoutViewModel: PLATFORM.moduleName('app/administration/admin/admin'),
                moduleId: PLATFORM.moduleName('app/administration/admin/admin'),
                title: 'Admin'
            }
        ]);

        config.mapUnknownRoutes('home');

        this.router = router;
    }
}