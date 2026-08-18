"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If already logged in, redirect to admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/npmanage");
      } else {
        setCheckingAuth(false);
      }
    });
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    router.replace("/npmanage");
  };

  if (checkingAuth) {
    return (
      <div className="admin-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="login-loading">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="admin-body login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src="/logo.webp" alt="North Pacific Logo" style={{ height: "60px", filter: "invert(1)" }} />
          </div>
          <h1 className="login-title">ADMIN PORTAL</h1>
          <p className="login-subtitle">Sign in to manage your store</p>

          {error && (
            <div className="login-error">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-email">EMAIL</label>
              <input
                type="email"
                id="admin-email"
                placeholder="admin@northpacific.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">PASSWORD</label>
              <input
                type="password"
                id="admin-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="btn-admin btn-black login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> SIGNING IN...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i> SIGN IN
                </>
              )}
            </button>
          </form>

          <p className="login-footer-text">
            <i className="fa-solid fa-shield-halved"></i> Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
}
