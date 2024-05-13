'use client'

import React, { useRef, useState } from 'react';
import { AvatarFallback, AvatarImage, Avatar } from './ui/avatar'
import { useUser } from '@clerk/nextjs';
import { ImageIcon, XIcon } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

function PostForm() {
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user }= useUser();

    const [preview, setPreview] = useState<string | null >(null);

    const handlePostAction = async(formData: FormData) => {
        const formDataCopy = formData;
        ref.current?.reset();

        const text = formDataCopy.get("postInput") as string;

        if (!text.trim()) {
            throw new Error("You must provide a post input!!")
        }

        setPreview(null);

        try {
            await createPostAction(formDataCopy);
        } catch (error) {
            console.log("Error cerating post: ", error);
        }

    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    
    
 
  return (
    <div>
      <form ref={ref} action={formData => {
        //Handle form submission with server action
        handlePostAction(formData);

        //Toast notification based on the promise above

      }}
      className="p-3 bg-white rounded-ld border">
        <div className="flex items-center space-x-2">
            <Avatar> 
                <AvatarImage src={user?.imageUrl}/>
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <input
              type='text'
              name="postInput"
              placeholder='Start writing a post...'
              className='flex-1 outline-none rounded-full py-3 px-4 border'
            />

            <input type='file' name="image" accept='image/*'
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
            />
            <button type='submit' hidden>
                Post
            </button>
        </div>

        {/**preview  conditional check*/}
        {preview && (
            <div className="mt-6">
                <img src={preview} alt="Preview"
                className="w-full object-cover"
                 />
            </div>
            )}
        <div className='flex justify-end mt-2 space-x-2'>
            <Button type='button' 
                onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="mr-2" size={16} color='currentColor'/>
                    {preview ? "Change" : "Add"} image
            </Button>

            {/**Add a remove  */}
            {preview && (
                <Button variant='outline' type='button'
                onClick={() => setPreview(null)}>
                    <XIcon className="mr-2" size={16} color='currentColor'/>
                    Remove image
                </Button>
            )}
        </div>
      </form>

      <hr className="mt-2 border-gray-300"/>
    </div>
  )
}

export default PostForm
