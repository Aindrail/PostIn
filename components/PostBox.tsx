import React from 'react'
import {useSession} from 'next-auth/react'
import Avatar from './Avatar';

function PostBox() {

    const {data : session} = useSession();


  return (
    <form>
        <div className='flex items-center space-x-3'>
            {/* Avatar */}
            <Avatar  />
            <input
              disabled={!session}
              className='bg-gray-50 rounded-md flex-1 p-2 pl-5 outline-none'
             type="text" placeholder={ 
                session?'Thinking of posting?? Here!!':'Login/SignIn to Post'
                } />
        </div>
    </form>
  )
}

export default PostBox