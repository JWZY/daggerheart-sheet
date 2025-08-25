"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { createPortal } from "react-dom"

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
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

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
      if (containerRef.current && isOpen) {
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
  }, [isOpen])

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
        break
    }
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchTerm("")
    setHighlightedIndex(-1)
  }

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: `${dropdownPosition.top}px`,
        left: `${dropdownPosition.left}px`,
        width: `${dropdownPosition.width}px`,
        zIndex: 99999,
      }}
      className="max-h-60 overflow-y-auto rounded-md border border-[#00ffff] bg-black/95 shadow-lg backdrop-blur-sm"
    >
      {filteredOptions.length === 0 ? (
        <div className="px-3 py-2 font-sans text-sm text-[#00ffff]/50">
          No options found
        </div>
      ) : (
        filteredOptions.map((option, index) => (
          <div
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
              index === highlightedIndex
                ? "bg-[#00ffff]/20 text-[#00ffff]"
                : "text-[#00ffff] hover:bg-[#00ffff]/10"
            }`}
          >
            <div className="font-mono font-medium">{option.label}</div>
            {option.description && (
              <div className="mt-1 font-sans text-[#00ffff]/70">
                {option.description}
              </div>
            )}
          </div>
        ))
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

      {isClient && createPortal(dropdownContent, document.body)}
    </>
  )
}
