"use client"

import { ReactNode, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './Header'
import Sidebar from './Sidebar'
import { ThemeProvider } from './ThemeProvider'
import CompletionDropZone from './CompletionDropZone'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex h-screen bg-background text-foreground">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header openSidebar={() => setSidebarOpen(true)} />
            <div className="flex flex-1 overflow-hidden">
              <main className="flex-1 overflow-y-auto p-4">{children}</main>
              <CompletionDropZone />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </DndProvider>
  )
}

