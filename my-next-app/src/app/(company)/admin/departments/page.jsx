'use client'
import { DepartmentOverview } from '@/components/admin/DepartmentsOverview'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams()
  console.log(params);
  
  return (
    <div className='px-10'>
      <div className='flex justify-between py-5 mt-5'>
      </div>
      <DepartmentOverview />
    </div>
  )
}

export default page