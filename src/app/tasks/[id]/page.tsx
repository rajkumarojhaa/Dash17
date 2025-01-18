"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchTasks, toggleTaskStatus } from '@/store/tasksSlice'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TaskDetail() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks())
    }
  }, [dispatch, tasks.length])

  const task = tasks.find(t => t.id === Number(id))

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!task) return <div>Task not found</div>

  const handleToggleStatus = () => {
    if (confirm('Are you sure you want to change the status of this task?')) {
      dispatch(toggleTaskStatus(task.id))
    }
  }

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">{task.description}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}>
            {task.status}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleToggleStatus}>
          {task.status === 'Completed' ? 'Mark as Progress' : 'Mark as Completed'}
        </Button>
      </CardFooter>
    </Card>
  )
}

