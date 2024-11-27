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
        <Button> Try for free</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="font-bold text-2xl tracking-normal">
            Even<span className="text-primary">tr</span>
          </DialogTitle>
        </DialogHeader>

        {/* <DialogDescription className="flex flex-col mt-5 gap-3"> */}
        <form action={handleGoogleAuth} className="w-full">
          <AuthButton type="google" />
        </form>

        <form action={handleGithubAuth} className="w-full">
          <AuthButton type="github" />
        </form>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
