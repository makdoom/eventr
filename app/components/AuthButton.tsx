"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";

type AuthButtonType = {
  type: "google" | "github";
};

const AuthButton = ({ type }: AuthButtonType) => {
  const { pending } = useFormStatus();

  return (
    <div className="w-full">
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 animate-spin mr-2" />
          Please wait ...
        </Button>
      ) : (
        <Button
          variant={type == "google" ? "default" : "secondary"}
          className="w-full"
        >
          {type == "google" ? (
            <FaGoogle className="mr-2 size-4" />
          ) : (
            <FaGithub className="mr-2 size-4" />
          )}
          Sign in with {type == "google" ? "Google" : "Github"}
        </Button>
      )}
    </div>
  );
};
export default AuthButton;
