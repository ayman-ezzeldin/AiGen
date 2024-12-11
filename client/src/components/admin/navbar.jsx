import { Link, useNavigate } from "react-router-dom"
import { Activity, LogOut, Menu, UserCog } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {Button} from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AdminViewHeaderMenuItems } from "../../config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from "@/store/auth-slice";
import { useState } from "react"


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
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black cursor-pointer" >
            <AvatarFallback className=" bg-black text-white font-extrabold" >
              {user?.username?.slice(0,2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className=" w-48 mt-10 bg-white" >
          <DropdownMenuLabel>Logged in {user?.username} </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className=" cursor-pointer" onClick={()=> navigate('/shop/account')} >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" cursor-pointer" onClick={() => dispatch(logoutUser())} >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

const ShoppingHeader = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <header className=" sticky top-0 z-40 border-b bg-background" >
      <div className=" flex h-16 items-center justify-between px-4 md:px-6" >
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

export default ShoppingHeader