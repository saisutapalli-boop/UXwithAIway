import { Component, ChangeDetectionStrategy, inject, signal, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="login-section">
      <div class="container">
        <div class="login-card card">
          <div class="login-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" class="logo-icon" aria-hidden="true">
              <rect width="40" height="40" rx="9" fill="#b1000e"/>
              <path d="M9 9 L9 22 Q9 32 20 32 Q31 32 31 22 L31 9" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="14.5" cy="18.5" r="2.3" fill="white"/>
              <circle cx="25.5" cy="18.5" r="2.3" fill="white"/>
              <circle cx="20" cy="26.5" r="2.3" fill="white"/>
            </svg>
            <h1>Sign in to <span class="logo-text">UXwithAIway</span></h1>
            <p>Access your personalized UX workflow strategies</p>
          </div>

          @if (error()) {
            <div class="error-message" role="alert">{{ error() }}</div>
          }

          <div class="auth-tabs" role="tablist" aria-label="Authentication Methods">
            <button 
              role="tab" 
              [attr.aria-selected]="authMode() === 'phone'" 
              [class.active]="authMode() === 'phone'" 
              (click)="authMode.set('phone')"
              aria-controls="phone-panel">
              Phone
            </button>
            <button 
              role="tab" 
              [attr.aria-selected]="authMode() === 'email'" 
              [class.active]="authMode() === 'email'" 
              (click)="authMode.set('email')"
              aria-controls="email-panel">
              Email
            </button>
          </div>

          <div class="auth-content">
            
            @if (authMode() === 'phone') {
              <div class="phone-auth" id="phone-panel" role="tabpanel">
                @if (step() === 'send') {
                  <div class="otp-toggle">
                    <button 
                      type="button"
                      class="toggle-label" 
                      [class.selected]="otpType() === 'sms'" 
                      (click)="otpType.set('sms')"
                      aria-label="Send OTP via SMS">
                      Normal SMS
                    </button>
                    <div class="toggle-switch" (click)="toggleOtpType()" role="button" [attr.aria-label]="'Switch to ' + (otpType() === 'sms' ? 'WhatsApp' : 'SMS')">
                      <div class="switch-handle" [class.right]="otpType() === 'whatsapp'"></div>
                    </div>
                    <button 
                      type="button"
                      class="toggle-label" 
                      [class.selected]="otpType() === 'whatsapp'" 
                      (click)="otpType.set('whatsapp')"
                      aria-label="Send OTP via WhatsApp">
                      WhatsApp
                    </button>
                  </div>

                  <div class="input-group">
                    <label for="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      [(ngModel)]="phone" 
                      placeholder="+1 123 456 7890" 
                      [disabled]="loading()"
                      aria-required="true"
                      autocomplete="tel">
                  </div>

                  <button class="primary-btn" (click)="sendOtp()" [disabled]="loading() || !phone">
                    @if (loading()) { <span class="loader" aria-hidden="true"></span> Loading... }
                    @else { Send OTP via {{ otpType() === 'sms' ? 'SMS' : 'WhatsApp' }} }
                  </button>
                  <div id="recaptcha-container"></div>
                } @else {
                  <div class="input-group">
                    <label for="otp">Enter Verification Code</label>
                    <input 
                      type="text" 
                      id="otp" 
                      [(ngModel)]="otp" 
                      placeholder="123456" 
                      maxlength="6" 
                      [disabled]="loading()"
                      aria-required="true"
                      autocomplete="one-time-code">
                  </div>
                  <button class="primary-btn" (click)="verifyOtp()" [disabled]="loading() || otp.length < 6">
                    @if (loading()) { <span class="loader" aria-hidden="true"></span> Verifying... }
                    @else { Verify & Login }
                  </button>
                  <button class="text-btn" (click)="step.set('send')" [disabled]="loading()">Change Phone Number</button>
                }
              </div>
            }

            @if (authMode() === 'email') {
              <div class="email-auth" id="email-panel" role="tabpanel">
                <div class="input-group">
                  <label for="email">Email ID</label>
                  <input 
                    type="email" 
                    id="email" 
                    [(ngModel)]="email" 
                    placeholder="you@example.com" 
                    [disabled]="loading()"
                    aria-required="true"
                    autocomplete="email">
                </div>
                <div class="input-group">
                  <label for="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    [(ngModel)]="password" 
                    placeholder="••••••••" 
                    [disabled]="loading()"
                    aria-required="true"
                    autocomplete="current-password">
                </div>
                <button class="primary-btn" (click)="signInWithEmail()" [disabled]="loading() || !email || !password">
                   @if (loading()) { <span class="loader" aria-hidden="true"></span> Signing in... }
                   @else { Sign In }
                </button>
                <div class="email-actions">
                  <button class="text-btn" (click)="resetPassword()" [disabled]="loading() || !email">Forgot Password?</button>
                  <button class="text-btn" (click)="signUpWithEmail()" [disabled]="loading() || !email || !password">Create Account</button>
                </div>
              </div>
            }

          </div>

          <p class="login-footer">Sign in to save your personalized UX strategies</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .login-section {
      min-height: calc(100vh - var(--header-height) - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      background: var(--bg-primary);
    }

    .login-card {
      max-width: 440px;
      width: 100%;
      margin: 0 auto;
      padding: 48px 36px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-lg);
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
      .logo-icon { width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 12px; }
      h1 { font-size: 1.4rem; font-family: var(--font-heading); margin-bottom: 8px; color: var(--text-primary);
           .logo-text { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      }
      p { font-size: 0.9rem; color: var(--text-secondary); }
    }

    .auth-tabs {
      display: flex;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 4px;
      margin-bottom: 24px;
      button {
        flex: 1; padding: 10px; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; border-radius: 6px; font-weight: 600; font-family: var(--font-sans); transition: all 0.2s;
        &.active { background: var(--bg-card); color: var(--accent-primary); box-shadow: var(--shadow-sm); }
        &:hover:not(.active) { color: var(--text-primary); }
      }
    }

    .input-group {
      margin-bottom: 20px;
      label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); }
      input { 
        width: 100%; 
        padding: 12px 14px; 
        border-radius: var(--radius-md); 
        border: 2px solid var(--border-color); 
        background: var(--bg-card); 
        color: var(--text-primary); 
        font-family: var(--font-sans);
        font-size: 0.95rem;
        transition: all 0.2s;
        &::placeholder { color: var(--text-tertiary); opacity: 0.6; }
        &:focus { border-color: var(--accent-primary); outline: none; box-shadow: 0 0 0 4px var(--accent-glow); }
        &:disabled { opacity: 0.6; cursor: not-allowed; background: var(--bg-tertiary); }
      }
    }

    .otp-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
      .toggle-label { 
        background: none; border: none; font-size: 0.85rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: all 0.2s;
        &.selected { color: var(--accent-primary); }
        &:hover:not(.selected) { color: var(--text-secondary); }
      }
      .toggle-switch {
        width: 48px; height: 24px; background: var(--bg-tertiary); border-radius: 20px; position: relative; cursor: pointer; border: 1px solid var(--border-color);
        .switch-handle { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 3px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .switch-handle.right { transform: translateX(22px); background: #25D366; }
      }
    }

    .primary-btn {
      width: 100%; padding: 14px; background: var(--accent-gradient); color: white; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; margin-top: 8px; transition: all 0.3s;
      &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px var(--accent-glow); }
      &:disabled { opacity: 0.7; cursor: not-allowed; }
    }

    .email-actions {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;
    }

    .text-btn { background: none; border: none; color: var(--text-secondary); font-size: 0.85rem; font-weight: 600; cursor: pointer; padding: 8px; width: 100%; transition: color 0.2s;
      &:hover { color: var(--accent-primary); }
    }

    .error-message { background: rgba(220, 38, 38, 0.1); color: var(--danger); padding: 12px; border-radius: var(--radius-md); font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; text-align: center; border: 1px solid rgba(220, 38, 38, 0.2); }
    
    .loader { border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; width: 16px; height: 16px; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    .login-footer { text-align: center; font-size: 0.8rem; color: var(--text-tertiary); margin-top: 24px; }
  `],
})
export class LoginComponent implements AfterViewInit {
  private readonly auth = inject(Auth);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal('');
  readonly loading = signal(false);
  
  readonly authMode = signal<'phone' | 'email'>('phone');
  readonly otpType = signal<'sms' | 'whatsapp'>('sms');
  readonly step = signal<'send' | 'verify'>('send');

  phone = '';
  otp = '';
  email = '';
  password = '';

  private recaptchaVerifier: RecaptchaVerifier | null = null;

  ngAfterViewInit() {
    // Initialized when needed in sendOtp()
  }

  toggleOtpType() {
    this.otpType.set(this.otpType() === 'sms' ? 'whatsapp' : 'sms');
  }

  async sendOtp() {
    this.loading.set(true);
    this.error.set('');
    try {
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
      await this.authService.sendOtp(this.phone, this.recaptchaVerifier);
      this.step.set('verify');
    } catch (e: any) {
      this.error.set(this.friendlyError(e));
    } finally {
      this.loading.set(false);
    }
  }

  async verifyOtp() {
    this.loading.set(true);
    try {
      await this.authService.verifyOtp(this.otp);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error.set(this.friendlyError(e));
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithEmail() {
    this.loading.set(true);
    try {
      await this.authService.signInWithEmail(this.email, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error.set(this.friendlyError(e));
    } finally {
      this.loading.set(false);
    }
  }

  async signUpWithEmail() {
    this.loading.set(true);
    try {
      await this.authService.signUpWithEmail(this.email, this.password, this.email.split('@')[0]);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error.set(this.friendlyError(e));
    } finally {
      this.loading.set(false);
    }
  }

  async resetPassword() {
    if (!this.email) {
      this.error.set('Please enter your email address first.');
      return;
    }
    try {
      await this.authService.resetPassword(this.email);
      alert('Password reset link sent to your email!');
    } catch (e: any) {
      this.error.set(this.friendlyError(e));
    }
  }

  private friendlyError(e: any): string {
    const raw = e?.message || String(e);
    if (raw.includes('invalid-phone-number')) return 'Invalid phone number format.';
    if (raw.includes('too-many-requests')) return 'Too many attempts. Please try later.';
    if (raw.includes('invalid-verification-code')) return 'Invalid OTP. Please check and try again.';
    if (raw.includes('user-not-found') || raw.includes('wrong-password')) return 'Invalid email or password.';
    if (raw.includes('network-request-failed')) return 'Network error. Please check your connection.';
    if (raw.includes('email-already-in-use')) return 'This email is already registered. Please sign in instead.';
    if (raw.includes('weak-password')) return 'Password should be at least 6 characters.';
    return 'Authentication failed. Please try again.';
  }
}
