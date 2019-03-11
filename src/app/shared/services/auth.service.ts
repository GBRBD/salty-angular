import { Observable } from 'rxjs';
import * as Firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {
    this.getUserStateFromFirebase();
  }

  get getUserState(): Observable<User> {
    return this.user;
  }

  get getIdToken(): Observable<string | null> {
    return this.afAuth.idToken;
  }

  signIn(user: User): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  signUp(user: User): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  updateEmail(newEmail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newEmail);
  }

  updatePassword(newPassword: string) {
    return this.afAuth.auth.currentUser.updatePassword(newPassword);
  }

  sendPasswordReset(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  verifyPasswordResetCode(oobCode: string) {
    return this.afAuth.auth.verifyPasswordResetCode(oobCode);
  }

  confirmPasswordReset(oobCode: string, newPassword: string) {
    return this.afAuth.auth.confirmPasswordReset(oobCode, newPassword);
  }

  reauthenticateAndRetrieveDataWithCredential(email: string, password: string) {
    const credential = this.getEmailProviderCredential(email, password);
    return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(
      credential
    );
  }

  private getUserStateFromFirebase() {
    this.user = this.afAuth.user;
  }

  private getEmailProviderCredential(email: string, password: string) {
    return Firebase.auth.EmailAuthProvider.credential(email, password);
  }
}
