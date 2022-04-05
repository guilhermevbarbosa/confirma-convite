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

  loading: boolean = true;
  invites: Array<Invite> = [];

  filteredConfirmedInvites: Array<Invite> = [];
  confirmedInvitesNumber = 0;
  totalInvitedGuests = 0;
  totalInvitedConfirmedGuests = 0;

  constructor(firestore: Firestore, inviteService: InviteService) {
    this.fsRef = firestore;
    this.iS = inviteService;
  }

  ngOnInit(): void {
    this.getAll();
  }

  filterConfirmeds() {
    this.filteredConfirmedInvites = this.invites.filter(invite => (invite.confirmed));
    this.confirmedInvitesNumber = this.filteredConfirmedInvites.length;
  }

  countTotalGuests() {
    this.totalInvitedGuests = this.invites.reduce((valor, item) => {
      return (Number(valor) + Number(item.amount));
    }, 0);
  }

  countTotalConfirmedGuests() {
    this.totalInvitedConfirmedGuests = this.filteredConfirmedInvites.reduce((valor, item) => {
      return (Number(valor) + Number(item.amount));
    }, 0);
  }

  handleCountFunctions() {
    this.filterConfirmeds();
    this.countTotalGuests();
    this.countTotalConfirmedGuests();
  }

  getAll() {
    const node = collection(this.fsRef, '/invites');

    onSnapshot(node, (snapshot: any) => {
      this.invites = [];

      snapshot.forEach((doc: any) => {
        this.invites.push(doc.data());
      });

      this.handleCountFunctions();
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
