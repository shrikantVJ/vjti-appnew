
import React from 'react'
import { DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '../ui/button';

const CreateEmployee = () => {

 
  return (
    <DialogContent className="w-[350px]">
      <DialogTitle>Add New Employee</DialogTitle>
      <form  className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input name='name' placeholder="Employee name" />
        </div>
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input name='email' placeholder="Employee email" />
        </div>
        <div className="space-y-2">
          <Label>Designation</Label>
          <Input name='designation' placeholder="Employee email" />
        </div>
        <div className="space-y-2">
          <Label>Department</Label>
          <Input name='department' placeholder="Employee email" />
        </div>
        <Button>Send Verification Email</Button>
      </form>
    </DialogContent>
  )
}

export default CreateEmployee