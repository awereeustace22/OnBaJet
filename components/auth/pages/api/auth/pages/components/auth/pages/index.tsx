import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import OnBudgetPrototype from "@/components/OnBudgetPrototype";
import Navbar from "@/components/layout/Navbar";
import SocialButtons from "@/components/auth/SocialButtons";

const GUEST_KEY = "onbajet_guest";

export default function Home() {
  const { data: session, status } = useSession();
  const [guest, setGuest] = React.useState(false);

  React.useEffect(() => {
    setGuest(typeof window !== "undefined" && !!localStorage.getItem(GUEST_KEY));
  }, []);

  const isAuthed = status === "authenticated" || guest;

  if (isAuthed) {
    return (
      <>
        <Navbar />
        <OnBudgetPrototype
          onSignOut={() => {
            localStorage.removeItem(GUEST_KEY);
            setGuest(false);
            if (status === "authenticated") signOut({ callbackUrl: "/" });
          }}
        />
      </>
    );
  }

  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function submitEmail() {
    setError("Email/password auth not enabled yet — please use Google/Apple above or continue as Guest.");
  }

  function continueAsGuest() {
    localStorage.setItem(GUEST_KEY, "1");
    setGuest(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
        <div className="w-full max-w-md">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight">OnBaJet</h1>
                <p className="text-slate-600 mt-1">Find eats that fit your budget</p>
              </div>

              {/* SSO buttons + Guest */}
              <SocialButtons onContinue={continueAsGuest} layout="col" />

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="h-px w-full bg-slate-200" />
                <span className="absolute bg-white px-2 text-xs text-slate-500">
                  or use email (disabled)
                </span>
              </div>

              {/* Email (disabled placeholder) */}
              <div className="flex justify-center gap-3 text-sm">
                <Button
                  variant={mode === "login" ? "primary" : "secondary"}
                  onClick={() => setMode("login")}
                  className="rounded-xl"
                >
                  Log In
                </Button>
                <Button
                  variant={mode === "signup" ? "primary" : "secondary"}
                  onClick={() => setMode("signup")}
                  className="rounded-xl"
                >
                  Sign Up
                </Button>
              </div>

              <div className="space-y-3 opacity-60 pointer-events-none">
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {mode === "signup" && (
                  <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                )}
                {error && <div className="text-xs text-rose-600">{error}</div>}
                <Button className="w-full rounded-xl" onClick={submitEmail}>
                  {mode === "login" ? "Log In" : "Sign Up"}
                </Button>
              </div>

              <div className="text-xs text-slate-400 text-center">
                By continuing, you agree to our Terms of Service & Privacy Policy.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
