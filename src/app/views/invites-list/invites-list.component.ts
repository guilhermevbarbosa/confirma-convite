import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit {
  iS: InviteService;

  invites: any;
  loading: boolean = true;

  constructor(inviteService: InviteService) {
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.invites = this.iS.invites.valueChanges();

    this.invites
      .pipe(take(1))
      .subscribe(() => {
        this.loading = false;
      });
  }

  delete(uid: string) {
    Swal.fire({
      title: 'Deseja excluir este convite',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result['isConfirmed']) {
        this.loading = true;

        this.iS.delete(uid)
          .then(() => {
            this.loading = false;
            Swal.fire(
              'Sucesso!',
              'Deletado com sucesso',
              'success'
            );
          })
          .catch((error) => {
            this.loading = false;

            Swal.fire(
              'Erro!',
              error,
              'error'
            );
            console.log(error);
          })
      }
    })
  }
}
