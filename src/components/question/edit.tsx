import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const Edit = () => {
  const { toast } = useToast();
  //   const [changePassword, { isLoading }] = useChangePasswordMutation();

  async function onSubmit() {
    console.log("deleted");
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
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete this course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={true} type="submit" variant={"default"}>
            {true && <Loader2 className="animate-spin w-4 mr-2" />}
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
