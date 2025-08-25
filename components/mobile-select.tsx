"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface MobileSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  triggerClassName?: string
  title?: string
}

export function MobileSelect({
  value,
  onValueChange,
  placeholder,
  children,
  triggerClassName,
  title,
}: MobileSelectProps) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false)

  if (!isMobile) {
    // Desktop: Use regular Select
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    )
  }

  // Mobile: Use bottom sheet pattern
  const handleSelect = (newValue: string) => {
    onValueChange(newValue)
    setIsOpen(false)
  }

  // Extract options from children
  const options = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.props.value !== undefined
  )

  const selectedOption = options.find((option) => option.props.value === value)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={triggerClassName}
        variant="outline"
      >
        <span className="flex-1 text-left">
          {selectedOption?.props.children || placeholder}
        </span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="max-h-[70vh]">
          <SheetHeader>
            <SheetTitle className="font-mono text-[#00ffff]">
              {title || placeholder || "Select an option"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            {options.map((option) => (
              <button
                key={option.props.value}
                onClick={() => handleSelect(option.props.value)}
                className={`flex w-full items-center justify-between rounded-lg p-4 text-left transition-colors ${
                  option.props.value === value
                    ? "bg-[#00ffff]/20 text-[#00ffff]"
                    : "text-[#00ffff]/70 hover:bg-[#00ffff]/10"
                }`}
              >
                <span>{option.props.children}</span>
                {option.props.value === value && (
                  <Check className="h-4 w-4 text-[#00ffff]" />
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Re-export SelectItem for convenience
export { SelectItem }
