'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Lock, Mail, Bell, Shield } from 'lucide-react'

export default function Settings() {
  const { toast } = useToast()
  const [email, setEmail] = useState('user@example.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remindIncomplete, setRemindIncomplete] = useState(true)
  const [remindFrequency, setRemindFrequency] = useState('daily')
  const [notifyNewFeatures, setNotifyNewFeatures] = useState(true)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)
  const [allowAnonymousData, setAllowAnonymousData] = useState(true)

  const handleUpdateEmail = () => {
    toast({
      title: "Email Updated",
      description: "Your email has been successfully updated.",
    })
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }
    // Here you would typically call an API to change the password
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    })
  }

  const handleDeleteAccount = () => {
    // Here you would typically call an API to delete the account
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    })
  }

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    })
  }

  const passwordStrength = (password: string) => {
    if (password.length > 12) return 100
    if (password.length > 8) return 66
    if (password.length > 5) return 33
    return 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">Manage your account, notifications, and security preferences.</p>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="w-full md:w-64 h-fit">
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full" orientation="vertical">
                <TabsList className="flex flex-col items-start">
                  <TabsTrigger value="account" className="w-full justify-start">Account</TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start">Security</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs defaultValue="account">
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex space-x-2">
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button onClick={handleUpdateEmail}>Update Email</Button>
                      </div>
                    </div>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Change Password</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                              <Progress value={passwordStrength(newPassword)} className="w-full" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleChangePassword}>Change Password</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount}>Delete Account</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="remind-incomplete">Remind me about incomplete forms</Label>
                      <Switch id="remind-incomplete" checked={remindIncomplete} onCheckedChange={setRemindIncomplete} />
                    </div>
                    {remindIncomplete && (
                      <div className="space-y-2">
                        <Label htmlFor="remind-frequency">Reminder Frequency</Label>
                        <Select value={remindFrequency} onValueChange={setRemindFrequency}>
                          <SelectTrigger id="remind-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-features">Notify me about new ZapFill features and updates</Label>
                      <Switch id="notify-features" checked={notifyNewFeatures} onCheckedChange={setNotifyNewFeatures} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="subscribe-newsletter">Subscribe to the ZapFill newsletter for tips and tricks</Label>
                      <Switch id="subscribe-newsletter" checked={subscribeNewsletter} onCheckedChange={setSubscribeNewsletter} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-700">Your data is protected with end-to-end encryption</p>
                      <a href="#" className="text-blue-600 hover:underline">Learn more about our security practices</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-anonymous-data">Allow ZapFill to use anonymized data for feature improvement</Label>
                      <Switch id="allow-anonymous-data" checked={allowAnonymousData} onCheckedChange={setAllowAnonymousData} />
                    </div>
                    <div>
                      <Button variant="outline">Reset Data Permissions</Button>
                    </div>
                    <div>
                      <Button variant="outline">Export My Data</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button size="lg" onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </main>
    </div>
  )
}

