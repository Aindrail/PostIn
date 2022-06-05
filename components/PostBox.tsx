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
    const { register,
            setValue,
            handleSubmit,
            watch, 
            formState: { errors } 
           } = useForm<FormData>();

  
  const onSubmit = handleSubmit(async( FormData) => {
    console.log(FormData);
  });
  return (
    <form onSubmit={onSubmit} 
       className='bg-white p-2 border rounded-md border-gray-300'>
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
                       {...register('postImage')}
                       type="text" placeholder='Optional...' />
                    </div>
                   )} 
                </div>

                {/* Errors */}
                {Object.keys(errors).length >0 && (
                //    required true in register if false is handled here
                   <div className='space-y-2 p-2 text-red-500'>
                         {errors.postTitle?.type === 'required' && (
                             <p>A Post Title is required</p>

                         )} 
                         {errors.postTitle?.type === 'required' && (
                             <p>A Group name is required</p>

                         )}  
                    </div>

                )}


                {!!watch('postTitle') && (
                <button type='submit' className='w-full rounded-full p-2 text-white bg-blue-400'>
                    Post
                </button>
                )}
            </div>
        )}
    </form>
  )
}

export default PostBox