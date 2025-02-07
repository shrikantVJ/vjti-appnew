'use client'

import { useState } from 'react'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <EmployeeSidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={() => setIsSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <main className={`
        transition-all duration-200 ease-in-out
        md:ml-[240px] lg:ml-[280px]
      `}>
        {/* Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="container p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout