import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authService: AuthService;
  user: User = {
    email: '',
    password: '',
  };
  router: Router;

  loading = false;
  inputNameErrorMessage = '';
  inputPassErrorMessage = '';

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.verifyIsLoggedIn();
  }

  verifyIsLoggedIn() {
    this.authService.isLoggedIn()
      .then((res) => {
        if (res) {
          this.router.navigateByUrl('/admin/convites');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  resetFields() {
    this.user.email = '';
    this.user.password = '';
  }

  login() {
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

    this.authService.signInWithEmail(this.user)
      .then((cred) => {
        if (cred.user) {
          this.router.navigateByUrl("/admin/convites");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/user-not-found") {
          Swal.fire(
            "Usuário não encontrado",
            "Verifique o e-mail informado",
            'error'
          );
        } else if (errorCode == "auth/wrong-password") {
          Swal.fire(
            "Senha errada",
            "Verifique a senha informada",
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
