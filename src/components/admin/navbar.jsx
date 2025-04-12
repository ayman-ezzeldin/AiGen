import { Link } from "react-router-dom";
import { Activity, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth-slice";
import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuItemsVariables = [
  {
    id: "home",
    label: "Home",
    path: "/user/home",
  },
  {
    id: "simulator",
    label: "Simulator",
    path: "/user/simulator",
  },
  {
    id: "data",
    label: "Data",
    childs : [
      {
        id: "models",
        label: "Models",
        path: "/user/models",
    },
    {
        id: "dataset",
        label: "Dataset",
        path: "/user/dataset",
    },
    {
        id: "learn",
        label: "Learn",
        path: "/user/learn",
    },
  ]
  },
  {
    id: "social",
    label: "Social",
    childs : [
      {
        id: "community",
        label: "Community",
        path: "/user/community",
      },
      {
        id: "blog",
        label: "Blog",
        path: "/user/blog",
      },
  ]
  },

];


const MenuItems = ({ setOpen }) => {
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpenId(null);
        setOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div className="flex gap-7 items-center" ref={dropdownRef}>
      {MenuItemsVariables.map((item) => (
        <DropdownMenu
          key={item.id}
          open={dropdownOpenId === item.id}
          onOpenChange={(isOpen) =>
            setDropdownOpenId(isOpen ? item.id : null)
          }
        >
          <DropdownMenuTrigger asChild>
            <Link
              to={item.path}
              onClick={() => {
                if (item.path) {
                  setOpen(false); 
                  setDropdownOpenId(null);
                }
              }}
              className="text-md md:text-lg font-medium cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-0"            >
              {item.label}
            </Link>
          </DropdownMenuTrigger>

          {!item.path && (
            <DropdownMenuContent>
              <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {item.childs?.map((child) => (
                <DropdownMenuItem
                  key={child.id}
                  onClick={() => {
                    setDropdownOpenId(null); 
                    setOpen(false); 
                  }}
                >
                  <Link className=" cursor-pointer w-full hover:bg-gray-50 " to={child.path}>{child.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ))}
    </div>
  );
};



export const HeaderRightContent = () => {
  const dispatch = useDispatch();

  return (
    <div className=" flex gap-4 items-center">
      <h3 className=" cursor-pointer" onClick={() => dispatch(logout())}>
        LogOut
      </h3>
      <h3 className=" cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-xl ">
        DownLoad
      </h3>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className=" sticky  w-full top-0 z-40 border-b bg-white">
      <div className=" flex max-w-7xl mx-auto h-20 items-center justify-between px-4">
        <Link to={isAuthenticated ? "/user/home" : "/"} className=" flex gap-2 items-center">
          <Activity className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-wider ">AiGen</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button varient="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <MenuItems setOpen={setOpen} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
