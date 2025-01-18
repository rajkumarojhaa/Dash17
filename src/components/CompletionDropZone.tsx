import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { toggleTaskStatus } from '@/store/tasksSlice'
import { CheckCircle } from 'lucide-react'
import { useRef, useEffect } from 'react'

export default function CompletionDropZone() {
  const dispatch = useDispatch<AppDispatch>()
  const dropRef = useRef<HTMLDivElement>(null)

  const [{ isOver }, connectDrop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: number }) => {
      if (confirm('Are you sure you want to mark this task as completed?')) {
        dispatch(toggleTaskStatus(item.id))
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  // Connect the `drop` function to the ref
  useEffect(() => {
    if (dropRef.current) {
      connectDrop(dropRef)
    }
  }, [dropRef, connectDrop])

  return (
    <div
      ref={dropRef}
      className={`sm:w-64 w-20 p-4 bg-secondary text-secondary-foreground flex flex-col items-center justify-center transition-colors ${
        isOver ? 'bg-green-200 dark:bg-green-800' : ''
      }`}
    >
      <CheckCircle size={48} className="mb-2" />
      <p className="text-center sm:text-sm text-xs">Drop tasks here to mark as completed</p>
    </div>
  )
}
