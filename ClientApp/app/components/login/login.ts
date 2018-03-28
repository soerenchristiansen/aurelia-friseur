import { AuthenticationService } from './../../services/authentication.service';
import { inject } from 'aurelia-framework';

@inject(AuthenticationService)
export class login {
    userName: string = "astonvilla83@hotmail.com";
    password: string = "#34Hamster9";
    error: string = "";
    hasError: boolean = false;

    constructor(private authenticationService: AuthenticationService) {

    }

    login() {
        this.authenticationService.login(this.userName, this.password)
            .then(result => this.hasError = false)
            .catch(error => {
                this.hasError = true;
                this.error = error.error_description;
            })
    }

    refreshToken() {
        this.authenticationService.refreshToken();
    }
}