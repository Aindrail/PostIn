import Image from 'next/image'
import React from 'react'
import {
  MenuIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Avatar from './Avatar'

function Header() {
  const { data: session } = useSession()
  return (
    <div className=" sticky top-0 z-50  flex bg-white px-4 py-2 shadow-sm items-center">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer ">
       <Link href="/">
        <Image
          objectFit="contain"
          src="https://play-lh.googleusercontent.com/ItxDn_WNq3QPvuXS1jaXwujqvRobrH-hpEqbDy1iCVx0b5Z5dv9ADyfd83Dn6cDsNbE"
          layout="fill"
        />
        </Link>
      </div>

      <div className="mx-7 hidden items-center xl:min-w-[300px] lg:flex">
      <Link href="/">
        <HomeIcon className="h-5 w-5 " />
        </Link>
         {/* hidden in small screen but still visible in large screen */}
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        
       
        {/* <ChevronUpIcon className="h-5 w-5 " /> */}
      </div>
      <div className="mr-7 flex item-center xl:min-w-[300px]">
      <Link href="javascript:window.location.href=window.location.href">
       <ChevronUpIcon className="h-5 w-5 " />
        </Link>
      </div>

      <form className="flex flex-1 items-center  rounded-lg border border-gray-200 bg-gray-100  lg: px-3 py-1 space-x-2 ">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent w-2 outline-none lg: w-none"
          type="text"
          placeholder="Search PostIn"
        />
        <button type="submit" hidden />
        {/* This helps in hidding the button and search when enter is pressed */}
      </form>
      <div className="mx-5 hidden items-center space-x-2  text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <SessionProvider>
      {session ? (
      <div onClick={() => signOut()} className="ml-5 flex items-center lg:hidden">
          {/* <MenuIcon className="icon" /> */}
          <Avatar />
      </div>
      ) : (
        <div onClick={() => signIn()} className="ml-5 p-2 cursor-pointer rounded-md flex items-center text-white bg-blue-400 lg:hidden ">
          {/* <MenuIcon className="icon" /> */}
          <p>SignIn</p>
      </div>
      )}
 
      </SessionProvider>
      
      {/* SignIn Sign out button */}
      <SessionProvider>
        {session ? (
          
          <div
            onClick={() => signOut()}
            className="hidden cursor-pointer h-10 space-x-2 items-center border border-gray-100 pl-2  lg:flex "
          >
            <div className="relative h-5 w-5 flex-shrink-0">
              <Image
                objectFit="contain"
                src="https://cdn.worldvectorlogo.com/logos/pi-network-lvquy.svg"
                layout="fill"
                alt=""
              />
            </div>
            <div className=" flex-1 text-xs ">
              {/* here ? mark means if session found if user find then and truncate means if username is to bigg then add .. to it */}
              <p className="truncate">{session?.user?.name}</p>

              {/* <p className="text-gray-400">3 Points</p> */}
            </div>
            {/* <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400 " /> */}
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="hidden  cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
          >
            <div className="relative h-5 w-5 flex-shrink-0">
              <Image
                objectFit="contain"
                src="https://cdn.worldvectorlogo.com/logos/pi-network-lvquy.svg"
                layout="fill"
                alt=""
              />
            </div>

            <p className="text-gray-400">Sign In</p>
          </div>
        )}
      </SessionProvider>
    </div>
  )
}

export default Header
