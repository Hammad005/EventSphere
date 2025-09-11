import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Contact = () => {
  return (
    <aside className='flex flex-col items-center justify-center dark:bg-black bg-secondary min-h-[calc(100vh-75px)] sticky top-[75px] w-full'>
        <div></div>
        <h1 className='text-3xl'>Any questions?</h1>
        <div className='flex flex-col gap-2'>
            <Input type={"text"} placeholder='Enter your name' />
            <Input type={"email"} placeholder='Enter your email' />
            <Textarea placeholder='Enter your message' className={'max-h-[10rem]'}/>
        </div>
    </aside>
  )
}

export default Contact