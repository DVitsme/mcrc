'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

import {
  Menu as MenuIcon,
  Bell,
  CalendarDays,
  PieChart,
  Cog,
  Copy,
  Folder,
  Home,
  Users,
  ChevronDown,
  Search,
  LogOut,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  current?: boolean
}

interface TeamItem {
  id: number
  name: string
  href: string
  initial: string
  current?: boolean
}

const primaryNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Cases', href: '/dashboard/cases', icon: Folder },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Events', href: '/dashboard/events-management', icon: CalendarDays },
  { name: 'Blog Posts', href: '/dashboard/blog-management', icon: Copy },
  { name: 'Reports', href: '/dashboard/reports', icon: PieChart },
]

const secondaryNavigation: TeamItem[] = [
  { id: 1, name: 'Quick Links', href: '#', initial: 'Q' },
  { id: 2, name: 'Resources', href: '#', initial: 'R' },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [userInitial, setUserInitial] = useState<string>('')

  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching user profile for layout:', error)
        } else if (profileData) {
          setUserName(profileData.full_name || user.email || 'User')
          setUserInitial(
            profileData.full_name
              ? profileData.full_name.charAt(0).toUpperCase()
              : user.email
                ? user.email.charAt(0).toUpperCase()
                : 'U'
          )
        }
      } else {
        setUserName('')
        setUserInitial('')
      }
    }
    fetchUserProfile()
  }, [user, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  const userNavigation = [
    { name: 'Your Profile', href: '/dashboard/profile' },
  ]

  const renderNavLinks = (navItems: NavItem[], isMobile: boolean = false) => (
    <ul role="list" className={cn("-mx-2 space-y-1", isMobile && "mt-2")}>
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={() => isMobile && setSidebarOpen(false)}
            className={cn(
              pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            )}
          >
            <item.icon
              className={cn(
                pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                  ? 'text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )

  const renderSecondaryNavLinks = (navItems: TeamItem[], isMobile: boolean = false) => (
    <>
      <div className={cn("text-xs font-semibold leading-6 text-sidebar-foreground/70", isMobile && "mt-4")}>
        Quick Access
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {navItems.map((team) => (
          <li key={team.name}>
            <Link
              href={team.href}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={cn(
                pathname === team.href
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground text-[0.625rem] font-medium">
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )

  const sidebarContent = (isMobile: boolean = false) => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/dashboard" onClick={() => isMobile && setSidebarOpen(false)}>
          <Image
            height={32}
            width={32}
            alt="MCRC Logo"
            src="/images/logos/mcrc-logo.png"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>{renderNavLinks(primaryNavigation, isMobile)}</li>
          {secondaryNavigation.length > 0 && (
            <li>{renderSecondaryNavLinks(secondaryNavigation, isMobile)}</li>
          )}
          <li className="mt-auto">
            <Link
              href="/dashboard/settings"
              onClick={() => isMobile && setSidebarOpen(false)}
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Cog
                className="h-6 w-6 shrink-0 text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                aria-hidden="true"
              />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      <div>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <span></span>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-0 bg-sidebar border-r-sidebar-border">
            {sidebarContent(true)}
          </SheetContent>
        </Sheet>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-sidebar-border bg-sidebar px-0">
            <ScrollArea className="h-full w-full">
              <div className="px-6 pb-4">
                {sidebarContent(false)}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-foreground lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" />
            </Button>

            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <Search
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground">
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                </Button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={userName} />
                          <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <span className="hidden lg:flex lg:items-center">
                          <span className="ml-4 text-sm font-semibold leading-6 text-foreground" aria-hidden="true">
                            {userName}
                          </span>
                          <ChevronDown className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground -mt-2 mb-1">
                        {user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {userNavigation.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 