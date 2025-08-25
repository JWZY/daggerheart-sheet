"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, X } from "lucide-react"
import { createPortal } from "react-dom"
import { useIsMobile } from "@/hooks/use-mobile"

interface Option {
  value: string
  label: string
  description?: string
}

interface SearchableSelectProps {
  id?: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder: string
  className?: string
  required?: boolean
}

export function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  required = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(new Set())
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useIsMobile()

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (containerRef.current && isOpen && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const dropdownHeight = 240 // Max height of dropdown

        // Calculate if dropdown should appear above or below
        const spaceBelow = viewportHeight - rect.bottom
        const shouldShowAbove =
          spaceBelow < dropdownHeight && rect.top > dropdownHeight

        setDropdownPosition({
          top: shouldShowAbove
            ? rect.top - dropdownHeight - 4
            : rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        })
      }
    }

    updateDropdownPosition()

    if (isOpen) {
      window.addEventListener("resize", updateDropdownPosition)
      window.addEventListener("scroll", updateDropdownPosition, true)

      return () => {
        window.removeEventListener("resize", updateDropdownPosition)
        window.removeEventListener("scroll", updateDropdownPosition, true)
      }
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchTerm("")
        setHighlightedIndex(-1)
        setExpandedOptions(new Set())
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true)
        setHighlightedIndex(0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          onChange(filteredOptions[highlightedIndex].value)
          setIsOpen(false)
          setSearchTerm("")
          setHighlightedIndex(-1)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSearchTerm("")
        setHighlightedIndex(-1)
        setExpandedOptions(new Set())
        break
    }
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchTerm("")
    setHighlightedIndex(-1)
    setExpandedOptions(new Set())
  }

  const toggleDescriptionExpand = (
    optionValue: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()
    setExpandedOptions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(optionValue)) {
        newSet.delete(optionValue)
      } else {
        newSet.add(optionValue)
      }
      return newSet
    })
  }

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      style={
        isMobile
          ? {
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 99999,
            }
          : {
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 99999,
            }
      }
      className={
        isMobile
          ? "max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-[#00ffff] bg-black/95 shadow-lg backdrop-blur-sm"
          : "max-h-60 overflow-y-auto rounded-md border border-[#00ffff] bg-black/95 shadow-lg backdrop-blur-sm"
      }
    >
      {isMobile && (
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#00ffff]/30 bg-black/95 p-4">
          <h3 className="font-mono text-lg font-medium text-[#00ffff]">
            {placeholder}
          </h3>
          <button
            onClick={() => {
              setIsOpen(false)
              setSearchTerm("")
              setHighlightedIndex(-1)
              setExpandedOptions(new Set())
            }}
            className="rounded-full p-1 text-[#00ffff] hover:bg-[#00ffff]/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      {filteredOptions.length === 0 ? (
        <div
          className={`font-sans text-sm text-[#00ffff]/50 ${isMobile ? "px-4 py-4" : "px-3 py-2"}`}
        >
          No options found
        </div>
      ) : (
        filteredOptions.map((option, index) => {
          const isExpanded = expandedOptions.has(option.value)
          const hasLongDescription =
            option.description && option.description.length > 80
          const displayDescription =
            option.description &&
            (isExpanded || !hasLongDescription
              ? option.description
              : option.description.substring(0, 80) + "...")

          return (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`cursor-pointer transition-colors ${
                isMobile ? "px-4 py-4" : "px-3 py-2"
              } text-sm ${
                index === highlightedIndex
                  ? "bg-[#00ffff]/20 text-[#00ffff]"
                  : "text-[#00ffff] hover:bg-[#00ffff]/10"
              }`}
            >
              <div className="font-mono font-medium">{option.label}</div>
              {option.description && (
                <div className="mt-1">
                  <span className="font-sans text-[#00ffff]/70">
                    {displayDescription}
                  </span>
                  {hasLongDescription && (
                    <button
                      onClick={(e) => toggleDescriptionExpand(option.value, e)}
                      className="ml-2 text-xs text-[#00ffff] underline hover:text-[#00ffff]/80"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )

  return (
    <>
      <div className="relative" ref={containerRef}>
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={isOpen ? searchTerm : selectedOption?.label || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full cursor-pointer rounded-md px-3 py-2 pr-10 font-sans ${className}`}
            autoComplete="off"
          />
          <ChevronDown
            className={`absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#00ffff] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isClient &&
        createPortal(
          <>
            {isOpen && isMobile && (
              <div
                className="fixed inset-0 z-[99998] bg-black/50"
                onClick={() => {
                  setIsOpen(false)
                  setSearchTerm("")
                  setHighlightedIndex(-1)
                  setExpandedOptions(new Set())
                }}
              />
            )}
            {dropdownContent}
          </>,
          document.body
        )}
    </>
  )
}
