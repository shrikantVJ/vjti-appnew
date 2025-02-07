"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FiClock, FiCheck, FiPlayCircle, FiPauseCircle, FiRotateCcw, FiVolume2, FiTrash2 } from 'react-icons/fi'

const FOCUS_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export default function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [isMeditationMode, setIsMeditationMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [timer, setTimer] = useState(FOCUS_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [selectedAudio, setSelectedAudio] = useState("")
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    let interval
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      handleTimerComplete()
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const handleTimerComplete = useCallback(() => {
    setIsTimerRunning(false)
    if (!isBreak) {
      setCompletedPomodoros((prev) => prev + 1)
      setIsBreak(true)
      setTimer(BREAK_TIME)
    } else {
      setIsBreak(false)
      setTimer(FOCUS_TIME)
    }
  }, [isBreak])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const dailyProgress = (completedPomodoros / dailyGoal) * 100

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-t-xl">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">
              Focus & Meditation Hub
            </CardTitle>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-green-400"
            />
          </div>
        </CardHeader>

        {isActive && (
          <CardContent className="p-6 space-y-8">
            <Tabs defaultValue="focus" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="focus"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3"
                >
                  Focus Mode
                </TabsTrigger>
                <TabsTrigger 
                  value="meditation"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3"
                >
                  Meditation Mode
                </TabsTrigger>
              </TabsList>

              <TabsContent value="focus" className="space-y-6">
                <Card className="border-2 border-blue-100 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <div className="text-5xl font-bold text-blue-600 mb-2">
                          {formatTime(timer)}
                        </div>
                        <div className="text-blue-400">
                          {isBreak ? 'Time for a break!' : 'Stay focused'}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`px-6 py-4 rounded-full transition-all ${
                            isTimerRunning 
                              ? 'bg-orange-500 hover:bg-orange-600' 
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {isTimerRunning ? <FiPauseCircle className="mr-2 h-5 w-5" /> : <FiPlayCircle className="mr-2 h-5 w-5" />}
                          {isTimerRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button
                          onClick={() => {
                            setTimer(FOCUS_TIME)
                            setIsTimerRunning(false)
                            setIsBreak(false)
                          }}
                          variant="outline"
                          className="rounded-full border-2 border-blue-200 hover:bg-blue-50"
                        >
                          <FiRotateCcw className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Daily Progress</h3>
                  <Progress value={dailyProgress} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>{completedPomodoros} completed</span>
                    <span>Goal: {dailyGoal}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="What's your focus for this session?"
                      className="rounded-full border-2 border-blue-100 focus:border-blue-300"
                    />
                    <Button 
                      onClick={handleAddTask}
                      className="rounded-full bg-blue-500 hover:bg-blue-600 px-6"
                    >
                      Add Task
                    </Button>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-white border-2 border-blue-50 hover:border-blue-100 transition-all"
                      >
                        <span className={`${task.completed ? 'line-through text-blue-300' : 'text-blue-800'}`}>
                          {task.text}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleToggleTask(task.id)}
                            variant="ghost"
                            size="sm"
                            className={`rounded-full ${task.completed ? 'text-green-500' : 'text-blue-400'}`}
                          >
                            <FiCheck className="h-5 w-5" />
                          </Button>
                          <Button
                            onClick={() => handleRemoveTask(task.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 rounded-full"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="meditation" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-lg font-medium text-blue-800">Select Guided Meditation Audio:</label>
                    <Select onValueChange={setSelectedAudio}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Audio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="https://www.bensound.com/bensound-music/bensound-meditation.mp3">Calm Ocean Waves</SelectItem>
                        <SelectItem value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3">Forest Ambience</SelectItem>
                        <SelectItem value="https://www.sample-videos.com/audio/mp3/wave.mp3">Zen Garden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedAudio && (
                    <div className="space-y-4">
                      <audio controls className="w-full">
                        <source src={selectedAudio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <div className="flex items-center space-x-2">
                        <FiVolume2 className="h-6 w-6" />
                        <Slider
                          value={[volume]}
                          onValueChange={(values) => setVolume(values[0])}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex items-center space-x-2 flex-grow">
                    <FiClock className="text-blue-600 text-2xl" />
                    <span className="text-3xl font-bold text-blue-800">{formatTime(timer)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`flex-grow ${isTimerRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {isTimerRunning ? <FiPauseCircle className="mr-2" /> : <FiPlayCircle className="mr-2" />}
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button
                      onClick={() => {
                        setTimer(FOCUS_TIME)
                        setIsTimerRunning(false)
                      }}
                      variant="outline"
                      className="flex-grow border-blue-600 text-blue-600 hover:bg-blue-100"
                    >
                      <FiRotateCcw className="mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

