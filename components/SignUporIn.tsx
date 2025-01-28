import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuthContext } from "@/context/auth"
import { useState } from "react"

enum FormType {
  LOGIN = 'login',
  REGISTER = 'register'
}

const SignInOrSignup = () => {
  const { signup, isRegistrationFetching } = useAuthContext()

  const [activeTab, setActiveTab] = useState(FormType.LOGIN)

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    await signup(email)
  }

  return (
    <div
      className="flex flex-col gap-4
      max-w-sm mx-auto">
      <Tabs
        onValueChange={(value) => console.log(value)}
        defaultValue={activeTab}
        className="">
        <TabsList className="w-full [&>*]:capitalize">
          {Object.values(FormType).map((formType) => (
            <TabsTrigger key={formType} value={formType} className="w-full">
              {formType}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <form
        onSubmit={handleSignup}
        className={"grid items-start gap-4"}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="email@example.com" />
        </div>
        <Button type="submit">Sign up {isRegistrationFetching && '...'}</Button>
      </form>
    </div>
  )
}

export default SignInOrSignup