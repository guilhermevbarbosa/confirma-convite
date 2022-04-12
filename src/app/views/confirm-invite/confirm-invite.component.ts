import { Component, OnInit } from '@angular/core';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html',
  styleUrls: ['./confirm-invite.component.scss']
})
export class ConfirmInviteComponent {
  iS: InviteService;

  loading = false;
  inviteCode = '';
  inviteCodeErrorMessage = '';

  invite: any;

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  activateInvite() {
    if (this.inviteCode.length < 5) {
      this.inviteCodeErrorMessage = "O código deve ter 5 caracteres.";
    } else {
      this.inviteCodeErrorMessage = '';
      this.loading = true;

      this.iS.activateInvite(this.inviteCode)
        .then(() => {
          this.loading = false;
        }).catch((error) => {
          this.loading = false;

          let errString = String(error);
          errString = errString.replace("Error:", "");

          Swal.fire(
            'Erro!',
            errString,
            'error'
          );
        })
    }
  }
}
