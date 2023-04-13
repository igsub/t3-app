
import Image from "next/image"
import { api } from "~/utils/api"
import Link from "next/link"

const ProfileButton = () => {
  const { data: user } = api.user.getFirst.useQuery()
  
  return (
    <div className="dropdown dropdown-end">
      {user?.profile_picture? 
      <label tabIndex={0} className="btn bg-inherit border-hidden focus:bg-inherit hover:bg-inherit">
        <Image className="rounded-3xl md:h-12 md:w-12" src={user?.profile_picture || ""} alt="profile" height={32} width={32}/>
      </label> : null }
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-slate-800 rounded-box w-52"
      >
        <p className="text-center">{user?.name}</p>
        <p className="text-center">{user?.email}</p>
        <li className="border-t-2 mt-4">
          <Link href={"/account"}>My Account</Link>
        </li>
        <li className="border-t-2">
          <Link href={"/"}>Log Out</Link>
        </li>
      </ul>
    </div>
  )
}

export default ProfileButton