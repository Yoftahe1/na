import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
// import { useChangePasswordMutation } from "@/state/services/user";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UnBan = () => {
  const { toast } = useToast();
  //   const [changePassword, { isLoading }] = useChangePasswordMutation();

  async function onSubmit() {
    console.log("UnBan");
    // try {
    //   await changePassword(values).unwrap();
    //   toast({
    //     title: "Updated successful!",
    //     description: "Your password has been updated successfully.",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Update failed",
    //     description: "An unexpected error occurred. Please try again.",
    //   });
    // }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>UnBan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>UnBan a user</DialogTitle>
          <DialogDescription>
            Are you sure you want to unban this user?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={true} type="submit">
            {true && <Loader2 className="animate-spin w-4 mr-2" />}
            UnBan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnBan;
