import Link from 'next/link'
import { useDrag } from 'react-dnd'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Task, toggleTaskStatus } from '@/store/tasksSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useRef, useEffect } from 'react'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const dragRef = useRef<HTMLDivElement>(null)

  const [{ isDragging }, connectDrag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Connect the `drag` function to the ref
  useEffect(() => {
    if (dragRef.current) {
      connectDrag(dragRef)
    }
  }, [dragRef, connectDrag])

  const handleToggleStatus = () => {
    if (confirm('Are you sure you want to change the status of this task?')) {
      dispatch(toggleTaskStatus(task.id))
    }
  }

  return (
    <Card
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <CardHeader>
        <CardTitle>
          <Link href={`/tasks/${task.id}`} className="hover:underline">
            {task.title}
          </Link>
        </CardTitle>
        <CardDescription>Task ID: {task.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          }`}
        >
          {task.status}
        </span>
        <Button onClick={handleToggleStatus}>
          {task.status === 'Completed' ? 'Mark as Progress' : 'Mark as Completed'}
        </Button>
      </CardFooter>
    </Card>
  )
}
