import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-register-form',
  templateUrl: './player-register-form.component.html',
  styleUrls: ['./player-register-form.component.css']
})
export class PlayerRegisterFormComponent {

  constructor(private router: Router) { }

  btnRegister(): void {
     this.router.navigate(['/login']);
  }

  isVisiblePassword: Boolean = false;
  togglePassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  isVisibleConfirmPasssword: Boolean = false;
  toggleConfirmPassword(): void {
      this.isVisibleConfirmPasssword = !this.isVisibleConfirmPasssword;
    }
}
