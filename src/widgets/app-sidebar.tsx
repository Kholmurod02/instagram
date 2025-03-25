"use client"

import type React from "react"

import {Link} from "react-router"
import { useState, useEffect } from "react"
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Instagram } from "lucide-react"

export default function AppSidebar() {
  const [expanded, setExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setExpanded(window.innerWidth >= 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Navigation items
  const navItems = [
    { href: "/", icon: <Home className="w-6 h-6" />, label: "Главная" },
    { href: "", icon: <Search className="w-6 h-6" />, label: "Поисковый запрос" },
    { href: "/explore", icon: <Compass className="w-6 h-6" />, label: "Интересное" },
    { href: "/reels", icon: <Film className="w-6 h-6" />, label: "Reels" },
    { href: "/chats", icon: <MessageCircle className="w-6 h-6" />, label: "Сообщения" },
    { href: "", icon: <Heart className="w-6 h-6" />, label: "Уведомления" },
    { href: "", icon: <PlusSquare className="w-6 h-6" />, label: "Создать" },
    { href: "/profile", icon: <User className="w-6 h-6" />, label: "Профиль" },
  ]

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t flex justify-around items-center h-16 px-2 z-10">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.href} to={item.href} className="flex flex-col items-center justify-center p-2">
            {item.icon}
          </Link>
        ))}
      </nav>
    )
  }

  // Desktop and tablet sidebar
  return (
    <nav
      className={`flex sticky top-0 left-0 flex-col border-r h-screen bg-black transition-all duration-200 z-30 ${expanded ? "w-[240px]" : "w-[72px]"}`}
    >
      <div className="p-4 mb-6">
        {expanded ? (
          <Link to="/" className="text-2xl font-semibold px-3 py-2 block">
            Instagram
          </Link>
        ) : (
          <Link to="/" className="flex justify-center py-2">
            <Instagram className="w-6 h-6" />
          </Link>
        )}
      </div>

      <div className="flex flex-col space-y-1 flex-1 px-2">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} expanded={expanded} />
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors mt-auto mb-4 mx-2 ${expanded ? "justify-start space-x-4" : "justify-center"}`}
      >
        <Menu className="w-6 h-6" />
        {expanded && <span>Ещё</span>}
      </button>
    </nav>
  )
}

function NavItem({
  href,
  icon,
  label,
  expanded,
}: {
  href: string
  icon: React.ReactNode
  label: string
  expanded: boolean
}) {
  return (
    <Link
      to={href}
      className={`flex items-center rounded-md hover:bg-gray-100 transition-colors p-3 ${expanded ? "justify-start space-x-4" : "justify-center"}`}
    >
      <span>{icon}</span>
      {expanded && <span>{label}</span>}
    </Link>
  )
}
