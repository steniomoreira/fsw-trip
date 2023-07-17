"use client"

import { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";

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
      <Link href='/'>
        <Image src='/logo.svg' width={183} height={32} alt="Full Stack Week" />
      </Link>
      
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
            <div className="absolute top-9 right-0 flex flex-col justify-center items-center gap-2 w-[130px] h-auto p-4 shadow-md rounded-xl bg-white">         
              <Link href='/my-trips'>
                <button
                  className=" text-primary text-xs font-semibold py-2">
                  Minhas viagens
                </button>
              </Link>

              <button
              className="text-primary text-xs font-semibold py-2"
              onClick={handleLogout}
              >
              Logout
              </button>
            </div> 
          )}
        </div>
      )}
    </div>
  )
}