import Link from "next/link";
import { useContext } from "react";
import { NavBarContext } from "../context/navbar-context";

type NavLinkProps = {
  href: string;
  title: string;
};

const NavLink = ({ href, title }: NavLinkProps) => {
  const { setIsModalOpen } = useContext(NavBarContext);
  return (
    <Link
      href={href}
      onClick={() => setIsModalOpen(false)}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
