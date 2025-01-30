import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuthContext } from "@/context/auth"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"

enum FormType {
  LOGIN = 'login',
  REGISTER = 'register'
}

const SignInOrSignup = () => {
  const { signup, isRegistrationFetching } = useAuthContext()
  const [activeTab, setActiveTab] = useState(FormType.LOGIN)

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    if (activeTab === FormType.LOGIN) {
      // login
      return
    }
    await signup(email)
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        onValueChange={(value)=>setActiveTab(value as FormType)}
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
        onSubmit={handleForm}
        className={"grid items-start gap-4"}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="email@example.com" />
        </div>
        <Button type="submit" className="capitalize">
          {
            isRegistrationFetching ?
              <Icon icon="eos-icons:loading" className="animate-spin" /> :
              activeTab
          }
        </Button>
      </form>
    </div>
  )
}

export default SignInOrSignup