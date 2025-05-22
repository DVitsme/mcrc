"use client"

import {
  CreditCardIcon,
  MoreVerticalIcon,
  LogOutIcon,
  BellIcon,
  UserCircleIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth-context"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user, profile } = useAuth()
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!user || !profile) return null

  const defaultAvatar = "/images/photos/default-user-icon.png"
  const avatarUrl = profile.avatar_url || defaultAvatar
  const displayName = profile.full_name || user.email?.split('@')[0] || 'User'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {profile.role || 'User'}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            side={isMobile ? "top" : "right"}
            align={isMobile ? "end" : "start"}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                <UserCircleIcon className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon className="mr-2 size-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon className="mr-2 size-4" />
                <span>Billing</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOutIcon className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
