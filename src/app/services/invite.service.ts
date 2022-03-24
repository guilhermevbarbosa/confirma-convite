import { Injectable } from '@angular/core';

import { Firestore, doc, deleteDoc, collection, setDoc } from '@angular/fire/firestore';

import { Invite } from '../models/invite.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private fsRef: Firestore;
  private CHILD_INVITES = '/invites';
  private cities: any = [];

  constructor(firestore: Firestore) {
    this.fsRef = firestore;
  }

  delete(uid: string) {
    const document = doc(this.fsRef, this.CHILD_INVITES, uid);
    return deleteDoc(document);
  }

  create(invite: Invite) {
    const uid = doc(collection(this.fsRef, this.CHILD_INVITES)).id;

    return setDoc(doc(this.fsRef, this.CHILD_INVITES, uid), {
      uid,
      code: invite.code,
      name: invite.name,
      amount: invite.amount,
      confirmed: false,
    });
  }
}
