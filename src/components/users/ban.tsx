import * as z from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
// import { useChangePasswordMutation } from "@/state/services/user";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  reason: z.string().min(10, "reason must be at least 10 characters long"),
});

const Ban = () => {
  const { toast } = useToast();
  //   const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <Button variant="destructive">
          Ban
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ban a user</DialogTitle>
          <DialogDescription>
            Please provide a reason for why the person is banned.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reason">Reason</FormLabel>

                  <FormControl>
                    <Input
                      id="reason"
                      type="text"
                      placeholder="reason"
                      {...field}
                      aria-label="reason"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={true} variant={"destructive"} type="submit">
                {true && <Loader2 className="animate-spin w-4 mr-2" />}
                Ban
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Ban;
