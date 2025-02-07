'use client'
import TaskDashboard from '@/components/Tl/TaskDashboard'
import React from 'react'
import { useParams } from 'next/navigation'
const page = () => {
  const params = useParams()
  console.log(params);
  return (
    <div>
      <TaskDashboard deptId={params.id} />
    </div>
  )
}

export default page