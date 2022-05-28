import Image from 'next/image'
import React from 'react'
import { MenuIcon,  ChevronDownIcon, HomeIcon, SearchIcon,  } from '@heroicons/react/solid'
import { BellIcon,ChatIcon,GlobeIcon,PlusIcon,SparklesIcon,SpeakerphoneIcon,VideoCameraIcon, } from '@heroicons/react/outline'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession();
  return (
    <div className=' sticky top-0 z-50  flex bg-white px-4 py-2 shadow-sm'>
       <div className="relative h-10 w-20 flex-shrink-0    cursor-pointer"> 
        <Image objectFit='contain' src="https://play-lh.googleusercontent.com/ItxDn_WNq3QPvuXS1jaXwujqvRobrH-hpEqbDy1iCVx0b5Z5dv9ADyfd83Dn6cDsNbE" layout="fill" />
        

       </div>

       <div className='mx-7 flex items-center xl:min-w-[300px]'>
          <HomeIcon className='h-5 w-5'  />
          <p className='ml-2 hidden flex-1 lg:inline'>Home</p> 
          {/* hidden in small screen but still visible in large screen */}
          <ChevronDownIcon className='h-5 w-5'  />
              
       </div>

       <form className='flex flex-1 items-center space-x-2 rounded-lg border border-gray-200 bg-gray-100 px-3 py-1 '>

           <SearchIcon className='h-6 w-6 text-gray-400' />
           <input
           className='flex-1 bg-transparent outline-none'
            type="text" placeholder="Search PostIn" />
           <button type='submit' hidden />
           {/* This helps in hidding the button and search when enter is pressed */}

       </form>
       <div className='mx-5 hidden items-center space-x-2  text-gray-500 lg:inline-flex'>
           <SparklesIcon className="icon" />
           <GlobeIcon className="icon" />
           <VideoCameraIcon  className="icon" />
           <hr className='h-10 border border-gray-100' />
              <ChatIcon className="icon" />
              <BellIcon className="icon" />
              <PlusIcon className="icon" />
              <SpeakerphoneIcon className="icon" />
           
           
       </div>
       <div className='ml-5 flex items-center lg:hidden'>
           <MenuIcon className='icon' />
       </div>
        {/* SignIn Sign out button */}
<SessionProvider>
{session ? (
          <div onClick={() => signOut()} className='hidden  items-center cursor-pointer space-x-2 border border-gray-100 p-2 lg:flex'>
          <div className='relative h-5 w-5 flex-shrink-0'>
          <Image objectFit='contain' src="https://cdn.worldvectorlogo.com/logos/pi-network-lvquy.svg" layout='fill' alt=''   />
          </div>
          <div className=' flex-1 text-xs'>
            {/* here ? mark means if session found if user find then and truncate means if username is to bigg then add .. to it */}
             <p className='truncate'>{session?.user?.name}</p> 
             
             <p className='text-gray-400'>3 Points</p>
            
              
             
            
            
           </div>
           <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400 '  />

      </div>

        ):(

          <div onClick={() => signIn()} className='hidden  items-center cursor-pointer space-x-2 border border-gray-100 p-2 lg:flex'>
           <div className='relative h-5 w-5 flex-shrink-0'>
           <Image objectFit='contain' src="https://cdn.worldvectorlogo.com/logos/pi-network-lvquy.svg" layout='fill' alt=''   />
           </div>
           
             
            <p className='text-gray-400'>
             Sign In 
            </p>
           
         
       </div>

        )}

</SessionProvider>
        
       

    </div>
    
  )
}

export default Header