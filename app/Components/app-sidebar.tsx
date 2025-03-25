import { Calendar, Home, Image, DnaIcon } from "lucide-react"
import { ModeToggle } from "@/app/Components/mode-toggle"
import Logo from "@/app/Components/logo"


import Link from "next/link"

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
} from "@/app/Components/sidebar"

// Menu items.
const items = [
    {
        title: "Fusion",
        url: "/",
        icon: Home,
    },
    {
        title: "Image only",
        url: "/imageSection",
        icon: Image,
    },
    {
        title: "Metadata only",
        url: "/metadataSection",
        icon: DnaIcon,
    },

]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel >
                        <div className="flex w-full justify-center py-4 ">
                            <Logo />
                        </div>
                        <div className="flex flex-col justify-start items-start w-full p-2">SkinSense - AI
                            <div className="flex text-xs font-medium">Using Both Images and Patient Information to Improve Skin Cancer Detection
                            </div>
                        </div>

                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2 p-4 ">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>

                <div className="flex flex-row justify-start gap-2  text-center items-center">
                    <ModeToggle />

                    <h1>30036868 - Will Reay</h1>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
