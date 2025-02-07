'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Settings,
  Database,
  ChartArea,
  Building2,
  ClipboardList,
  ListChecks,
  LogOut,
  User,
  X,
  Focus,
  PersonStanding,
  MessageSquareText,
  Video,
  Gamepad2,
  BotMessageSquare
} from 'lucide-react'



const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export default function TLSidebar({ closeSidebar}) {
  const [status, setStatus] = useState(true)
  const router = useRouter()
  const params = useParams()

  const companyNav = [
    { name: "Dashboard", icon: ChartArea, link: `/tl-dashboard/${params.id}` },
    { name: "Assign Tasks Panel", icon: ClipboardList, link: `/tl-dashboard/${params.id}/tasks` },
    { name: "Employee Database", icon: ClipboardList, link: `/tl-dashboard/${params.id}/empdb` },
    { name: "Video Call", icon: ClipboardList, link: `/tl-dashboard/${params.id}/video` },
    
  ];

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, etc.)
    router.push('/login')
  }

  return (
    <motion.div 
      className="flex flex-col h-full bg-card text-card-foreground"
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="p-4">
        <div className="flex items-center  mb-6">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>BC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">
                blue<span className="text-blue-700">Circle</span>
              </h2>
              <p className="text-sm text-muted-foreground">for Employees</p>
            </div>
          </motion.div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={closeSidebar} 
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <motion.div 
          className="mb-6 p-3 flex items-center gap-3 text-sm rounded-lg bg-blue-100"
          whileHover={{ scale: 1.02 }}
        >
          <Building2 size={18} />
          <h2 className="font-medium">Slash Ritesh</h2>
        </motion.div>

        <nav className="space-y-1">
          {companyNav.map((item) => (
            <motion.div
              key={item.name}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
                asChild
              >
                <Link href={item.link}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>

      <motion.div 
        className=" p-4 flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}