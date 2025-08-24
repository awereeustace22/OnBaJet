import * as React from "react";

export default function Home() {
  return (
    <main style={{ maxWidth: 680, margin: "3rem auto", padding: "0 1rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🚀 Welcome to OnBaJet!</h1>
      <p style={{ color: "#475569", marginBottom: "1.25rem" }}>
        AI‑powered budgeting tool for food deals, coupons, and cost‑effective pickup or delivery.
      </p>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          display: "inline-block",
          background: "black",
          color: "white",
          padding: "0.6rem 1rem",
          borderRadius: 12,
          textDecoration: "none"
        }}
      >
        Continue as Guest (Demo)
      </a>
    </main>
  );
}
