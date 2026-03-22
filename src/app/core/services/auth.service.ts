import { Injectable, inject, signal, computed } from '@angular/core';
import { Auth, signInWithPopup, signOut, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { AppUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private currentUser = signal<User | null>(null);

  user = computed<AppUser | null>(() => {
    const u = this.currentUser();
    if (!u) return null;
    return {
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      photoURL: u.photoURL,
      provider: u.providerData[0]?.providerId || 'unknown',
    };
  });

  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  async signInWithGoogle(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async signInWithGithub(): Promise<void> {
    await signInWithPopup(this.auth, new GithubAuthProvider());
  }

  async signInWithMicrosoft(): Promise<void> {
    const provider = new OAuthProvider('microsoft.com');
    await signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
