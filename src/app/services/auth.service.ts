import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  router: Router;

  constructor(private fApp: FirebaseApp, router: Router) {
    this.auth = getAuth(fApp);
    this.router = router;
  }

  createUserEmailPassword(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signOut() {
    return signOut(this.auth)
      .then(() => {
        this.router.navigateByUrl("/")
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
