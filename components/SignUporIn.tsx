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
import { useToast } from "@/hooks/use-toast"
import useGetStartedStore from "@/stores/get-started"

enum FormType {
  LOGIN = 'login',
  REGISTER = 'register'
}

const SignInOrSignup = () => {
  const { signup, isRegistrationFetching, login, isLoginFetching } = useAuthContext()
  const [activeTab, setActiveTab] = useState(FormType.LOGIN)
  const { toast } = useToast()
  const { setProcessing, processing } = useGetStartedStore()

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    if(!email) {
      toast({
        title: "Urrrhh...",
        description: "You need to provide an email address",
      })
      return
    }

    setProcessing(true)
    if (activeTab === FormType.LOGIN) {
      await login(email)
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
            isRegistrationFetching || isLoginFetching || processing ?
              <Icon icon="eos-icons:loading" className="animate-spin" /> :
              activeTab
          }
        </Button>
      </form>
    </div>
  )
}

export default SignInOrSignup