import { CompanyInfoForm } from '@/components/admin/AdminSettings'
import React from 'react'

const page = () => {
  return (
    <div className='p-7'>
      <h1 className='text-lg font-semibold'>Company Info Settings</h1>
      <CompanyInfoForm />
    </div>
  )
}

export default page


