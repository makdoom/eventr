import Link from "next/link";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <div className="flex py-5 items-center justify-between mx-auto w-full">
      <Link href="/" className="font-bold text-3xl tracking-normal">
        Even<span className="text-primary">tr</span>
      </Link>

      <AuthModal />
    </div>
  );
};
export default Navbar;
