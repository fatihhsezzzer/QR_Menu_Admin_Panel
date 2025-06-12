import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://api.mazina.com.tr/api/User/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
        window.location.reload();
      } else {
        setError(
          "Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol edin."
        );
      }
    } catch (err) {
      setError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={styles.loginPage}>
      <form onSubmit={handleLogin} style={styles.loginForm}>
        <h2 style={styles.formHeader}>Giriş Yap</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.formLabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.formLabel}>
            Şifre
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.formInput}
          />
        </div>
        <button
          type="submit"
          style={styles.formButton}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor =
              styles.formButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.formButton.backgroundColor)
          }
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

const styles = {
  loginPage: {
    fontFamily: "'Noto Sans', sans-serif",
    backgroundColor: "#f4f5f7",
    color: "#333",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginForm: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  formLabel: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  formInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  formButton: {
    padding: "10px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "block",
    width: "100%",
    textAlign: "center",
  },
  formButtonHover: {
    backgroundColor: "#0056b3",
  },
  errorMessage: {
    color: "#dc3545",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default LoginForm;
