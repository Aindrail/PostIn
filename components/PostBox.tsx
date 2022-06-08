import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDITS_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox() {
  const { data: session } = useSession()

  const [addPost] = useMutation(ADD_POST,{
    refetchQueries:[ GET_ALL_POSTS,'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)

    const notification = toast.loading('Creating new post...')

    try {
      //  Query for subreddit topic...
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDITS_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })
      console.log(getSubredditListByTopic);
      const subredditExists = getSubredditListByTopic.length > 0
      console.log(subredditExists);
      if (!subredditExists) {
        // create the subreddit...
        console.log('Subreddit does not exist, creating...')
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })
        console.log('New subreddit created: ', newSubreddit)

        console.log('Creating Post...', formData)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        console.log('New Post added:', newPost)
      } else {
        //use existing subreddit...
        console.log('Subreddit exists, creating post...')
        console.log(getSubredditListByTopic)
        const image = formData.postImage || ''
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        console.log('New Post added:', newPost)
      }
      //after the post is added
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')
      toast.success('New Post Created!', {
        id: notification,
      })
    } catch (error) {
      console.log('hi', error)
      toast.error('Whoops! Something went wrong!', {
        id: notification,
      })
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? 'Thinking of posting?? Here!!' : 'Login/SignIn to Post'
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-300" />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* bodyBox */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody', { required: true })}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Group</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('subreddit', { required: true })}
              type="text"
              placeholder="for ex :- NextJs"
            />
          </div>
          <div>
            {imageBoxOpen && (
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Image URL :</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register('postImage')}
                  type="text"
                  placeholder="Optional..."
                />
              </div>
            )}
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            //    required true in register if false is handled here
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>A Post Title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p> **Group name is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
