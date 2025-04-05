import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ListFilter, Loader2 } from "lucide-react";
const formSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

interface FilterI {
  setValues(fName: string, lName: string): void;
  isLoading: boolean;
}

const Filter = ({ setValues, isLoading }: FilterI) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setValues(values.first_name || "", values.last_name || "");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="first name" type="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="last name" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="animate-spin w-4 mr-2" />
              ) : (
                <ListFilter />
              )}
              Filter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Filter;
