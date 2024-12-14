'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Clock, CheckCircle, Lock, User } from 'lucide-react'
import Image from 'next/image'

// Mock data
const badges = [
  { id: 1, name: "Form Master", description: "Completed 10 forms", icon: Trophy, unlocked: true },
  { id: 2, name: "Speed Zap", description: "Finished a form in under 5 minutes", icon: Clock, unlocked: true },
  { id: 3, name: "Perfectionist", description: "Completed 5 forms without any errors", icon: CheckCircle, unlocked: true },
  { id: 4, name: "Form Streak", description: "Completed forms for 7 consecutive days", icon: Trophy, unlocked: false },
  { id: 5, name: "Data Wizard", description: "Used advanced autofill features 20 times", icon: Trophy, unlocked: false },
]

const leaderboard = [
  { rank: 1, name: "Alice S.", score: 1250, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 2, name: "Bob M.", score: 1100, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 3, name: "Charlie D.", score: 950, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 4, name: "David K.", score: 800, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 5, name: "Eva P.", score: 750, avatar: "/placeholder.svg?height=32&width=32" },
]

const rewards = [
  { milestone: 25, reward: "Silver Theme", unlocked: true },
  { milestone: 50, reward: "ZapFill Dark Mode", unlocked: false },
  { milestone: 100, reward: "Gold Form Master Theme", unlocked: false },
]

export default function Achievements() {
  const [leaderboardType, setLeaderboardType] = useState("global")

  const totalForms = 42
  const timeSaved = 180 // minutes
  const errorReduction = 95 // percentage

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Your Achievements</h1>
        <p className="text-gray-600 mb-6">Track your progress and unlock exciting rewards!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badge Collection */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="text-center">
                    <div className={`relative inline-block ${badge.unlocked ? '' : 'opacity-50'}`}>
                      <badge.icon className="w-16 h-16 mx-auto text-blue-500" />
                      {!badge.unlocked && <Lock className="absolute bottom-0 right-0 w-6 h-6 text-gray-500" />}
                    </div>
                    <p className="mt-2 font-semibold">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={leaderboardType} onValueChange={setLeaderboardType}>
                <TabsList className="mb-4">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                </TabsList>
                <TabsContent value="global">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="w-6 text-gray-500">{user.rank}</span>
                        <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full mr-2" />
                        <span>{user.name}</span>
                      </div>
                      <span>{user.score} pts</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="friends">
                  <p>Connect with friends to see their rankings!</p>
                </TabsContent>
                <TabsContent value="weekly">
                  <p>Weekly rankings will be available soon!</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Progress to next badge: Form Streak</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{totalForms}</p>
                <p className="text-sm text-gray-600">Total forms completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.floor(timeSaved / 60)} hours</p>
                <p className="text-sm text-gray-600">Time saved with ZapFill</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{errorReduction}%</p>
                <p className="text-sm text-gray-600">Reduction in missed fields</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {rewards.map((reward, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 ${reward.unlocked ? 'bg-blue-500 text-white' : ''}`}>
                    {reward.unlocked ? <Trophy className="w-8 h-8" /> : <Lock className="w-8 h-8 text-gray-500" />}
                  </div>
                  <p className="font-semibold">{reward.reward}</p>
                  <p className="text-sm text-gray-600">{reward.milestone} forms</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span>Progress to next reward</span>
                <span>{totalForms}/50 forms</span>
              </div>
              <Progress value={(totalForms / 50) * 100} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

