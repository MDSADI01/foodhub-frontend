import { Navbar } from '@/components/layout/navbar5'
import React from 'react'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div className='mx-5'>
        <Navbar></Navbar>
        {children}
        </div>
    </div>
  )
}

export default CommonLayout