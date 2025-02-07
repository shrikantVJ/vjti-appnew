'use client'

import { useState ,useEffect} from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { BaseApiUrl } from '@/utils/constants'

export default function CreateTaskForm({deptId, onSubmit, onClose }) {
const [userEmail, setUserEmail] = useState([])

  const [task, setTask] = useState({
    name: '',
    priority: '',
    deadline: '',
    status: 'in progress',
    description: '',
    username: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask(prevTask => ({ ...prevTask, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setTask(prevTask => ({ ...prevTask, [name]: value }))
  }

  const handleDateSelect = (date) => {
    setTask(prevTask => ({ ...prevTask, deadline: format(date, 'yyyy-MM-dd') }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...task, id: Date.now() })
  }




  const fetchData = async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/api/member/checkuser`, {
        method: 'GET',
        headers: {
          'id': deptId
        }
      });
      
      const json = await response.json();

      if (json) {
        console.log(json);
        setUserEmail(json.data)
        
        // setMytasks(json.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


   useEffect(() => {
      fetchData()
      // This effect would typically fetch tasks from an API
      
    }, [])



  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" onValueChange={(value) => handleSelectChange('priority', value)} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="username">Asing User</Label>
            <Select name="username" onValueChange={(value) => handleSelectChange('username', value)} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All User" />
              </SelectTrigger>
              <SelectContent>
                {userEmail.map((item, index)=>(<SelectItem key={index} value={item.memberId}>{item.memberId}</SelectItem>))}
                {/* <SelectItem value="low">Aman</SelectItem>
                <SelectItem value="medium">rhit</SelectItem>
                <SelectItem value="high">harshit</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!task.deadline && "text-muted-foreground"}`}
                >
                  {task.deadline ? format(new Date(task.deadline), 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={task.deadline ? new Date(task.deadline) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Create Task</Button>
        </form>
      </motion.div>
    </motion.div>
  )
}
