import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.user.getAll.useQuery()
  console.log( data )

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {data?.map(user => <div key={user.id}>{user.email}
        <Image src={user.profile_picture} alt="profile" height={100} width={100}/></div>)}
      </div>
    </>
  );
};

export default Home;
