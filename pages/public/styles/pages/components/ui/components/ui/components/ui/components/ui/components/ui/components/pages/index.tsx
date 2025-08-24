import * as React from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import OnBudgetPrototype from "@/components/OnBudgetPrototype";

const AUTH_KEY = "onbajet_auth";
const isAuthed = () => typeof window !== "undefined" && !!localStorage.getItem(AUTH_KEY);
const persistAuth = () => localStorage.setItem(AUTH_KEY, "1");
const clearAuth = () => localStorage.removeItem(AUTH_KEY);

export default function Home() {
  const [authed, setAuthed] = React.useState(false);
  React.useEffect(() => setAuthed(isAuthed()), []);
  if (authed) return <OnBudgetPrototype onSignOut={() => { clearAuth(); setAuthed(false); }} />;

  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [email, setEmail] = React.useState(""); const [password, setPassword] = React.useState(""); const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function submitEmail() {
    setError(null);
    if (!email || !password) { setError("Please enter your email and password."); return; }
    if (mode === "signup" && password !== confirm) { setError("Passwords do not match."); return; }
    persistAuth(); setAuthed(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight">OnBaJet</h1>
              <p className="text-slate-600 mt-1">Find eats that fit your budget</p>
            </div>
            <div className="flex justify-center gap-3 text-sm">
              <Button variant={mode === "login" ? "primary" : "secondary"} onClick={() => setMode("login")} className="rounded-xl">Log In</Button>
              <Button variant={mode === "signup" ? "primary" : "secondary"} onClick={() => setMode("signup")} className="rounded-xl">Sign Up</Button>
            </div>
            <div className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              {mode === "signup" && (<Input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} />)}
              {error && <div className="text-xs text-rose-600">{error}</div>}
              <Button className="w-full rounded-xl" onClick={submitEmail}>{mode === "login" ? "Log In" : "Sign Up"}</Button>
            </div>
            <div className="text-center text-sm text-slate-600">
              <button className="underline underline-offset-2" onClick={() => { persistAuth(); setAuthed(true); }}>Continue as Guest</button>
            </div>
            <div className="text-xs text-slate-400 text-center">By continuing, you agree to our Terms of Service & Privacy Policy.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
