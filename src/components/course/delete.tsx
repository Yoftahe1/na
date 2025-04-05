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
import { useDeleteCourseMutation } from "@/states/services/course";

const Delete = ({ courseId }: { courseId: string }) => {
  const { toast } = useToast();
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  async function onSubmit() {
    try {
      await deleteCourse(courseId).unwrap();
      toast({
        title: "Deletion successful!",
        description: "Your course has been deleted successfully.",
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
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Delete this course</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this course?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            type="submit"
            variant={"destructive"}
            onClick={onSubmit}
          >
            {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
