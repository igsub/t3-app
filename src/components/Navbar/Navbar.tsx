import Image from "next/image"
import ProfileButton from "./components/ProfileButton"
import Link from "next/link"
import NavigationButton from "./components/NavigationButton"

const Navbar = () => {

  return (
  <div className="absolute top-0 navbar bg-gray-900">
    <div className="navbar-start">
      <NavigationButton />
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