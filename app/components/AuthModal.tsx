import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthButton from "./AuthButton";
import { signIn } from "../lib/auth";

const AuthModal = () => {
  const handleGoogleAuth = async () => {
    "use server";
    await signIn("google");
  };
  const handleGithubAuth = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"> Try for free</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex items-center justify-center my-4">
          <DialogTitle className="font-bold text-3xl tracking-normal">
            Even<span className="text-primary">tr</span>
          </DialogTitle>
        </DialogHeader>

        <form action={handleGoogleAuth} className="w-full">
          <AuthButton type="google" />
        </form>

        <form action={handleGithubAuth} className="w-full">
          <AuthButton type="github" />
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
