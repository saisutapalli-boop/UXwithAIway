import { Injectable, inject, signal, computed } from '@angular/core';
import { 
  Auth, 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  OAuthProvider, 
  onAuthStateChanged, 
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from '@angular/fire/auth';
import { AppUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private currentUser = signal<User | null>(null);
  private confirmationResult: ConfirmationResult | null = null;

  user = computed<AppUser | null>(() => {
    const u = this.currentUser();
    if (!u) return null;
    return {
      uid: u.uid,
      email: u.email,
      displayName: u.displayName || u.phoneNumber || 'User',
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

  // New: Email/Password Authentication
  async signInWithEmail(email: string, pass: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, pass);
  }

  async signUpWithEmail(email: string, pass: string, name: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    await updateProfile(credential.user, { displayName: name });
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  // New: Phone Authentication
  async sendOtp(phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<void> {
    this.confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);
  }

  async verifyOtp(otp: string): Promise<void> {
    if (!this.confirmationResult) {
      throw new Error('No OTP request found. Please try again.');
    }
    await this.confirmationResult.confirm(otp);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
