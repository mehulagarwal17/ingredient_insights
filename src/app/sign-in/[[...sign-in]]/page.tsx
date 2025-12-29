import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-background cyber-grid">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl glass-morphism border border-primary/20",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "neon-button",
              formButtonPrimary: "neon-button w-full",
              formFieldInput: "neon-input",
              footerActionLink: "text-primary hover:underline",
            }
          }}
        />
      </div>
    </div>
  );
}
