import { useState } from 'react'
import { ChevronsUpDown, LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { getNameInitial } from '@/components/Sidebar/sidebar.helper'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { useAuth } from '@/context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

export function NavUser({ user }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { isMobile } = useSidebar()
  const nameInitial = getNameInitial(user.name)

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const openConfirmationDialog = () => setIsLogoutDialogOpen(true)

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setLoading(true)

      const { error } = await logout()
      if (error) {
        toast({
          title: 'Logout failed',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        navigate('/')
      }
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground dark:hover:bg-neutral-800"
              >
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {nameInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">{user.name}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg dark:bg-neutral-700"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal ">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="w-8 h-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {nameInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-sm leading-tight text-left">
                    <span className="font-semibold truncate">{user.name}</span>
                    <span className="text-xs truncate">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ThemeSwitcher />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openConfirmationDialog}>
                <LogOut disabled={loading} />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        setOpen={setIsLogoutDialogOpen}
        title="Log out"
        description="Are you sure you want to log out?"
        onConfirm={handleLogout}
        variant="destructive"
        loading={loading}
      />
    </>
  )
}
