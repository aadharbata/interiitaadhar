import {  useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Menu } from "lucide-react"
import Component from "./nested-tree-accordion"
import Details from "./item-details"
import React from "react"
import usedataStore from "@/dataStore"
import useStore from "@/store"
import { useNavigate } from "react-router-dom"

const OptimisedComponent = React.memo(Component);
const SidebarContent = () => (
    <ScrollArea className="h-full py-2 pl-6 pr-6">
        <OptimisedComponent  />
    </ScrollArea>
);
export default function CollapsibleSidebar() {
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            navigate('/user/login')   
        }

    },[token])
    
    const treeData = usedataStore((state) => state.treeData);
    const setItemId = useStore((state) => state.setItemId);
    // const setTreeData = usedataStore((state) => state.setTreeData);
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleSidebar = () => {
        console.log(treeData);
        setIsExpanded(!isExpanded)
    }
    console.log(treeData);
    return (
        <div className="flex h-screen">
            <aside className={` hidden md:flex flex-col border-r transition-all duration-300 ${isExpanded ? "min-w-fit" : "w-5 border-none" }`}>
                <div className="flex items-center justify-between p-4 pl-1">
                    <div className={`text-3xl font-bold  ${isExpanded ? "block" : "hidden"} hover:cursor-pointer `} onClick={()=>{
                        setItemId("")
                        setIsExpanded(false)
                    }}>Godown Tracker</div>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <ChevronRight className={`h-4 ml-1 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                </div>
                {isExpanded && <SidebarContent  />}
            </aside>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden absolute left-0 top-4">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="min-w-fit ">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            <main className="flex-1 p-5 ml-8 md:ml-3">
                {/* <MinItemCard {...data} /> */}
                <Details/>
                {/* <Navigation locations={locations}/> */}
            </main>
        </div>
    )
}