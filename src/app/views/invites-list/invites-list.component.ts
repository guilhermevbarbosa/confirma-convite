import { Component, OnInit } from '@angular/core';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Invite } from 'src/app/models/invite.model';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit {
  fsRef: Firestore;
  iS: InviteService;

  invites: Array<Invite> = [];
  loading: boolean = true;

  constructor(firestore: Firestore, inviteService: InviteService) {
    this.fsRef = firestore;
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    const node = collection(this.fsRef, '/invites');

    onSnapshot(node, (querySnapshot: any) => {
      this.invites = [];

      querySnapshot.forEach((doc: any) => {
        this.invites.push(doc.data());
      });

      this.loading = false;
    });
  }

  delete(uid: string) {
    Swal.fire({
      title: 'Deseja excluir este convite?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result['isConfirmed']) {
        this.loading = true;

        this.iS.delete(uid)
          .then(() => {
            Swal.fire(
              'Sucesso!',
              'Deletado com sucesso',
              'success'
            );

            this.loading = false;
          })
          .catch((error) => {
            Swal.fire(
              'Erro!',
              error,
              'error'
            );

            this.loading = false;
          })
      }
    })
  }
}
