"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Heart,
  Activity,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
} from "lucide-react"
import Link from "next/link"

export default function ArmorPreviewPage() {
  const [maxArmor, setMaxArmor] = useState(3)
  const [currentArmor, setCurrentArmor] = useState(2)
  const [evasion, setEvasion] = useState(12)
  const [minorThreshold, setMinorThreshold] = useState(7)
  const [majorThreshold, setMajorThreshold] = useState(13)
  const [currentHP, setCurrentHP] = useState(3)
  const [maxHP, setMaxHP] = useState(6)
  const [currentStress, setCurrentStress] = useState(1)
  const [maxStress, setMaxStress] = useState(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff]/80"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Character Sheet
          </Link>
          <h1 className="font-mono text-3xl tracking-wider text-[#00ffff]">
            ARMOR SYSTEM PREVIEW
          </h1>
          <p className="mt-2 text-[#00ffff]/70">
            Test different visual representations for the armor system
          </p>
        </div>

        {/* Control Panel */}
        <Card className="cyber-border mb-8 bg-black/50">
          <CardHeader>
            <CardTitle className="font-mono text-[#ff00ff]">
              TEST VALUES
            </CardTitle>
          </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
              <div>
                <Label className="text-xs text-[#00ffff]">Max Armor</Label>
                <Input
                  type="number"
                  value={maxArmor}
                  onChange={(e) => setMaxArmor(Number(e.target.value))}
                  className="cyber-input"
                />
              </div>
              <div>
                <Label className="text-xs text-[#00ffff]">Current Armor</Label>
                <Input
                  type="number"
                  value={currentArmor}
                  onChange={(e) =>
                    setCurrentArmor(Math.min(Number(e.target.value), maxArmor))
                  }
                  className="cyber-input"
                />
              </div>
              <div>
                <Label className="text-xs text-[#00ffff]">Evasion</Label>
                <Input
                  type="number"
                  value={evasion}
                  onChange={(e) => setEvasion(Number(e.target.value))}
                  className="cyber-input"
                />
              </div>
              <div>
                <Label className="text-xs text-[#00ffff]">Minor Threshold</Label>
                <Input
                  type="number"
                  value={minorThreshold}
                  onChange={(e) => setMinorThreshold(Number(e.target.value))}
                  className="cyber-input"
                />
              </div>
              <div>
                <Label className="text-xs text-[#00ffff]">Major Threshold</Label>
                <Input
                  type="number"
                  value={majorThreshold}
                  onChange={(e) => setMajorThreshold(Number(e.target.value))}
                  className="cyber-input"
                />
              </div>
              <div>
                <Label className="text-xs text-[#ff0040]">HP (current/max)</Label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    value={currentHP}
                    onChange={(e) => setCurrentHP(Math.min(Number(e.target.value), maxHP))}
                    className="cyber-input"
                  />
                  <Input
                    type="number"
                    value={maxHP}
                    onChange={(e) => setMaxHP(Number(e.target.value))}
                    className="cyber-input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-[#ff8000]">Stress (current/max)</Label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    value={currentStress}
                    onChange={(e) => setCurrentStress(Math.min(Number(e.target.value), maxStress))}
                    className="cyber-input"
                  />
                  <Input
                    type="number"
                    value={maxStress}
                    onChange={(e) => setMaxStress(Number(e.target.value))}
                    className="cyber-input"
                  />
                </div>
              </div>
            </CardContent>
        </Card>

        {/* Design Options */}
        <div className="grid gap-8">
          {/* FINAL DESIGN: Combined Best Elements */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                FINAL DESIGN: Combined Best Elements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Defense Section */}
                <div className="cyber-border rounded-lg bg-black/30 p-6">
                  <h4 className="mb-4 font-mono text-sm text-[#ff00ff]">DEFENSES</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Evasion & Armor */}
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="mb-2 text-xs text-[#ff00ff]/70">EVASION</div>
                        <div className="cyber-text text-4xl font-bold text-[#ff00ff]">{evasion}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#00ffff]/70">ARMOR</span>
                          <span className="text-sm font-bold text-[#00ffff]">{currentArmor}/{maxArmor}</span>
                        </div>
                        <div className="flex justify-center gap-2">
                          {Array.from({ length: Math.max(5, maxArmor) }, (_, i) => {
                            const isActive = i < currentArmor;
                            const exists = i < maxArmor;
                            if (!exists) return <div key={i} className="w-10 h-10" />;
                            return (
                              <div key={i} className="relative">
                                <Shield
                                  className={`h-10 w-10 transition-all ${
                                    isActive
                                      ? "text-[#00ffff] drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]"
                                      : "text-gray-600"
                                  }`}
                                />
                                {!isActive && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <X className="h-6 w-6 text-red-500" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* HP & Stress Pips */}
                    <div className="space-y-4">
                      {/* HP Pips */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs text-[#ff0040]">HP</span>
                          <span className="text-xs text-[#ff0040]/70">{currentHP}/{maxHP}</span>
                        </div>
                        <div className="grid grid-cols-12 gap-1">
                          {Array.from({ length: 12 }, (_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-sm border ${
                                i < currentHP
                                  ? "border-[#ff0040] bg-[#ff0040]"
                                  : i < maxHP
                                  ? "border-[#ff0040] bg-transparent"
                                  : "border-gray-600 bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Stress Pips */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs text-[#ff8000]">STRESS</span>
                          <span className="text-xs text-[#ff8000]/70">{currentStress}/{maxStress}</span>
                        </div>
                        <div className="grid grid-cols-12 gap-1">
                          {Array.from({ length: 12 }, (_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-sm border ${
                                i < currentStress
                                  ? "border-[#ff8000] bg-[#ff8000]"
                                  : i < maxStress
                                  ? "border-[#ff8000] bg-transparent"
                                  : "border-gray-600 bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Damage Thresholds */}
                <div className="cyber-border rounded-lg bg-black/30 p-6">
                  <h4 className="mb-4 font-mono text-sm text-[#00ffff]">
                    DAMAGE THRESHOLDS
                  </h4>
                  <div className="relative">
                    <div className="h-16 overflow-hidden rounded-lg border border-[#00ffff]/30 bg-black/50">
                      <div className="flex h-full">
                        <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-orange-500 bg-gradient-to-r from-yellow-500/20 to-yellow-500/30">
                          <span className="text-xs font-bold text-yellow-400">MINOR</span>
                          <span className="text-xs text-yellow-400">1-{minorThreshold - 1}</span>
                          <span className="text-sm font-bold text-white">Mark 1 HP</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-red-500 bg-gradient-to-r from-orange-500/20 to-orange-500/30">
                          <span className="text-xs font-bold text-orange-400">MAJOR</span>
                          <span className="text-xs text-orange-400">{minorThreshold}-{majorThreshold - 1}</span>
                          <span className="text-sm font-bold text-white">Mark 2 HP</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-red-500/20 to-red-700/30">
                          <span className="text-xs font-bold text-red-500">SEVERE</span>
                          <span className="text-xs text-red-500">{majorThreshold}+</span>
                          <span className="text-sm font-bold text-white">Mark 3 HP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Option 1: Visual Shield with Damage */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                OPTION 1: Visual Shield with Damage States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="flex items-center gap-8">
                  {/* Shield Visual */}
                  <div className="relative">
                    <svg viewBox="0 0 200 220" className="h-48 w-48">
                      {/* Shield base */}
                      <defs>
                        <pattern
                          id="cracks"
                          patternUnits="userSpaceOnUse"
                          width="50"
                          height="50"
                        >
                          <path
                            d="M10,10 L20,25 L15,40"
                            stroke="#ff0040"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.6"
                          />
                          <path
                            d="M30,5 L35,20 L25,30"
                            stroke="#ff0040"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.6"
                          />
                        </pattern>
                      </defs>

                      {/* Full shield outline */}
                      <path
                        d="M100 20 L150 50 L150 120 Q100 180 100 180 Q100 180 50 120 L50 50 Z"
                        fill={
                          currentArmor === 0
                            ? "rgba(100, 100, 100, 0.1)"
                            : "rgba(0, 255, 255, 0.1)"
                        }
                        stroke={
                          currentArmor === 0
                            ? "rgba(100, 100, 100, 0.3)"
                            : "rgba(0, 255, 255, 0.5)"
                        }
                        strokeWidth="3"
                      />

                      {/* Damage overlay based on armor loss */}
                      {currentArmor < maxArmor && (
                        <path
                          d="M100 20 L150 50 L150 120 Q100 180 100 180 Q100 180 50 120 L50 50 Z"
                          fill="url(#cracks)"
                          opacity={(maxArmor - currentArmor) / maxArmor}
                        />
                      )}

                      {/* Shield segments to show current armor */}
                      {Array.from({ length: maxArmor }, (_, i) => {
                        const angle = (360 / maxArmor) * i - 90
                        const active = i < currentArmor
                        return (
                          <path
                            key={i}
                            d={`M100,100 L${100 + 60 * Math.cos((angle * Math.PI) / 180)},${100 + 60 * Math.sin((angle * Math.PI) / 180)} A60,60 0 0,1 ${100 + 60 * Math.cos(((angle + 360 / maxArmor) * Math.PI) / 180)},${100 + 60 * Math.sin(((angle + 360 / maxArmor) * Math.PI) / 180)} Z`}
                            fill={
                              active ? "rgba(0, 255, 255, 0.3)" : "transparent"
                            }
                            stroke={
                              active
                                ? "rgba(0, 255, 255, 0.8)"
                                : "rgba(0, 255, 255, 0.2)"
                            }
                            strokeWidth="2"
                          />
                        )
                      })}

                      {/* Center text */}
                      <text
                        x="100"
                        y="95"
                        textAnchor="middle"
                        className="fill-[#00ffff] text-2xl font-bold"
                      >
                        {currentArmor}/{maxArmor}
                      </text>
                      <text
                        x="100"
                        y="115"
                        textAnchor="middle"
                        className="fill-[#00ffff]/70 text-xs"
                      >
                        ARMOR
                      </text>
                    </svg>
                  </div>

                  {/* Evasion Display */}
                  <div className="text-center">
                    <div className="mb-1 text-sm text-[#ff00ff]/70">
                      EVASION
                    </div>
                    <div className="cyber-text text-5xl font-bold text-[#ff00ff]">
                      {evasion}
                    </div>
                  </div>
                </div>

                {/* Damage Threshold Display */}
                <div className="flex-1 space-y-4">
                  <h4 className="font-mono text-sm text-[#00ffff]">
                    DAMAGE THRESHOLDS
                  </h4>
                  <div className="relative">
                    {/* Threshold Bar */}
                    <div className="h-16 overflow-hidden rounded-lg border border-[#00ffff]/30 bg-black/50">
                      <div className="flex h-full">
                        <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-orange-500 bg-gradient-to-r from-yellow-500/20 to-yellow-500/30">
                          <span className="text-xs font-bold text-yellow-400">
                            MINOR
                          </span>
                          <span className="text-xs text-yellow-400">
                            1-{minorThreshold - 1}
                          </span>
                          <span className="text-sm font-bold text-white">
                            Mark 1 HP
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center border-r-2 border-red-500 bg-gradient-to-r from-orange-500/20 to-orange-500/30">
                          <span className="text-xs font-bold text-orange-400">
                            MAJOR
                          </span>
                          <span className="text-xs text-orange-400">
                            {minorThreshold}-{majorThreshold - 1}
                          </span>
                          <span className="text-sm font-bold text-white">
                            Mark 2 HP
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-red-500/20 to-red-700/30">
                          <span className="text-xs font-bold text-red-500">
                            SEVERE
                          </span>
                          <span className="text-xs text-red-500">
                            {majorThreshold}+
                          </span>
                          <span className="text-sm font-bold text-white">
                            Mark 3 HP
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Threshold markers */}
                    <div className="mt-1 flex justify-between text-xs">
                      <span className="text-[#00ffff]/50">MINOR</span>
                      <span className="text-[#00ffff]/50">MAJOR</span>
                      <span className="text-[#00ffff]/50">SEVERE</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 2: Minimalist Bar Design */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                OPTION 2: Minimalist Bar Design
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-8">
                {/* Evasion */}
                <div className="flex items-center gap-4">
                  <Shield className="h-8 w-8 text-[#ff00ff]" />
                  <div>
                    <div className="text-xs text-[#ff00ff]/70">EVASION</div>
                    <div className="text-3xl font-bold text-[#ff00ff]">
                      {evasion}
                    </div>
                  </div>
                </div>

                {/* Armor */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-[#00ffff]">ARMOR</span>
                    <span className="text-sm font-bold text-[#00ffff]">
                      {currentArmor} / {maxArmor}
                    </span>
                  </div>
                  <div className="relative h-8 overflow-hidden rounded-full border border-[#00ffff]/30 bg-black/50">
                    {/* Armor segments */}
                    <div className="absolute inset-0 flex gap-0.5 p-0.5">
                      {Array.from({ length: maxArmor }, (_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all ${
                            i < currentArmor
                              ? "bg-gradient-to-r from-[#00ffff] to-[#00ffff]/70"
                              : "bg-gray-700/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Damage Thresholds */}
              <div className="space-y-2">
                <h4 className="font-mono text-sm text-[#00ffff]">
                  DAMAGE → HP MARKED
                </h4>
                <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-lg border border-[#00ffff]/30">
                  <div className="border-r border-[#00ffff]/20 bg-yellow-500/10 p-3 text-center">
                    <div className="text-xs font-bold text-yellow-400">
                      MINOR
                    </div>
                    <div className="text-xs text-yellow-400">
                      1-{minorThreshold - 1}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      Mark 1 HP
                    </div>
                  </div>
                  <div className="border-r border-[#00ffff]/20 bg-orange-500/10 p-3 text-center">
                    <div className="text-xs font-bold text-orange-400">
                      MAJOR
                    </div>
                    <div className="text-xs text-orange-400">
                      {minorThreshold}-{majorThreshold - 1}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      Mark 2 HP
                    </div>
                  </div>
                  <div className="bg-red-500/10 p-3 text-center">
                    <div className="text-xs font-bold text-red-400">SEVERE</div>
                    <div className="text-xs text-red-400">
                      {majorThreshold}+
                    </div>
                    <div className="mt-1 text-sm font-bold text-white">
                      Mark 3 HP
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 3: Icon-based Shield States */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                OPTION 3: Icon-based Shield States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  {/* Armor Display with Icons */}
                  <div className="cyber-border rounded-lg bg-black/30 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-mono text-[#00ffff]">ARMOR STATUS</h4>
                      <span className="text-2xl font-bold text-[#00ffff]">
                        {currentArmor}/{maxArmor}
                      </span>
                    </div>
                    <div className="flex justify-center gap-3">
                      {Array.from({ length: maxArmor }, (_, i) => {
                        const isActive = i < currentArmor
                        const damage =
                          ((maxArmor - currentArmor) / maxArmor) * 100
                        return (
                          <div key={i} className="relative">
                            <Shield
                              className={`h-12 w-12 transition-all ${
                                isActive
                                  ? "text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
                                  : "text-gray-600"
                              }`}
                            />
                            {!isActive && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <X className="h-8 w-8 text-red-500" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Evasion */}
                  <div className="cyber-border rounded-lg bg-black/30 p-6 text-center">
                    <div className="mb-2 text-sm text-[#ff00ff]/70">
                      EVASION
                    </div>
                    <div className="cyber-text text-5xl font-bold text-[#ff00ff]">
                      {evasion}
                    </div>
                  </div>
                </div>

                {/* Damage Thresholds */}
                <div className="cyber-border rounded-lg bg-black/30 p-6">
                  <h4 className="mb-4 font-mono text-sm text-[#00ffff]">
                    DAMAGE THRESHOLDS
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                      <div className="w-16 text-center">
                        <div className="text-xs font-bold text-yellow-400">
                          MINOR
                        </div>
                        <span className="text-xs text-yellow-400">
                          1-{minorThreshold - 1}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-yellow-500" />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="text-sm text-yellow-400">
                          Damage Range
                        </span>
                        <span className="text-sm font-bold text-white">
                          Mark 1 HP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                      <div className="w-16 text-center">
                        <div className="text-xs font-bold text-orange-400">
                          MAJOR
                        </div>
                        <span className="text-xs text-orange-400">
                          {minorThreshold}-{majorThreshold - 1}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-orange-500" />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="text-sm text-orange-400">
                          Damage Range
                        </span>
                        <span className="text-sm font-bold text-white">
                          Mark 2 HP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                      <div className="w-16 text-center">
                        <div className="text-xs font-bold text-red-400">
                          SEVERE
                        </div>
                        <span className="text-xs text-red-400">
                          {majorThreshold}+
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-red-500" />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="text-sm text-red-400">
                          Damage Range
                        </span>
                        <span className="text-sm font-bold text-white">
                          Mark 3 HP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 4: Compact Combined Display */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                OPTION 4: Compact Combined Display
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="cyber-border rounded-lg bg-black/30 p-6">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                  {/* Defenses */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#ff00ff]">EVASION</span>
                      <span className="text-2xl font-bold text-[#ff00ff]">
                        {evasion}
                      </span>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-[#00ffff]">ARMOR</span>
                        <span className="text-sm text-[#00ffff]">
                          {currentArmor}/{maxArmor}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: maxArmor }, (_, i) => (
                          <div
                            key={i}
                            className={`h-3 flex-1 rounded-sm transition-all ${
                              i < currentArmor
                                ? "bg-[#00ffff] shadow-[0_0_4px_rgba(0,255,255,0.8)]"
                                : "border border-gray-600 bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden justify-center md:flex">
                    <div className="h-20 w-px bg-[#00ffff]/30" />
                  </div>

                  {/* Damage Scale */}
                  <div className="md:col-span-1">
                    <div className="mb-3 text-sm text-[#00ffff]">
                      DAMAGE → HP MARKED
                    </div>
                    <div className="relative">
                      <div className="absolute top-0 bottom-0 -left-4 flex flex-col justify-between text-xs text-[#00ffff]/70">
                        <span>{majorThreshold}+</span>
                        <span>{minorThreshold}</span>
                        <span>1</span>
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex h-8 items-center rounded-r-lg border-l-4 border-red-500 bg-red-500/20 px-3">
                          <span className="text-xs font-bold text-white">
                            Mark 3 HP
                          </span>
                          <span className="ml-2 text-xs text-red-400">
                            (Severe)
                          </span>
                        </div>
                        <div className="flex h-8 items-center rounded-r-lg border-l-4 border-orange-500 bg-orange-500/20 px-3">
                          <span className="text-xs font-bold text-white">
                            Mark 2 HP
                          </span>
                          <span className="ml-2 text-xs text-orange-400">
                            (Major)
                          </span>
                        </div>
                        <div className="flex h-8 items-center rounded-r-lg border-l-4 border-yellow-500 bg-yellow-500/20 px-3">
                          <span className="text-xs font-bold text-white">
                            Mark 1 HP
                          </span>
                          <span className="ml-2 text-xs text-yellow-400">
                            (Minor)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 5: Radial Shield Design */}
          <Card className="cyber-border bg-gradient-to-r from-[#0a0a0f]/90 to-[#1a1a2e]/90">
            <CardHeader>
              <CardTitle className="font-mono text-[#00ffff]">
                OPTION 5: Radial Shield Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                {/* Radial Shield */}
                <div className="relative">
                  <svg viewBox="0 0 240 240" className="h-64 w-64">
                    {/* Background circle */}
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />

                    {/* Armor segments */}
                    {Array.from({ length: maxArmor }, (_, i) => {
                      const startAngle = (360 / maxArmor) * i - 90
                      const endAngle = (360 / maxArmor) * (i + 1) - 90
                      const isActive = i < currentArmor

                      const x1 =
                        120 + 90 * Math.cos((startAngle * Math.PI) / 180)
                      const y1 =
                        120 + 90 * Math.sin((startAngle * Math.PI) / 180)
                      const x2 = 120 + 90 * Math.cos((endAngle * Math.PI) / 180)
                      const y2 = 120 + 90 * Math.sin((endAngle * Math.PI) / 180)

                      return (
                        <g key={i}>
                          <path
                            d={`M 120 120 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                            fill={
                              isActive
                                ? "rgba(0, 255, 255, 0.2)"
                                : "rgba(100, 100, 100, 0.1)"
                            }
                            stroke={
                              isActive
                                ? "rgba(0, 255, 255, 0.8)"
                                : "rgba(100, 100, 100, 0.3)"
                            }
                            strokeWidth="2"
                          />
                          {!isActive && (
                            <line
                              x1={
                                120 +
                                45 *
                                  Math.cos(
                                    (((startAngle + endAngle) / 2) * Math.PI) /
                                      180
                                  )
                              }
                              y1={
                                120 +
                                45 *
                                  Math.sin(
                                    (((startAngle + endAngle) / 2) * Math.PI) /
                                      180
                                  )
                              }
                              x2={
                                120 +
                                75 *
                                  Math.cos(
                                    (((startAngle + endAngle) / 2) * Math.PI) /
                                      180
                                  )
                              }
                              y2={
                                120 +
                                75 *
                                  Math.sin(
                                    (((startAngle + endAngle) / 2) * Math.PI) /
                                      180
                                  )
                              }
                              stroke="rgba(255, 0, 64, 0.8)"
                              strokeWidth="3"
                            />
                          )}
                        </g>
                      )
                    })}

                    {/* Center info */}
                    <circle
                      cx="120"
                      cy="120"
                      r="40"
                      fill="rgba(0, 0, 0, 0.8)"
                    />
                    <text
                      x="120"
                      y="110"
                      textAnchor="middle"
                      className="fill-[#00ffff] text-lg font-bold"
                    >
                      ARMOR
                    </text>
                    <text
                      x="120"
                      y="130"
                      textAnchor="middle"
                      className="fill-[#00ffff] text-2xl font-bold"
                    >
                      {currentArmor}/{maxArmor}
                    </text>

                    {/* Evasion display */}
                    <text
                      x="120"
                      y="200"
                      textAnchor="middle"
                      className="fill-[#ff00ff]/70 text-sm"
                    >
                      EVASION
                    </text>
                    <text
                      x="120"
                      y="220"
                      textAnchor="middle"
                      className="fill-[#ff00ff] text-2xl font-bold"
                    >
                      {evasion}
                    </text>
                  </svg>
                </div>

                {/* Damage Threshold Arrow Display */}
                <div className="flex-1">
                  <h4 className="mb-4 font-mono text-sm text-[#00ffff]">
                    DAMAGE THRESHOLDS
                  </h4>
                  <div className="space-y-0">
                    {/* Visual flow diagram */}
                    <div className="mb-6 flex items-center gap-2">
                      <div className="flex-1 rounded-lg border border-yellow-500/50 bg-black/50 p-3 text-center">
                        <div className="text-xs font-bold text-yellow-400">
                          MINOR
                        </div>
                        <div className="text-xs text-yellow-400">
                          1-{minorThreshold - 1}
                        </div>
                        <div className="text-sm font-bold text-white">
                          Mark 1 HP
                        </div>
                      </div>
                      <ChevronRight className="text-yellow-500" />
                      <div className="flex-1 rounded-lg border border-orange-500/50 bg-black/50 p-3 text-center">
                        <div className="text-xs font-bold text-orange-400">
                          MAJOR
                        </div>
                        <div className="text-xs text-orange-400">
                          {minorThreshold}-{majorThreshold - 1}
                        </div>
                        <div className="text-sm font-bold text-white">
                          Mark 2 HP
                        </div>
                      </div>
                      <ChevronRight className="text-orange-500" />
                      <div className="flex-1 rounded-lg border border-red-500/50 bg-black/50 p-3 text-center">
                        <div className="text-xs font-bold text-red-400">
                          SEVERE
                        </div>
                        <div className="text-xs text-red-400">
                          {majorThreshold}+
                        </div>
                        <div className="text-sm font-bold text-white">
                          Mark 3 HP
                        </div>
                      </div>
                    </div>

                    {/* Example text */}
                    <div className="rounded-lg bg-black/30 p-4 text-sm text-[#00ffff]/70">
                      <p className="mb-2">
                        Example: An attack dealing 3 damage is{" "}
                        <span className="font-bold text-yellow-400">MINOR</span>{" "}
                        →{" "}
                        <span className="font-bold text-white">Mark 1 HP</span>
                      </p>
                      <p className="mb-2">
                        Example: An attack dealing {minorThreshold} damage is{" "}
                        <span className="font-bold text-orange-400">MAJOR</span>{" "}
                        →{" "}
                        <span className="font-bold text-white">Mark 2 HP</span>
                      </p>
                      <p>
                        Example: An attack dealing {majorThreshold}+ damage is{" "}
                        <span className="font-bold text-red-400">SEVERE</span> →{" "}
                        <span className="font-bold text-white">Mark 3 HP</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
