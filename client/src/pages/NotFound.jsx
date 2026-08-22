import { ArrowLeft } from "lucide-react";

import SEO from "../components/SEO.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </p>
        <h1 className="heading-lg mt-6 max-w-lg text-balance">
          Looks like this page took a wrong turn.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back somewhere useful.
        </p>
        <Button to="/" size="lg" className="mt-8">
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </div>
    </>
  );
}