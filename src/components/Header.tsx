import { useEffect, useState } from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface HeaderProps {
  openSidebar: () => void
}

export default function Header({ openSidebar }: HeaderProps) {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={openSidebar}>
          <Menu />
        </Button>
        <h1 className="text-2xl font-bold">{greeting}, User</h1>
      </div>
      <ModeToggle />
    </header>
  )
}

