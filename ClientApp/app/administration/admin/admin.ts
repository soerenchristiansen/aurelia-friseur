import { User } from "../../shared/user";
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginStatusUpdated } from './../../messages';

@inject(AuthenticationService, EventAggregator)
export class Admin {
    private user: User = new User;
    private signinStatus: boolean = false;

    constructor(private authService: AuthenticationService, ea: EventAggregator) {
        ea.subscribe(LoginStatusUpdated, (msg: LoginStatusUpdated) => {
            this.signinStatus = msg.signinStatus;
            this.authService.getUser().then(user => this.user = user);
        });
    }

    signout() {
        this.authService.signOut();
    }
}