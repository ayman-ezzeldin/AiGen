import { Link} from "react-router-dom"
import { Activity, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {Button} from '../ui/button'
import { useDispatch } from 'react-redux'
import { AdminViewHeaderMenuItems } from "../../config"
import { logout } from "@/store/auth-slice";
import { useState } from "react"

// eslint-disable-next-line react/prop-types
const MenuItems = ({ setOpen }) => {

  return (
    <nav className=" flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row" >
      {
        AdminViewHeaderMenuItems.map(menuItem =>
          <Link
            to={menuItem.path}
            onClick={() => {
              setOpen ? setOpen(false) : null
            } }
            key={menuItem.id} className=" text-md md:text-lg font-medium cursor-pointer" > {menuItem.label}
          </Link>
        )
      }
    </nav>
  )
}

export const HeaderRightContent = () => {
  const dispatch = useDispatch()

  return (
      <div className=" flex gap-4 items-center" >
        <h3 className=" cursor-pointer" onClick={() => dispatch(logout())} >LogOut</h3>
        <h3 className=" cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-xl " >DownLoad</h3>
      </div>
  )
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <header className=" sticky  w-full top-0 z-40 border-b bg-white" >
      <div className=" flex max-w-7xl mx-auto h-20 items-center justify-between px-4" >
        <Link to='/admin/home' className=" flex gap-2 items-center" >
          <Activity className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-wider " >AiGen</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen} >
          <SheetTrigger asChild >
            <Button varient="outline" size='icon' className="lg:hidden">
            <Menu />
            <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className="w-full max-w-xs bg-white" >
            <MenuItems setOpen={setOpen} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block" >
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div> 
      </div>
    </header>
  )
}

export default Navbar