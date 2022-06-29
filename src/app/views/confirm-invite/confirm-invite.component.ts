import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-invite',
  templateUrl: './confirm-invite.component.html',
  styleUrls: ['./confirm-invite.component.scss']
})
export class ConfirmInviteComponent implements OnInit {
  iS: InviteService;
  route: any;

  loading = false;
  inviteCode = '';
  inviteCodeErrorMessage = '';

  constructor(inviteService: InviteService, route: ActivatedRoute) {
    this.iS = inviteService;
    this.route = route;
  }

  ngOnInit() {
    this.inviteCode = this.route.snapshot.queryParamMap.get("inviteCode");
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
