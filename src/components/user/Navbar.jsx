import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth-slice";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../DefaultPage/assets/Icons/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatRoom from "../../pages/user/ChatRoom";
import API_URL from "../../utils/api";
import { debounce } from "lodash";


const MenuItemsVariables = [
  { id: "home", label: "Home", path: "/user/home" },
  { id: "projects", label: "Projects", path: "/user/projects" },
  {
    id: "data",
    label: "Data",
    childs: [
      { id: "models", label: "Models", path: "/user/models" },
      { id: "dataset", label: "Dataset", path: "/user/dataset" },
      { id: "learn", label: "Learn", path: "/user/learn" },
      { id: "arch", label: "Arch", path: "/user/arch" },
    ],
  },
  {
    id: "social",
    label: "Social",
    childs: [
      { id: "community", label: "Community", path: "/user/community" },
      { id: "blog", label: "Blog", path: "/user/blog" },
    ],
  },
];

const MenuItems = ({ open, setOpen, user }) => {
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div
      className={`text-gray-700 ${open ? "flex-col" : "flex-row"} flex items-center gap-5`}
      ref={dropdownRef}
    >
      {MenuItemsVariables.map((item) => (
        <DropdownMenu
          key={item.id}
          open={dropdownOpenId === item.id}
          onOpenChange={(isOpen) => setDropdownOpenId(isOpen ? item.id : null)}
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
              className="text-md md:text-lg font-medium cursor-pointer"
            >
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
                  <Link
                    className="cursor-pointer w-full hover:bg-gray-50"
                    to={child.path}
                  >
                    {child.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ))}

      {user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-lg">Chat</Button>
          </DialogTrigger>
          <DialogContent className="border-none rounded-2xl">
            <div className="w-[710px] chat-room rounded-2xl">
              <ChatRoom />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const HeaderRightContent = ({ open, user }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchprofile = async () => {
      setLoadingProfile(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${API_URL}profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProfile(data.profile.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchprofile();
  }, []);

  return (
    <div
      className={`${
        open ? "flex-col mr-6" : "flex-row"
      } w-full flex gap-3 items-center ml-7`}
    >
      {user ? (
        <>
          <Link
            to="/"
            className="border px-4 py-2 rounded-xl border-blue-400 hover:text-white hover:bg-blue-500 duration-300"
            onClick={() => dispatch(logout())}
          >
            LogOut
          </Link>
          {loadingProfile ? (
            <div className="bg-gray-300 w-12 h-12 rounded-full animate-pulse"></div>
          ) : (
            <Link to="/user/settings/profile">
              <img
                src={profile || "/default-avatar.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            </Link>
          )}
        </>
      ) : (
        <>
          <Link
            to="/auth/login"
            className="border px-4 py-2 rounded-xl border-blue-400 hover:text-white hover:bg-blue-500 duration-300"
          >
            SignIn
          </Link>
          <Link
            to="/auth/register"
            className="bg-blue-600 text-white px-3 py-2 rounded-xl"
          >
            SignUp
          </Link>
        </>
      )}
    </div>
  );
};

const fetchAllUsers = async () => {
  let allUsers = [];
  let nextUrl = `${API_URL}users/`;
  while (nextUrl) {
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();
      allUsers.push(...data.results);
      nextUrl = data.next;
    } catch (err) {
      console.warn("❌ Failed to fetch users:", err);
      break;
    }
  }
  return allUsers;
};

const NavModel = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.length < 1) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      const users = await fetchAllUsers();
      const filtered = users.filter((user) =>
        user.username?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeSearchModal();
    }
  };

  useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchModalOpen(true)}
        className="bg-gray-100 hover:bg-gray-300 text-gray-600 rounded-xl w-36 flex items-center gap-3 duration-300"
      >
        <div>
          <Search className="h-5 w-5 " />
          <span className="sr-only">Search users</span>
        </div>
        <span>Search..</span>
      </Button>
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={closeSearchModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Search Users</h3>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by username or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border text-gray-700 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={searchInputRef}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {searchResults.map((user) => (
                  <Link
                    key={user.id}
                    to={`/user/profile/${user.username}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                    onClick={closeSearchModal}
                  >
                    <img
                      src={user.profile.image || "/default-avatar.png"}
                      alt={user.username}
                      className="object-cover rounded-full h-12 w-12"
                    />
                    <div>
                      <h4 className="text-sm font-semibold">{user.username}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchQuery.length >= 1 ? (
              <p>No users found.</p>
            ) : (
              <p className="text-gray-500">Start typing to search...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <header className="sticky w-full top-0 z-40 border-b bg-white">
      <div className="flex max-w-7xl mx-auto h-20 items-center justify-between px-4">
        <Link
          to={isAuthenticated ? "/user/home" : "/"}
          className="flex gap-2 items-center"
        >
          <img src={logo} alt="logo" className="h-10 w-10" />
          <span className="font-bold text-2xl tracking-wider">AINO</span>
        </Link>
        { isAuthenticated && <NavModel {...{ isSearchModalOpen, setIsSearchModalOpen }} />}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button  size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs flex flex-col items-center pt-32 bg-white"
          >
            <MenuItems open={open} setOpen={setOpen} user={user} />
            <HeaderRightContent open={open} user={user} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems open={open} setOpen={setOpen} user={user} />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent open={open} user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;