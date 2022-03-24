import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Invite } from '../models/invite.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private CHILD_INVITES = '/invites';
  invites!: AngularFirestoreCollection<Invite>;

  constructor(private db: AngularFirestore) {
    this.set();
  }

  private set(): void {
    this.invites = this.db.collection<Invite>(this.CHILD_INVITES,
      (ref: CollectionReference) => ref.orderBy('name', 'desc'));
  }

  create(invite: Invite): Promise<void> {
    const uid = this.db.createId();

    return this.invites.doc<Invite>(uid).set({
      uid,
      code: invite.code,
      name: invite.name,
      amount: invite.amount,
      confirmed: false,
    });
  }

  get(uid: string): Observable<any> {
    return this.invites.doc<Invite>(uid).valueChanges();
  }

  delete(uid: string): Promise<void> {
    return this.invites.doc<Invite>(uid).delete();
  }
}
