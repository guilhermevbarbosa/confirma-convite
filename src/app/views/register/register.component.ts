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
    const re = /\S+@\S+\.\S+/;

    if (!re.test(this.user.email)) {
      this.inputNameErrorMessage = 'E-mail inválido.';
      errors++;
    } else {
      this.inputNameErrorMessage = '';
    }

    if (this.user.password.length < 6) {
      this.inputPassErrorMessage = 'É necessário pelo menos 6 caracteres.';
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

        if (errorCode == "auth/email-already-in-use") {
          Swal.fire(
            "Email já utilizado.",
            "Utilize outro e-mail para o cadastro.",
            'error'
          );
        } else {
          Swal.fire(
            `Erro ${errorCode}`,
            `${errorMessage}`,
            'error'
          );
        }

        this.loading = false;
      });
  }
}
