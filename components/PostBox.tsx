import React, { useState } from 'react'
import {useSession} from 'next-auth/react'
import Avatar from './Avatar';
import {LinkIcon, PhotographIcon} from '@heroicons/react/outline';
import { useForm } from "react-hook-form";

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}

function PostBox() {

    const {data : session} = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const { register, setValue,handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  return (
    <form className='bg-white p-2 border rounded-md border-gray-300'>
        <div className='flex items-center space-x-3'>
            {/* Avatar */}
            <Avatar  />
            <input
              {...register('postTitle',{ required: true })}
              disabled={!session}
              className='bg-gray-50 rounded-md flex-1 p-2 pl-5 outline-none'
             type="text" placeholder={ 
                session?'Thinking of posting?? Here!!':'Login/SignIn to Post'
                } />

                <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} 
                className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`} />
                <LinkIcon className='h-6 text-gray-300 cursor-pointer'
                />
        </div>
        {!!watch('postTitle') &&
        (
            <div className='flex flex-col py-2'>
                {/* bodyBox */}
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>
                        Body
                    </p>
                    <input 
                    className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                    {...register('postBody',{ required: true })}
                    type="text" placeholder='Text (optional)' />
                </div>
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>
                        Group
                    </p>
                    <input 
                    className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                    {...register('subreddit',{ required: true })}
                    type="text" placeholder='for ex :- NextJs' />
                </div>
                <div>
                   {imageBoxOpen && (
                       <div className='flex items-center px-2'>
                       <p className='min-w-[90px]'>
                           Image URL :
                       </p>
                       <input 
                       className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                       {...register('postImage',{ required: true })}
                       type="text" placeholder='Optional...' />
                    </div>
                   )} 
                </div>
            </div>
        )}
    </form>
  )
}

export default PostBox