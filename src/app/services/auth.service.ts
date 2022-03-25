import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth
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
}
