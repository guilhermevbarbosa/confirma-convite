import { Component, OnInit } from '@angular/core';

import { InviteService } from 'src/app/services/invite.service';
import Swal from 'sweetalert2';

import {
  Firestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  Query,
  CollectionReference,
  endAt
} from '@angular/fire/firestore';
import { Invite } from 'src/app/models/invite.model';

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

  allInvitesNoFilter: Array<Invite> = [];
  filteredConfirmedInvites: Array<Invite> = [];
  confirmedInvitesNumber = 0;
  totalInvitedGuests = 0;
  totalInvitedConfirmedGuests = 0;

  invitesItensWithPagination: Array<Invite> = [];
  lastVisibleCard: any;
  cardsInPage = 4;

  constructor(firestore: Firestore, inviteService: InviteService) {
    this.fsRef = firestore;
    this.iS = inviteService;
    this.node = collection(this.fsRef, '/invites');
  }

  ngOnInit(): void {
    this.getAllToCountFunctions();
    this.getPagination();
  }

  getAllToCountFunctions() {
    onSnapshot(this.node, (snapshot: any) => {
      this.allInvitesNoFilter = [];

      snapshot.forEach((doc: any) => {
        this.allInvitesNoFilter.push(doc.data());
      });

      this.handleCountFunctions();
      this.loading = false;
    });
  }

  filterConfirmeds() {
    this.filteredConfirmedInvites = this.allInvitesNoFilter.filter(invite => (invite.confirmed));
    this.confirmedInvitesNumber = this.filteredConfirmedInvites.length;
  }

  countTotalGuests() {
    this.totalInvitedGuests = this.allInvitesNoFilter.reduce((valor, item) => {
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

  private realTimeSearchToPaginate(queryTerm: Query<DocumentData>) {
    onSnapshot(queryTerm, (snapshot: any) => {
      if (snapshot.docs.length > 0) {
        this.lastVisibleCard = snapshot.docs[snapshot.docs.length - 1];
        this.invitesItensWithPagination = [];

        snapshot.forEach((doc: any) => {
          this.invitesItensWithPagination.push(doc.data());
        });
      }
    });
  }

  getPagination() {
    const q = query(this.node, orderBy("name"), limit(this.cardsInPage));
    this.realTimeSearchToPaginate(q);
  }

  nextPage() {
    const next = query(this.node, orderBy("name"), startAfter(this.lastVisibleCard), limit(this.cardsInPage));
    this.realTimeSearchToPaginate(next);
  }

  previousPage() {
    const previous = query(this.node, orderBy("name"), endAt(this.lastVisibleCard), limit(this.cardsInPage));
    this.realTimeSearchToPaginate(previous);
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
