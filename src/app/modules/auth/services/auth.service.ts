import {computed, inject, Injectable} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut, user} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {toSignal} from '@angular/core/rxjs-interop';
import {Timestamp} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** injects **/
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);


  /** observable user getting signal **/
  private user$ = user(this.auth);
  public userSignal = toSignal(this.user$, {initialValue: null});


  /** Computed to getting access directly **/
  public uid = computed(() => this.userSignal()?.uid ?? null);
  public displayName = computed(() => this.userSignal()?.displayName ?? '');
  public email = computed(() => this.userSignal()?.email ?? '');


  /** login with a Google account **/
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const user = result.user;

      /** saves and update into Firestore **/
      const userRef = doc(this.firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: Timestamp.now(),
      }, {merge: true});

      await this.router.navigate(['/expenses']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  /** logout **/
  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/auth']);
  }

  // /** variables **/
  // private userSubject = new BehaviorSubject<User | null>(null);
  //
  //
  // constructor() {
  //   user(this.auth).subscribe((firebaseUser) => {
  //     this.userSubject.next(firebaseUser);
  //   });
  // }
  //
  // get currentUser(): User | null {
  //   return this.auth.currentUser;
  // }

  // async loginWithGoogle(): Promise<void> {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(this.auth, provider);
  //     await this.router.navigate(['expenses']);
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // }

  // async logout(): Promise<void> {
  //   await signOut(this.auth);
  //   await this.router.navigate(['/auth']);
  // }
}
