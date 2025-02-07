'use client'
import EmployeeDatabase from '@/components/Tl/EmployeeDatabase'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
   const params = useParams()
      console.log(params);
  return (
    <div>
        <EmployeeDatabase deptId={params.id}/>
    </div>
  )
}

export default page