'use client'
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
import { useState } from "react"
import { useAuthContext } from "@/context/auth"
import useGetStartedStore from "@/stores/get-started"
import SignInOrSignup from "@/components/SignUporIn"

type Props = {

}

const GetStarted = ({}: Props) => {

  return (
    <div>
      <DrawerDialogDemo />
    </div>
  )
}

export default GetStarted


function DrawerDialogDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)")  
  const { showModal, openModal, closeModal } = useGetStartedStore()

  if (isDesktop) {
    return (
      <Dialog open={showModal} onOpenChange={(open) => open ? openModal() : closeModal()}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Register with passkey</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lets get started</DialogTitle>
            <DialogDescription>
              Let's get started with your profile.
            </DialogDescription>
          </DialogHeader>
          <SignInOrSignup />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={showModal} onOpenChange={(open) => open ? openModal() : closeModal()}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>

        <SignInOrSignup />

        {/* <RegisterForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}