import { Navbar } from '@/components/layout/navbar'
import React from 'react'
import { userService } from '../services/user.service'

const CommonLayout = async ({children}:{children:React.ReactNode}) => {

  const {data:session} = await userService.getSession();

  return (
    <div>
        <div className='mx-5'>
        <Navbar session={session}></Navbar>
        {children}
        </div>
    </div>
  )
}

export default CommonLayout