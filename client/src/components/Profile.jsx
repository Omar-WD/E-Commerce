import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { FaUserEdit } from "react-icons/fa";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [displayEditImg, setDisplayEditImg] = useState('hidden');
  const [displayEditUserName, setDisplayEditUserName] = useState('hidden');
  const [displayEditName, setDisplayEditName] = useState('hidden');
 

  if (!user) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="min-h-[90vh] py-12 sm:py-20 md:py-28 w-screen ">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-16  ">
        <h1 className=" text-3xl sm:text-5xl xl:text-6xl font-extrabold text-dark">Profile</h1>
        <div className="flex flex-col sm:flex-row gap-10">
          <div className="relative h-64 w-64 bg-cover bg-userIMG" onMouseOver={()=>setDisplayEditImg('absolute')} onMouseLeave={()=>setDisplayEditImg('hidden')} >
            <FaUserEdit className={` ${displayEditImg} bottom-2 right-2 size-6  hover:cursor-pointer`} />
          </div>
          <div className="flex flex-col gap-4 items-left sm:justify-around mx-auto w-auto sm:w-80">
            <h1 className="text-xl sm:text-2xl inline-flex gap-4 text-dark" onMouseOver={()=>setDisplayEditUserName('block')} onMouseLeave={()=>setDisplayEditUserName('hidden')}>
              <span>Username:</span> <span>{user.username}</span>
              <FaUserEdit className={`${displayEditUserName} hover:cursor-pointer`} />
            </h1>
            <h1 className="text-xl sm:text-2xl inline-flex gap-4 text-dark" onMouseOver={()=>setDisplayEditName('block')} onMouseLeave={()=>setDisplayEditName('hidden')}>
              <span>Name:</span> <span>{user.name}</span>
              <FaUserEdit className={`${displayEditName} hover:cursor-pointer`}/>
            </h1>
            <h1 className="text-xl sm:text-2xl inline-flex gap-4 text-dark">
              <span>Role:</span> <span>{user.role}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
