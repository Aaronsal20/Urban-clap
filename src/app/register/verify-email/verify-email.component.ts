import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  isLoading = false;
  verify = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  verifyUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.verifyEmail(form.value.token).subscribe(result => {
    console.log("VerifyEmailComponent -> verifyUser -> result", result);
    if (result.done) {
      this.verify = true
    }

    });
  }

}
