import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) { }
  type = [
    {value: 'service', viewValue: 'Service'},
    {value: 'user', viewValue: 'User'},
  ];

  ngOnInit() {
  }

  createUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password, form.value.number, form.value.name);
  }

  selectType(value) {
  console.log("RegisterComponent -> selectType -> value", value)

  }
}
