import Header from '@/components/Header/Header'
import React from 'react'
import { UserProvider } from '@/database/User/UserContext'
import "tailwindcss/tailwind.css";


const index = () => {
  return (
    <UserProvider>
    <Header/>
    </UserProvider>
  )
}

export default index