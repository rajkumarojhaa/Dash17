"use client"

import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ThemeProvider } from '@/components/ThemeProvider'
import Layout from '@/components/Layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}

