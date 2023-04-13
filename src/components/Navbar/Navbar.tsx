import Image from "next/image"
import { api } from "~/utils/api"
import ProfileButton from "./components/ProfileButton"
import Link from "next/link"

const Navbar = () => {

  return (
  <div className="absolute top-0 navbar bg-gray-900">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-800 rounded-box w-52">
          <li><Link href={"/"}>Homepage</Link></li>
          <li><Link href={"/marketing"}>Marketing</Link></li>
        </ul>
      </div>
    </div>
    <div className="navbar-center">
      <Link href={"/"}>
        <Image
          className="relative sm:h-10 sm:w-10  md:h-14 md:w-48 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={130}
          height={37}
          priority
          />
      </Link>
    </div>
    <div className="navbar-end">
      <ProfileButton />
    </div>
  </div>
  )
}

export default Navbar