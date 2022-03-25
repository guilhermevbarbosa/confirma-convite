import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authService: AuthService;
  user: User = {
    email: '',
    password: '',
  };

  loading = false;
  inputNameErrorMessage = '';
  inputPassErrorMessage = '';

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void { }

  resetFields() {
    this.user.email = '';
    this.user.password = '';
  }

  createUser() {
    this.verifyFields();
  }

  verifyFields() {
    let errors = 0;

    if (this.user.email.length < 3) {
      this.inputNameErrorMessage = 'É necessário no mínimo 3 caracteres.';
      errors++;
    } else {
      this.inputNameErrorMessage = '';
    }

    if (this.user.password.length < 3) {
      this.inputPassErrorMessage = 'É necessário pelo 3 caracteres.';
      errors++;
    } else {
      this.inputPassErrorMessage = '';
    }

    if (errors) {
      return false;
    } else {
      return this.onSave();
    }
  }

  onSave(): void {
    this.loading = true;

    this.authService.createUserEmailPassword(this.user)
      .then((userCredential) => {
        const user = userCredential.user;

        Swal.fire(
          'Sucesso!',
          `Usuário de e-mail ${user.email} criado com sucesso!`,
          'success'
        );

        this.resetFields();
        this.loading = false;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire(
          `Erro ${errorCode}`,
          `${errorMessage}`,
          'error'
        );

        this.loading = false;
      });
  }
}
