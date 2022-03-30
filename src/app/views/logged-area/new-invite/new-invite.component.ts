import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Invite } from 'src/app/models/invite.model';
import { InviteService } from 'src/app/services/invite.service';

@Component({
  selector: 'app-new-invite',
  templateUrl: './new-invite.component.html',
  styleUrls: ['./new-invite.component.scss']
})
export class NewInviteComponent implements OnInit {
  iS: InviteService;
  invite: Invite = {
    name: '',
    amount: 0,
    code: '',
  };

  loading = false;
  inputNameErrorMessage = '';
  inputQuantErrorMessage = '';

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void { }

  resetInvite() {
    this.invite.name = '';
    this.invite.amount = 0;
  }

  createInvite() {
    this.verifyFields();
  }

  verifyFields() {
    let errors = 0;

    if (this.invite.name.length < 3) {
      this.inputNameErrorMessage = 'É necessário no mínimo 3 caracteres.';
      errors++;
    } else {
      this.inputNameErrorMessage = '';
    }

    if (this.invite.amount == 0) {
      this.inputQuantErrorMessage = 'É necessário pelo menos um convidado';
      errors++;
    } else {
      this.inputQuantErrorMessage = '';
    }

    if (errors) {
      return false;
    } else {
      this.invite.code = this.generateUniqueCode();
      return this.onSave(this.invite);
    }
  }

  generateUniqueCode() {
    return (Math.floor(Date.now() * Math.random()).toString(36)).slice(0, 5);
  }

  onSave(invite: Invite): void {
    this.loading = true;

    this.iS.create(invite)
      .then(() => {
        this.loading = false;
        this.resetInvite();

        Swal.fire(
          'Sucesso!',
          'Convite criado com sucesso',
          'success'
        );
      }).catch((error) => {
        this.loading = false;

        Swal.fire(
          'Erro!',
          error,
          'error'
        );
        console.log(error);
      })
  }
}
