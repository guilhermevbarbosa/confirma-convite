import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "@angular/fire/auth";

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth;

  constructor(private fApp: FirebaseApp) {
    this.auth = getAuth(fApp);
  }

  createUserEmailPassword(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signOut() {
    return signOut(this.auth)
      .then(() => {
        console.log("Deslogado");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  signInWithEmail(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve: any) => {
      onAuthStateChanged(this.auth, (user: any) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
