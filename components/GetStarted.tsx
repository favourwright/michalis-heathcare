'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useGetStartedStore from "@/stores/get-started"
import SignInOrSignup from "@/components/SignUporIn"

type Props = {}

const GetStarted = ({}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")  
  const { showModal, openModal, closeModal } = useGetStartedStore()

  if (isDesktop) {
    return (
      <Dialog open={showModal} onOpenChange={(open) => open ? openModal() : closeModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lets get you started</DialogTitle>
            <DialogDescription>
              Don't worry, we made it super easy
            </DialogDescription>
          </DialogHeader>

          <SignInOrSignup />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={showModal} onOpenChange={(open) => open ? openModal() : closeModal()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Lets get you started</DrawerTitle>
          <DrawerDescription>
            Don't worry, we made it super easy
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <SignInOrSignup />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default GetStarted