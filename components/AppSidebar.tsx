'use client'
import { auth } from "@/firebase"
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import useUserStore from "@/stores/user"
import { useAuthContext } from "@/context/auth"

// Menu items.
const items = [
  {
    title: "Bookings",
    url: "",
    icon: Home,
  },
]

export function AppSidebar() {
  const appNameAlias = process.env.APP_NAME_ALIAS

  const router = useRouter()
  const { logout } = useAuthContext()
  const { email } = useUserStore()

  const signout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <Sidebar className="[&_*]:text-base">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{appNameAlias}</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive>
                    <Link href={`/app/${item.url}`}>
                      <item.icon className="text-black" />
                      <span className="text-gray-700 font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> <span className="truncate font-semibold">{email}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={signout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}