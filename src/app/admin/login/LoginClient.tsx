'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { FaLock, FaKey, FaShieldAlt, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LoginClient() {
  const [passcode, setPasscode] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useEmailAuth, setUseEmailAuth] = useState<boolean>(false);

  const [showPasscode, setShowPasscode] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { isAdmin, loginWithPasscode, loginWithEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    if (isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [isAdmin, router]);

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passcode.trim()) {
      setError('Please enter your admin passcode.');
      return;
    }

    const success = loginWithPasscode(passcode);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid admin passcode. Contact system administrator if you lost your code.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password/passcode are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your admin credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[85vh] flex items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="glass-dark p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md relative z-10" data-aos="zoom-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <FaShieldAlt className="text-2xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Admin Portal Login</h1>
          <p className="text-xs text-slate-400 mt-1">Authenticate to access project management & team controls</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {!useEmailAuth ? (
          /* Admin Passcode Auth Form */
          <form onSubmit={handlePasscodeLogin} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Admin Passcode</label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="Enter your assigned admin passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full p-3.5 pl-11 pr-11 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 text-sm"
                  autoFocus
                />
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                  aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-base"
            >
              <span>Access Admin Dashboard</span>
              <FaArrowRight className="text-sm" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setUseEmailAuth(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Sign in with Admin Email & Password
              </button>
            </div>
          </form>
        ) : (
          /* Firebase Email & Password Form */
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Admin Email</label>
              <input
                type="email"
                placeholder="admin@dynamicilluminations.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Password / Passcode</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password or auto-generated passcode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 pr-11 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-base disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <FaArrowRight className="text-sm" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setUseEmailAuth(false)}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
              >
                Switch to Admin Passcode Login
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <Link href="/projects" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Public Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
