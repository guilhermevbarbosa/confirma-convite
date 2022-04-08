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
  updateDoc
} from '@angular/fire/firestore';

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
      return updateDoc(document, {
        confirmed: true
      })
    }
  }
}
