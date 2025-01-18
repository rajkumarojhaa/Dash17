import { NextResponse } from 'next/server'

const mockTasks = [
  {
    id: 1,
    title: "Complete Assignment",
    description: "Frontend developer task",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Review Code",
    description: "Peer review for recent project",
    status: "Completed"
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Update project README and API docs",
    status: "In Progress"
  },
  {
    id: 4,
    title: "Bug Fixing",
    description: "Address reported issues in the issue tracker",
    status: "In Progress"
  },
  {
    id: 5,
    title: "Team Meeting",
    description: "Weekly sync-up with the development team",
    status: "Completed"
  }
]

export async function GET() {
  return NextResponse.json(mockTasks)
}

