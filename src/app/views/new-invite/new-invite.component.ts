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
    amount: 0
  };

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void { }

  onSave(invite: Invite): void {
    this.iS.create(invite).then(() => {
      Swal.fire(
        'Sucesso!',
        'Convite criado com sucesso',
        'success'
      );
    }).catch((error) => {
      Swal.fire(
        'Erro!',
        error,
        'error'
      );
      console.log(error)
    })
  }

  createInvite() {
    this.onSave(this.invite);
  }
}
