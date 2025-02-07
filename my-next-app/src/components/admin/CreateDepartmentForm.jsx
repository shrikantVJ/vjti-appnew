import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CreateDepartmentForm({ onCreateDepartment }) {
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    employeeCount: 0,
    budget: 0,
    manager: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDepartment(prev => ({
      ...prev,
      [name]: name === "employeeCount" || name === "budget" ? parseInt(value, 10) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateDepartment(newDepartment)
    setNewDepartment({
      name: "",
      description: "",
      employeeCount: 0,
      budget: 0,
      manager: ""
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          name="name"
          value={newDepartment.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={newDepartment.description}
          onChange={handleInputChange}
          required
        />
      </div>
   
      <div className="space-y-2">
        <Label htmlFor="manager">Manager</Label>
        <Input
          id="manager"
          name="manager"
          value={newDepartment.manager}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit">Create Department</Button>
    </form>
  )
}

