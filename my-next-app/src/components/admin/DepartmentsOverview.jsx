"use client";

import { useState,useEffect } from "react";
import { DepartmentCard } from "./DepartmentCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateDepartmentForm } from "./CreateDepartmentForm";

import { Toaster, toast } from "sonner";
import { checkToken } from "@/utils/getUserData";
import { BaseApiUrl } from "@/utils/constants";

const initialDepartments = [
  {
    id: "1",
    name: "Human Resources",
    description: "Manages employee relations, recruitment, and workplace policies",
    employeeCount: 15,
    manager: "Jane Smith"
  },
  {
    id: "2",
    name: "Marketing",
    description: "Develops and implements marketing strategies to promote products/services",
    employeeCount: 25,
    manager: "John Doe"
  },
  {
    id: "3",
    name: "Engineering",
    description: "Designs, develops, and maintains software products and infrastructure",
    employeeCount: 50,
    manager: "Alice Johnson"
  },
  {
    id: "4",
    name: "Finance",
    description: "Manages company finances, budgeting, and financial reporting",
    employeeCount: 20,
    manager: "Bob Williams"
  }
]

export function DepartmentOverview() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [depData, setdepData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

  
  
  const handleCreateDepartment = async (newDepartment) => {
    
    let data = await checkToken()
    console.log(data);
    

    const response = await fetch(`${BaseApiUrl}/api/department`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newDepartment.name,
        discription: newDepartment.description,
        adminId: "none",
        // departmentId: 'asdfj',
        departmentId: data?.user?.id,
      }),
    });

    const json = await response.json();

    if (json) {
      toast.success("Department Created Successfully");
      fetchData()
      // Add new department and close dialog
      setDepartments([...departments, { ...newDepartment, id: (departments.length + 1).toString() }]);
      setIsDialogOpen(false); // Close the dialog
    } else {
      toast.error("Failed to create department");
    }
  };





  const fetchData = async()=>{
    let data = await checkToken()
    console.log(data);
    

    const response = await fetch(`${BaseApiUrl}/api/department`, {
      method: 'GET',
      headers: {
        'compId':data?.user?.id
      }
    });
    const json = await response.json();

    if (json) {
      setdepData(json.data)
      console.log(json);
      
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



















  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Departments Overview</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>
                Enter the details of the new department here.
              </DialogDescription>
            </DialogHeader>
            <CreateDepartmentForm onCreateDepartment={handleCreateDepartment} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {depData.map((department) => (
          <DepartmentCard key={department._id} department={department} />
        ))}
      </div>
    </div>
  );
}
