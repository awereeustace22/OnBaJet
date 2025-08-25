import * as React from "react";
import Button from "@/components/ui/Button";

type Props = {
  onContinue: () => void; // call this after a successful (mock) SSO
  layout?: "row" | "col";
};

export default function SocialButtons({ onContinue, layout = "col" }: Props) {
  const base =
    "flex items-center justify-center gap-2 rounded-xl w-full h-10 text-sm";

  // NOTE: These are mocked SSO handlers. They just call onContinue().
  // Later, replace with real providers (e.g., NextAuth) and remove the mocks.
  function signInWithGoogle() {
    onContinue();
  }
  function signInWithApple() {
    onContinue();
  }

  return (
    <div
      className={
        layout === "row"
          ? "flex gap-3"
          : "flex flex-col gap-3"
      }
    >
      <Button
        variant="secondary"
        className={`${base} border`}
        onClick={signInWithGoogle}
        aria-label="Continue with Google"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <Button
        variant="secondary"
        className={`${base} border`}
        onClick={signInWithApple}
        aria-label="Continue with Apple"
      >
        <AppleIcon />
        Continue with Apple
      </Button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.7C16.8 2.6 14.6 1.7 12 1.7 6.9 1.7 2.7 5.9 2.7 11S6.9 20.3 12 20.3c6.9 0 9.6-4.9 9.6-7.4 0-.5 0-.8-.1-1.2H12z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M16.365 1.43c0 1.14-.465 2.25-1.215 3.06-.78.84-2.055 1.5-3.21 1.41-.135-1.11.435-2.28 1.185-3.06.78-.81 2.1-1.41 3.24-1.41zM20.46 17.1c-.57 1.32-.84 1.89-1.59 3.06-1.02 1.56-2.46 3.51-4.23 3.54-1.575.03-1.995-1.02-4.17-1.02-2.175 0-2.625 1.02-4.2 1.05-1.77.03-3.12-1.68-4.14-3.24-2.25-3.42-2.49-7.44-1.095-9.57 1.02-1.56 2.64-2.55 4.47-2.58 1.74-.03 3.18 1.08 4.17 1.08.96 0 2.73-1.35 4.62-1.17.785.03 3 .315 4.41 2.34-3.75 2.07-3.165 7.41.75 8.64z"/>
    </svg>
  );
}
