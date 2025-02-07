'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  FileText, 
  TableProperties, 
  PenTool, 
  LayoutList, 
  CalendarDays,
  FolderOpen,
  Grid,
  MonitorPlay,
  Boxes
} from 'lucide-react';

const tools = [
  {
    category: "Google Workspace",
    color: "bg-blue-500/10 text-blue-500",
    tools: [
      { name: "Gmail", icon: Mail, link: "https://gmail.com", description: "Access your work email", color: "text-red-500" },
      { name: "Google Calendar", icon: CalendarDays, link: "https://calendar.google.com", description: "Manage your schedule", color: "text-blue-500" },
      { name: "Google Drive", icon: FolderOpen, link: "https://drive.google.com", description: "Cloud storage", color: "text-green-500" },
      { name: "Google Docs", icon: FileText, link: "https://docs.google.com", description: "Document editing", color: "text-indigo-500" },
      { name: "Google Sheets", icon: Grid, link: "https://sheets.google.com", description: "Spreadsheets", color: "text-emerald-500" },
      { name: "Google Slides", icon: MonitorPlay, link: "https://slides.google.com", description: "Presentations", color: "text-yellow-500" },
    ]
  },
  {
    category: "Project Management",
    color: "bg-purple-500/10 text-purple-500",
    tools: [
      { name: "Jira", icon: Boxes, link: "https://jira.com", description: "Issue tracking", color: "text-blue-500" },
      { name: "Trello", icon: LayoutList, link: "https://trello.com", description: "Kanban boards", color: "text-sky-500" },
    ]
  },
  {
    category: "Productivity",
    color: "bg-emerald-500/10 text-emerald-500",
    tools: [
      { name: "Excel Online", icon: TableProperties, link: "https://office.live.com/excel", description: "Spreadsheet editor", color: "text-green-600" },
      { name: "Draw.io", icon: PenTool, link: "https://draw.io", description: "Diagram creation", color: "text-orange-500" },
    ]
  }
];

export default function WorkTools() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Work Tools
        </h1>
      </div>
      
      {tools.map((category) => (
        <div key={category.category} className="space-y-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg ${category.color}`}>
            <h2 className="text-xl font-semibold">{category.category}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map((tool) => (
              <Card 
                key={tool.name} 
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-t-4"
                style={{ borderTopColor: tool.color.split('text-')[1].split('-')[0] }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-background shadow-sm ${tool.color}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className={`${tool.color}`}>{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full hover:scale-[1.02] transition-transform"
                    style={{ 
                      backgroundColor: tool.color.split('text-')[1].split('-')[0],
                      color: 'white'
                    }}
                    onClick={() => window.open(tool.link, '_blank')}
                  >
                    Open {tool.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 