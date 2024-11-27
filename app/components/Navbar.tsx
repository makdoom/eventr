import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex py-5 items-center justify-between mx-auto w-full">
      <Link href="/" className="font-bold text-3xl tracking-normal">
        Even<span className="text-primary">tr</span>
      </Link>

      <Button> Get Started</Button>
    </div>
  );
};
export default Navbar;
