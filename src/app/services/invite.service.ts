import { Injectable } from '@angular/core';

import {
  Firestore,
  doc,
  deleteDoc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

import { Invite } from '../models/invite.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private fsRef: Firestore;
  private CHILD_INVITES = '/invites';
  private collectionRef: any;

  constructor(firestore: Firestore) {
    this.fsRef = firestore;
    this.collectionRef = collection(this.fsRef, this.CHILD_INVITES);
  }

  delete(uid: string) {
    const document = doc(this.collectionRef, uid);
    return deleteDoc(document);
  }

  create(invite: Invite) {
    const uid = doc(this.collectionRef).id;

    return setDoc(doc(this.collectionRef, uid), {
      uid,
      code: invite.code,
      name: invite.name,
      amount: invite.amount,
      confirmed: false,
    });
  }

  async activateInvite(inviteCode: string) {
    let searchedInvite: any;
    let searchedInviteUid: any;
    const q: any = query(this.collectionRef, where("code", "==", inviteCode));

    const docSnap = await getDocs(q);
    docSnap.forEach((responseDoc) => {
      searchedInvite = responseDoc.data();
      searchedInviteUid = searchedInvite.uid;
    });

    if (searchedInvite == undefined) {
      throw new Error("Código inválido");
    }

    if (searchedInvite.confirmed) {
      throw new Error("Convite já confirmado");
    } else {
      const document = doc(this.collectionRef, searchedInviteUid);

      Swal.fire({
        title: 'Atenção!',
        icon: 'info',
        html:
          `Deseja confirmar esse convite? <br><br>` +
          `Ele dá acesso a festa a ` +
          `<strong style="font-size: 30px">${searchedInvite.amount}</strong> convidados.`,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result['isConfirmed']) {
          updateDoc(document, {
            confirmed: true
          }).then(() => {
            Swal.fire(
              'Que legal!',
              'Presença confirmada com sucesso',
              'success'
            );
          }).catch((e) => {
            throw new Error(e);
          })
        }
      })
    }
  }
}
