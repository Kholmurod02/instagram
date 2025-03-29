"use client"
import { cn } from "@/shared/lib/utils"
import {Search} from 'lucide-react'

import * as React from "react"
import { X } from "lucide-react"

interface DrawerSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  searchDrawer: boolean;
  setSearchDrawer: (value: boolean) => void;
}

export default function DrawerSearch({
  searchDrawer,
  setSearchDrawer,
  className, ...props 
}: DrawerSearchProps) {

  const [isFocused, setIsFocused] = React.useState(false)
  const [value, setValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleClear = () => {
    setValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }


  return (
   <>
   <div className={cn(
          "fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-opacity",
          searchDrawer ? "opacity-0" : "opacity-0 pointer-events-none",
        )} onClick={() => setSearchDrawer(false)} />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 rounded-tr-[15px] rounded-br-[15px] bottom-0 z-50 w-[300px] sm:w-[400px] bg-background border-r shadow-lg transition-transform duration-300 ease-in-out",
          searchDrawer ? "translate-x-18" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col py-[20px] w-[90%] m-auto gap-[30px] h-[100vh]">
          <div>
            <p className='text-[25px] text-white font-semibold  tracking-[1px] '>Поисковый запрос</p>
          </div>
          <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "h-[40px] w-full rounded-[7px] bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out",
          isFocused || value ? "pl-3 pr-8" : "pl-8 pr-3",
          className,
        )}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {!isFocused && !value && (
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 ease-in-out" />
      )}

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 ease-in-out"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
        </div>
      </div>
   </>
    
  )
}

