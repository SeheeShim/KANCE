// src/components/AccountModal.js
import React, { useState } from "react";
import "./AccountModal.scss";

const AccountModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login"); // login, reset, register

  if (!isOpen) return null;

  const goBack = () => setMode("login"); // Reset이나 Register에서 로그인 화면으로 이동

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        {mode === "login" && (
          <div className="login">
            <h2>Sign in</h2>
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <button>Sign In</button>
            <p className="link" onClick={() => setMode("reset")}>Forgot password?</p>
            <p className="info">* If you signed up in-store, or to our newsletter, you still need to create an online account here.</p>
            <p className="link" onClick={() => setMode("register")}>Sign up for account</p>
          </div>
        )}

        {mode === "reset" && (
          <div className="reset">
            <button className="back-btn" onClick={goBack}>← Back</button> {/* 뒤로가기 버튼 추가 */}
            <h2>Reset password</h2>
            <p>Enter the email address associated with your online account and we’ll send you a password reset email.</p>
            <input type="email" placeholder="Email address" />
            <button>Reset Password</button>
          </div>
        )}

        {mode === "register" && (
          <div className="register">
            <button className="back-btn" onClick={goBack}>← Back</button> {/* 뒤로가기 버튼 추가 */}
            <h2>Register</h2>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Login email address" />
            <input type="password" placeholder="Password" />
            <label>
              <input type="checkbox" /> Agree to Liberty's terms and conditions
            </label>
            <label>
              <input type="checkbox" /> Email Marketing
              <small>Send me the latest news from Liberty via email...</small>
            </label>
            <button>Register Now</button>
            <p className="info">By registering you are agreeing to Liberty's Terms and Conditions and Privacy Policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountModal;
