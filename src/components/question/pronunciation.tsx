import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAddQuestionMutation } from "@/states/services/course";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  correct_choice: z.custom<File>((file) => file instanceof File, "Required"),
  first_choice: z.custom<File>((file) => file instanceof File, "Required"),
  second_choice: z.custom<File>((file) => file instanceof File, "Required"),
  third_choice: z.custom<File>((file) => file instanceof File, "Required"),
});

const Pronunciation = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("correctOption", values.correct_choice);
    formData.append("firstOption", values.first_choice);
    formData.append("secondOption", values.second_choice);
    formData.append("thirdOption", values.third_choice);
    formData.append("questionType", "pronunciation");
    try {
      await addQuestion({ data: formData }).unwrap();
      toast({
        title: "Created successful!",
        description: "Question has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Creating failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 items-end">
            <div className="grid grid-cols-2 gap-4  w-full">
              <div>
                <FormField
                  control={form.control}
                  name="correct_choice"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Correct Choice</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="audio/*"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="first_choice"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>First Choice</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="audio/*"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="second_choice"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Second Choice</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="audio/*"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="third_choice"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Third Choice</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="audio/*"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button disabled={isLoading} type="submit" variant={"default"}>
              {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Pronunciation;
