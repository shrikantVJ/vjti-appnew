"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export function CompanyInfoForm({ companyInfo, onSave }) {
  const [editedInfo, setEditedInfo] = useState(companyInfo)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedInfo)
    
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input
          id="name"
          name="name"
          value={editedInfo?.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          value={editedInfo?.industry}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="foundedYear">Founded Year</Label>
        <Input
          id="foundedYear"
          name="foundedYear"
          type="number"
          value={editedInfo?.foundedYear}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="employeeCount">Employee Count</Label>
        <Input
          id="employeeCount"
          name="employeeCount"
          type="number"
          value={editedInfo?.employeeCount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="mission">Mission Statement</Label>
        <Textarea
          id="mission"
          name="mission"
          value={editedInfo?.mission}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={editedInfo?.website}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}

