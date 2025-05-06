import {inject, Injectable} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut, user} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** injects **/
  private auth = inject(Auth);
  private router = inject(Router);

  /** variables **/
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    user(this.auth).subscribe((firebaseUser) => {
      this.userSubject.next(firebaseUser);
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      await this.router.navigate(['expenses']);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['login']);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
