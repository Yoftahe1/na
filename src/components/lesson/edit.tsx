import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditLessonMutation } from "@/states/services/course";
import Matcher from "../matcher";
import { StateObject, TimeState } from "@/types";
import AudioPlayer from "./audioPlayer";
import { useEffect, useMemo, useState } from "react";

const formSchema = z.object({
  lesson_no: z.number().min(1, "Lesson no must be greater than 0"),
  lesson_audio: z
    .custom<File>((file) => file instanceof File, "Invalid file")
    .optional(),
});

const Edit = ({
  lessonId,
  fileNo,
  fileName,
  state,
  content,
  oldTimestamp,
  lessonAudio,
}: {
  lessonId: string;
  fileNo: number;
  fileName: string;
  content: string;
  state: StateObject;
  oldTimestamp: TimeState;
  lessonAudio: string;
}) => {
  const { toast } = useToast();
  const [timestamp, setTimestamp] = useState<TimeState | null>(oldTimestamp);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const lessonFile = form.watch("lesson_audio");

  const audioUrl = useMemo(() => {
    if (!lessonFile) return "";
    setTimestamp(null);
    return URL.createObjectURL(lessonFile);
  }, [lessonFile]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const [editLesson, { isLoading }] = useEditLessonMutation();
  const [currentTime, setCurrentTime] = useState(0);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      !timestamp ||
      Object.keys(timestamp).length !== content.split(" ").length
    ) {
      setError("Please set timestamp.");
      return;
    } else setError(null);

    const formData = new FormData();
    formData.append("file_no", values.lesson_no.toString());
    formData.append("timestamp", JSON.stringify(timestamp));
    if (values.lesson_audio) formData.append("file_audio", values.lesson_audio);
    try {
      await editLesson({ data: formData, lessonId }).unwrap();
      toast({
        title: "Updated successful!",
        description: "Lesson has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  function onPause(second: number) {
    setCurrentTime(second);
  }

  function onWordSelect(position: string) {
    setTimestamp((prev) => ({ ...prev, [position]: currentTime }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant={"outline"}>Edit</Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit lesson</DialogTitle>
          <DialogDescription>
            Make changes to lesson here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {state && (
          <div>
            <Matcher
              content={content}
              state={state}
              onWordSelect={onWordSelect}
              timestamp={timestamp}
            />
          </div>
        )}

        {(lessonAudio || lessonFile) && (
          <AudioPlayer
            audioUrl={lessonFile ? audioUrl : lessonAudio}
            onPause={onPause}
          />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="lesson_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson no</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lesson_audio"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Lesson audio</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="audio/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button disabled={isLoading} type="submit" variant={"default"}>
                {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
