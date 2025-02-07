"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useGroqAI } from '@/hooks/useGroqAI'
import { checkToken } from "@/utils/getUserData"
import { BaseApiUrl } from "@/utils/constants"



// const dummyTasks = [
//   {
//     id: 1,
//     name: "Develop new feature",
//     priority: "high",
//     deadline: "2024-03-15",
//     status: "in progress",
//     description: "Implement user authentication system with OAuth 2.0. This will involve setting up the backend API endpoints, integrating with a third-party OAuth provider, and creating the frontend components for login and registration. Ensure proper error handling and security measures are in place.",
//     subtasks: []
//   },
//   {
//     id: 2,
//     name: "Refactor database schema",
//     priority: "medium",
//     deadline: "2024-04-01",
//     status: "todo",
//     description: "Optimize the current database schema to improve query performance and reduce redundancy. This task involves analyzing the current schema, identifying bottlenecks, and implementing changes such as adding indexes, normalizing tables, and optimizing join operations.",
//     subtasks: []
//   },
//   {
//     id: 3,
//     name: "Create comprehensive test suite",
//     priority: "high",
//     deadline: "2024-03-30",
//     status: "in progress",
//     description: "Develop a comprehensive test suite covering unit tests, integration tests, and end-to-end tests for the entire application. This includes writing test cases for all major components, setting up a CI/CD pipeline for automated testing, and ensuring at least 80% code coverage.",
//     subtasks: []
//   },
// ]

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-green-100 text-green-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  "in progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
}

const TaskItem = ({ task, onToggleSubtask, onRegenerateSubtasks }) => {
  const { generateSubtasks, isLoading, error } = useGroqAI()
  const [localSubtasks, setLocalSubtasks] = useState(task.subtasks || [])
  const [hasInitialized, setHasInitialized] = useState(false)







  useEffect(() => {
    const fetchSubtasks = async () => {
      if (!hasInitialized && localSubtasks.length === 0) {
        const newSubtasks = await generateSubtasks(task.description)
        setLocalSubtasks(newSubtasks)
        onRegenerateSubtasks(task.id, newSubtasks)
        setHasInitialized(true)
      }
    }
    fetchSubtasks()
  }, [hasInitialized]) // Only depend on hasInitialized

  const handleRegenerateSubtasks = async () => {
    const newSubtasks = await generateSubtasks(task.description)
    setLocalSubtasks(newSubtasks)
    onRegenerateSubtasks(task.id, newSubtasks)
  }

  const toggleSubtask = (subtaskId) => {
    const updatedSubtasks = localSubtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    )
    setLocalSubtasks(updatedSubtasks)
    onToggleSubtask(task.id, subtaskId)
  }

  return (
    <Card className="mb-6 overflow-hidden border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{task.name}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">Deadline: {task.deadline}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={`${priorityColors[task.priority]} capitalize px-2 py-1 text-xs font-semibold rounded-full`}>
              {task.priority}
            </Badge>
            <Badge className={`${statusColors[task.status]} capitalize px-2 py-1 text-xs font-semibold rounded-full`}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Task Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="subtasks">
            <AccordionTrigger>Subtasks</AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <p>Generating subtasks...</p>
              ) : error ? (
                <div>
                  <p className="text-red-500">{error}</p>
                  <Button className="mt-4" onClick={handleRegenerateSubtasks}>
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <ul className="space-y-2">
                    {localSubtasks.map((subtask) => (
                      <li key={subtask.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subtask-${task.id}-${subtask.id}`}
                          checked={subtask.completed}
                          onCheckedChange={() => toggleSubtask(subtask.id)}
                        />
                        <Label
                          htmlFor={`subtask-${task.id}-${subtask.id}`}
                          className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}
                        >
                          {subtask.title}
                        </Label>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4" onClick={handleRegenerateSubtasks} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Regenerate Subtasks'}
                  </Button>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

const TodoList = () => {
  const [tasks, setTasks] = useState([])




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
          updatedAt: task.updatedAt,
          subtasks: []
        })));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])





  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(st =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : task
      )
    )
  }

  const handleRegenerateSubtasks = (taskId, newSubtasks) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, subtasks: newSubtasks } : task
      )
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Task Management</h1>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleSubtask={handleToggleSubtask}
          onRegenerateSubtasks={handleRegenerateSubtasks}
        />
      ))}
    </div>
  )
}

export default TodoList