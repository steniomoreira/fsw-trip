"use client"

import { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { signIn, signOut, useSession} from "next-auth/react";

export function Header() {
  const { status, data } = useSession();
  const [ isOpenMenu, setIsOpenMenu ] = useState(false);

  const isAuthenticated = status === 'authenticated';
  const imageUser = data?.user?.image ?? '';  

  const handleOpenMenu =  () => setIsOpenMenu(state => !state)

  const handleLogin = () => signIn();

  const handleLogout = () => {
    setIsOpenMenu(false);
    signOut();
  }

  return (
    <div className="container mx-auto h-[72px] px-5 flex justify-between items-center">
      <Image src='/logo.svg' width={183} height={32} alt="Full Stack Week" />
      
      {!isAuthenticated && (
        <button
          className="
            flex items-center justify-center text-primary text-sm font-semibold w-[66px] h-[34px] border border-lightGray border-solid rounded-full" 
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {isAuthenticated && (
        <div className="relative">
          <button 
            className="flex items-center gap-2 px-2 py-1 text-lightGray border border-lightGray border-solid rounded-full"          
            onClick={handleOpenMenu}
          >
            <AiOutlineMenu size={16} />

            <Image className="rounded-full" src={imageUser} width={24} height={24} alt="Stenio Moreira" />
          </button>

          {isOpenMenu && (            
            <button
              className="absolute top-9 right-0 flex justify-center items-center w-[65px] py-2 shadow-md rounded-xl text-primary text-xs font-semibold"
              onClick={handleLogout}
              >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  )
}