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
import { useDeleteUnitMutation } from "@/states/services/course";

const Delete = ({ unitId }: { unitId: string }) => {
  const { toast } = useToast();
    const [deleteUnit, { isLoading }] = useDeleteUnitMutation();

  async function onSubmit() {
    try {
      await deleteUnit(unitId).unwrap();
      toast({
        title: "Deletion successful!",
        description: "Your unit has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete this unit</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this unit?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} type="submit" variant={"destructive"} onClick={onSubmit}>
            {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
