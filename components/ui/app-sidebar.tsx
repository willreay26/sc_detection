import { Calendar, Home, Image, DnaIcon } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Logo from "@/components/ui/logo"


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
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Overview",
        url: "/",
        icon: Home,
    },
    {
        title: "Image",
        url: "/imageSection",
        icon: Image,
    },
    {
        title: "Metadata",
        url: "/metadataSection",
        icon: DnaIcon,
    },

]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="">Combining patient-specific metadata with image-based deep learning models to improve diagnostic accuracy in medical imaging.</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2 p-2 ">
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
                <div className="flex flex-col justify-center items-center mb-32">
                    <Logo />
                </div>
                <div className="flex flex-row justify-start gap-2  text-center items-center">
                    <ModeToggle />

                    <h1>30036868 - Will Reay</h1>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
