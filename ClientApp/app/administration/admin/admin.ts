import { AuthorizeStep } from './../../shared/authorize-step';
import { Router, RouterConfiguration } from 'aurelia-router';
import { User } from "../../shared/user";
import { inject, PLATFORM } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginStatusUpdated } from './../../messages';

@inject(AuthenticationService, EventAggregator)
export class Admin {
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
        config.map([
            {
                route: ['', 'profiles'],
                name: 'profiles',
                moduleId: PLATFORM.moduleName('../profiles/profiles'),
                title: 'Profiles',
                nav: true,
                auth: true
            },
            {
                route: 'test',
                name: 'test',
                moduleId: PLATFORM.moduleName('app/components/counter/counter'),
                nav: true,
                title: 'Test'
            }
        ]);

        this.router = router;
    }

    signout() {
        this.authService.signOut();
    }
}