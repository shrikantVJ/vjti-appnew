import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, DollarSign } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DepartmentCard({ department }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{department.name}</CardTitle>
        <CardDescription>{department.discription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${department.manager}`} alt={department.manager} />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Manager</p>
            <p className="text-sm text-muted-foreground">{department.manager}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">{department.employeeCount} employees</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">${department.budget}</span>
            </div>
          </div> */}
          <div>
          </div>
          <Button asChild>
            <Link href={`/tl-dashboard/${department._id}`}>View details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

