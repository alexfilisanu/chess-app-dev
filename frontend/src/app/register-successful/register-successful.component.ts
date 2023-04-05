import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-register-successful',
    templateUrl: './register-successful.component.html',
    styleUrls: ['./register-successful.component.css']
})

export class RegisterSuccessfulComponent {
    constructor(private route: ActivatedRoute, private router: Router) { }

    gotoLogin(): void {
        this.router.navigate(['/login']);
    }
}
