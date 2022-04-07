import { Component, OnInit } from '@angular/core';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

import {
  Firestore,
  collection,
  onSnapshot,
  CollectionReference
} from '@angular/fire/firestore';
import { Invite } from 'src/app/models/invite.model';
import { PaginationInstance } from '../../../../../node_modules/ngx-pagination/dist/ngx-pagination.module';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrls: ['./invites-list.component.scss']
})
export class InvitesListComponent implements OnInit {
  fsRef: Firestore;
  iS: InviteService;
  node: CollectionReference;

  loading: boolean = true;

  allInvites: Array<Invite> = [];

  filteredConfirmedInvites: Array<Invite> = [];
  confirmedInvitesNumber = 0;
  totalInvitedGuests = 0;
  totalInvitedConfirmedGuests = 0;

  paginationId = 'custom-pagination'!;

  public config: PaginationInstance = {
    id: this.paginationId,
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(firestore: Firestore, inviteService: InviteService) {
    this.fsRef = firestore;
    this.iS = inviteService;
    this.node = collection(this.fsRef, '/invites');
  }

  ngOnInit(): void {
    this.getAllInvites();
  }

  getAllInvites() {
    onSnapshot(this.node, (snapshot: any) => {
      this.allInvites = [];

      snapshot.forEach((doc: any) => {
        this.allInvites.push(doc.data());
      });

      this.handleCountFunctions();
      this.loading = false;
    });
  }

  filterConfirmeds() {
    this.filteredConfirmedInvites = this.allInvites.filter(invite => (invite.confirmed));
    this.confirmedInvitesNumber = this.filteredConfirmedInvites.length;
  }

  countTotalGuests() {
    this.totalInvitedGuests = this.allInvites.reduce((valor, item) => {
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
