import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { login } from "api/auth";
import { useHistory } from "react-router-dom";
import edgeImage from "../assets/images/auth-bg.png";
import ButtonLoader from "../components/ButtonLoader/ButtonLoader";

const Login = ({ setIsAuthenticated }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // start loader

    let hasError = false;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) {
      setLoading(false); // stop loader if validation fails
      return;
    }

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      history.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    // Full screen background
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #5f7fa2, #3e5c76)",
        p: 2,
      }}
    >
      {/* Mini card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Form half */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 1, color: "#fff", fontWeight: 700 }}>
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 3, color: "#e0e0e0" }}>
            Sign in to access your dashboard and manage your projects
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{
                sx: {
                  color: "#000",
                  transform: "translate(12px, 6px) scale(1)",
                  "&.Mui-focused": {
                    transform: "translate(14px, -22px) scale(0.75)",
                    color: "#fff",
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "#000",
                  height: 50,
                  padding: "14px",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{
                sx: {
                  color: "#000",
                  transform: "translate(12px, 6px) scale(1)",
                  "&.Mui-focused": {
                    transform: "translate(14px, -22px) scale(0.75)",
                    color: "#fff",
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "#000",
                  height: 50,
                  padding: "14px",
                },
              }}
            />

            <ButtonLoader
              loading={loading}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
              }}
            >
              Login
            </ButtonLoader>
          </form>
        </Box>

        {/* Image half */}
        <Box
          component="img"
          src={edgeImage}
          alt="decorative"
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            objectFit: "cover",
            width: "100%",
            height: "100%",
            maxHeight: 450,
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
