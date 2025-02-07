"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FiUser, FiBriefcase, FiCalendar, FiUsers, FiFileText, FiGlobe, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export function EmpSettings({ employeeInfo, onSave }) {
  const [editedInfo, setEditedInfo] = useState(employeeInfo)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedInfo)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardTitle className="text-3xl font-bold">Employee Settings</CardTitle>
        <CardDescription className="text-blue-100">Manage your profile and preferences</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiUser className="text-blue-600" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={editedInfo?.name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiMail className="text-blue-600" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedInfo?.email}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiBriefcase className="text-blue-600" />
                <span>Position</span>
              </Label>
              <Input
                id="position"
                name="position"
                value={editedInfo?.position}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiUsers className="text-blue-600" />
                <span>Department</span>
              </Label>
              <Input
                id="department"
                name="department"
                value={editedInfo?.department}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FiFileText className="text-blue-600" />
              <span>Bio</span>
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={editedInfo?.bio}
              onChange={handleChange}
              required
              className="w-full min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiPhone className="text-blue-600" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={editedInfo?.phone}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiMapPin className="text-blue-600" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={editedInfo?.location}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiCalendar className="text-blue-600" />
                <span>Start Date</span>
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={editedInfo?.startDate}
                onChange={handleChange}
                required
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileUrl" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <FiGlobe className="text-blue-600" />
                <span>Profile URL</span>
              </Label>
              <Input
                id="profileUrl"
                name="profileUrl"
                type="url"
                value={editedInfo?.profileUrl}
                onChange={handleChange}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4">
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

