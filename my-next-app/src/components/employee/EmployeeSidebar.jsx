'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Settings,
  ChartArea,
  Building2,
  ClipboardList,
  ListChecks,
  LogOut,
  User,
  X,
  Focus,
  MessageSquareText,
  Video,
  Gamepad2,
  BotMessageSquare,
  Briefcase
} from 'lucide-react'

const companyNav = [
  { name: "Dashboard", icon: ChartArea, link: "/dashboard" },
  { name: "Tasks", icon: ClipboardList, link: "/dashboard/tasks" },
  { name: "Document reserch", icon: ClipboardList, link: "/dashboard/document?name='pratik'" },
  { name: "AI Task Breakdown", icon: ListChecks, link: "/dashboard/todo" },
  { name: "Work Tools", icon: Briefcase, link: "/dashboard/tools" },
  { name: "10x Prompt", icon: BotMessageSquare, link: "/dashboard/prompt" },
  { name: "AR/VR Workspace", icon: Gamepad2, link: "/dashboard/ar" },
  { name: "Messaging", icon: MessageSquareText, link: "/dashboard/messaging" },
  { name: "VideCall", icon: Video, link: "/dashboard/video" },
  { name: "Focus Mode", icon: Focus, link: "/dashboard/focus" },
  { name: "Settings", icon: Settings, link: "/dashboard/settings" },
];

export default function EmployeeSidebar({ isOpen, closeSidebar }) {
  const [status, setStatus] = useState(true)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
    localStorage.clear()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div 
        className={`
          fixed top-0 left-0 h-full bg-background border-r z-50
          w-[280px] md:w-[240px] lg:w-[280px]
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <Avatar>
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
              className="p-3 flex items-center gap-3 text-sm rounded-lg bg-blue-100"
              whileHover={{ scale: 1.02 }}
            >
              <Building2 size={18} />
              <h2 className="font-medium">Slash Ritesh</h2>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {companyNav.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-4">
            <motion.div 
              className="flex items-center justify-between bg-muted rounded-lg p-2"
              whileHover={{ scale: 1.02 }}
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Status:</span>
              <Switch
                checked={status}
                onCheckedChange={setStatus}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm font-medium">
                {status ? 'Online' : 'Offline'}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}