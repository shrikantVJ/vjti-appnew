'use client'
import EmployeeOverview from '@/components/Tl/EmployeeOverview'
import { useParams } from 'next/navigation'
import React from 'react'


const page = () => {
    const params = useParams()
    // console.log(params);
  return (
    <div>
      <EmployeeOverview deptId={params.id} />
    </div>
  )
}

export default page