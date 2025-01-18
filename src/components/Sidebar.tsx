import Link from 'next/link'
import { Home, CheckSquare, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const sidebarContent = (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
      <nav className="space-y-2">
        <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/tasks" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10">
          <CheckSquare size={20} />
          <span>Tasks</span>
        </Link>
        <Link href="/profile" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/10">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </nav>
    </ScrollArea>
  )

  return (
    <>
      <aside className="hidden md:block w-64 bg-secondary text-secondary-foreground">
        {sidebarContent}
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-6">
            <SheetTitle>Menu</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="absolute right-4 top-4">
              <X />
            </Button>
          </SheetHeader>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}

