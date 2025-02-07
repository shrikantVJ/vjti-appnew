"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { ChevronDown, ChevronUp, Trash2, Search, Filter, SortAsc, SortDesc } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { checkToken } from "@/utils/getUserData"
import { BaseApiUrl } from "@/utils/constants"

const priorityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  medium: "bg-green-100 text-green-800 border-green-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800 border-gray-200",
  "in progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
}

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "No date set";
      }
      return format(date, "yyyy-MM-dd");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  }

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const cardVariants = {
    collapsed: { height: "auto" },
    expanded: { height: "auto" },
  }

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: "auto" },
  }

  const isOverdue = task.deadline ? isBefore(new Date(task.deadline), new Date()) && task.status !== "completed" : false;
  const isDueToday = task.deadline ? isToday(new Date(task.deadline)) && task.status !== "completed" : false;

  return (
    <motion.div
      layout
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className={`mb-4 ${task.status === "completed" ? "opacity-50" : ""}`}
    >
      <Card className={`w-full bg-white dark:bg-gray-800 border-l-4 ${
        isOverdue ? "border-l-red-500" : isDueToday ? "border-l-yellow-500" : "border-l-blue-500"
      } shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{task.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Due: {formatDate(task.deadline)}
                {isOverdue && <span className="ml-2 text-red-500 font-semibold">Overdue!</span>}
                {isDueToday && <span className="ml-2 text-yellow-500 font-semibold">Due today!</span>}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={`${priorityColors[task.priority]} capitalize px-2 py-1 text-xs font-semibold rounded-full border`}>
                {task.priority}
              </Badge>
              <Badge className={`${statusColors[task.status]} capitalize px-2 py-1 text-xs font-semibold rounded-full border`}>
                {task.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{task.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "todo")}>
                    To Do
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "in progress")}>
                    In Progress
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onStatusChange(task.id, "completed")}>
                    Completed
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" /> Less Details
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" /> More Details
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [mytasks, setMyTasks] = useState([])
  const [sortBy, setSortBy] = useState("deadline")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const fetchTasks = async () => {
    let data = await checkToken()
    try {
      const response = await fetch(`${BaseApiUrl}/api/task/userId`, {
        method: 'GET',
        headers: {
          'id': data.user.email
        }
      });
      
      const json = await response.json();

      if (json) {
        setTasks(json.data.map(task => ({
          id: task._id,
          name: task.title,
          priority: task.priority.toLowerCase(),
          deadline: task.dueDate,
          status: task.status.toLowerCase(),
          description: task.description,
          assignedBy: task.assignedBy,
          assignedTo: task.assignedTo,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt
        })));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const toggleFilterPriority = (priority) => {
    setFilterPriority(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    )
  }

  const sortedAndFilteredTasks = tasks
    .filter(task => 
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority.length === 0 || filterPriority.includes(task.priority)) &&
      (task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return sortOrder === "asc" 
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline)
      } else if (sortBy === "priority") {
        const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 }
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Task Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === "deadline" ? "default" : "outline"}
            onClick={() => setSortBy("deadline")}
            className="w-36"
          >
            By Deadline
          </Button>
          <Button
            variant={sortBy === "priority" ? "default" : "outline"}
            onClick={() => setSortBy("priority")}
            className="w-36"
          >
            By Priority
          </Button>
          <Button variant="outline" onClick={toggleSortOrder} className="w-36">
            {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                Filter Priority
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-4 space-y-2">
                {["low", "medium", "high", "urgent"].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={priority}
                      checked={filterPriority.includes(priority)}
                      onCheckedChange={() => toggleFilterPriority(priority)}
                    />
                    <Label htmlFor={priority} className="capitalize">{priority}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {sortedAndFilteredTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
      <div>
        {mytasks.map((item,index)=>(
          <div key={index}>{item.description}</div>
        ))}
      </div>
    </div>
  )
}

export default Task

