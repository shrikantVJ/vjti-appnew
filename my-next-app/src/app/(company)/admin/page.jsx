'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Users, Briefcase, CheckCircle, AlertCircle } from "lucide-react";

const DashboardPage = () => {
  const [organizationDetails, setOrganizationDetails] = useState({
    name: "TechCorp",
    established: "2005",
    address: "123 Silicon Valley, CA",
  });

  const employees = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Manager" },
  ];

  const departments = [
    { id: 1, name: "Development", head: "Alice" },
    { id: 2, name: "Design", head: "Bob" },
    { id: 3, name: "HR", head: "Charlie" },
  ];

  const tasks = [
    { id: 1, title: "Build Landing Page", status: "In Progress" },
    { id: 2, title: "Design Logo", status: "Completed" },
    { id: 3, title: "Setup CI/CD Pipeline", status: "Pending" },
  ];

  // Additional data for charts
  const departmentStats = [
    { name: 'Development', employees: 15, budget: 150000, projects: 8 },
    { name: 'Design', employees: 8, budget: 80000, projects: 5 },
    { name: 'HR', employees: 5, budget: 50000, projects: 3 },
    { name: 'Marketing', employees: 10, budget: 100000, projects: 6 },
  ];

  const monthlyProgress = [
    { month: 'Jan', completed: 12, pending: 5 },
    { month: 'Feb', completed: 15, pending: 3 },
    { month: 'Mar', completed: 18, pending: 7 },
    { month: 'Apr', completed: 14, pending: 4 },
    { month: 'May', completed: 20, pending: 6 },
  ];

  const taskDistribution = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#3B82F6' },
    { name: 'Pending', value: 25, color: '#EF4444' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <h3 className="text-2xl font-bold">{employees.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Briefcase className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <h3 className="text-2xl font-bold">{departments.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-emerald-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <h3 className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'Completed').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-red-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Pending Tasks</p>
              <h3 className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'Pending').length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" fill="#3B82F6" name="Employees" />
                  <Bar dataKey="projects" fill="#10B981" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Tabs Section */}
      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        {/* Organization Details */}
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {organizationDetails.name}</p>
              <p><strong>Established:</strong> {organizationDetails.established}</p>
              <p><strong>Address:</strong> {organizationDetails.address}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees */}
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {employees.map((employee) => (
                  <li key={employee.id} className="my-2">
                    {employee.name} - <span className="text-muted">{employee.role}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {departments.map((department) => (
                  <li key={department.id} className="my-2">
                    {department.name} (Head: {department.head})
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id} className="my-2">
                    {task.title} - <span className="text-muted">{task.status}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-4">Add New Task</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
