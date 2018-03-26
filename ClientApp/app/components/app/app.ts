import { LoginStatusUpdated } from './../../messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthenticationService } from './../../services/authentication.service';
import { AuthorizeStep } from './../../shared/authorize-step';
import { Aurelia, PLATFORM, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { User } from "../../shared/user";

@inject(AuthenticationService, EventAggregator)
export class App {
    private router: Router;
    private user: User;
    private signinStatus: boolean = false;

    constructor(private authService: AuthenticationService, ea: EventAggregator) {
        ea.subscribe(LoginStatusUpdated, (msg: LoginStatusUpdated) => {
            this.signinStatus = msg.signinStatus;
            this.authService.getUser().then(user => this.user = user);
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'AureliaFriseur';
        config.options.pushState = true;
        config.addAuthorizeStep(AuthorizeStep);
        config.map([{
            route: ['', 'home'],
            name: 'home',
            moduleId: PLATFORM.moduleName('../home/home'),
            nav: true,
            title: 'Home'
        }, {
            route: 'counter',
            name: 'counter',
            moduleId: PLATFORM.moduleName('../counter/counter'),
            nav: true,
            title: 'Counter'
        }, {
            route: 'fetch-data',
            name: 'fetchdata',
            moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
            nav: true,
            title: 'Fetch data',
            auth: true
        }, {
            route: 'customers',
            name: 'customers',
            moduleId: PLATFORM.moduleName('../customers/customers'),
            nav: true,
            title: 'Customers'
        }, {
            route: 'login',
            name: 'login',
            moduleId: PLATFORM.moduleName('../login/login'),
            title: 'Login'
        }, {
            route: 'admin',
            name: 'admin',
            layoutView: 'app/administration/admin/admin.html',
            moduleId: PLATFORM.moduleName('../../administration/admin/admin'),
            title: 'Admin'
        }, {
            route: 'profiles',
            name: 'profiles',
            moduleId: PLATFORM.moduleName('../../administration/identities/identities'),
            title: 'Profiles'
        }
        ]);

        // config.mapUnknownRoutes('home');

        this.router = router;
    }

    signout() {
        this.authService.signOut();
    }
}
