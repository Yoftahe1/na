import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetFilesMutation,
  useAddLessonMutation,
} from "@/states/services/course";
import { useParams } from "react-router-dom";
import { StateObject, TimeState } from "@/types";
import Matcher from "../matcher";
import AudioPlayer from "./audioPlayer";

const formSchema = z.object({
  lesson_audio: z.custom<File>((file) => file instanceof File, "Required"),
});

const Create = () => {
  const { toast } = useToast();
  const { courseId, unitId } = useParams();
  const [focused, setFocused] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileId, setFileId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [state, setState] = useState<StateObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<TimeState | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
 
  const lessonFile = form.watch("lesson_audio");

  const audioUrl = useMemo(() => {
    if (!lessonFile) return "";
    return URL.createObjectURL(lessonFile);
  }, [lessonFile]);
  
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const [getFiles, { isLoading, data, isError }] = useGetFilesMutation();
  const [addLesson, { isLoading: isSubmitting }] = useAddLessonMutation();

  async function onType(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setFocused(true);
    setFileName(event.target.value);
    await getFiles({ fileName: event.target.value }).unwrap();
  }

  function onWordSelect(position: string) {
    setTimestamp((prev) => ({ ...prev, [position]: currentTime }));
  }

  function onPause(second: number) {
    setCurrentTime(second);
  }

  async function onFileSelect(file: {
    id: string;
    file_name: string;
    content: string;
    state: StateObject;
  }) {
    setFileName(file.file_name);
    setFileId(file.id);
    setContent(file.content);
    setState(file.state);
    setError(null);
    setFocused(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!fileId) {
      setError("Please select a file");
      return;
    } else if (
      !timestamp ||
      Object.keys(timestamp).length <= content.split(" ").length
    ) {
      setError("Please set timestamp.");
      return;
    } else setError(null);

    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("courseId", courseId!.toString());
    formData.append("unitId", unitId!.toString());
    formData.append("file_audio", values.lesson_audio);
    formData.append("timestamp", JSON.stringify(timestamp));

    try {
      await addLesson({ data: formData }).unwrap();
      toast({
        title: "Created successful!",
        description: "Lesson has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Creating failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a lesson</Button>
      </DialogTrigger>
      <DialogContent
        // className="max-w-[425px]"
        onClick={() => setFocused(false)}
      >
        <DialogHeader>
          <DialogTitle>Create a lesson</DialogTitle>
          <DialogDescription>
            Fill the form below. Click create when you're done.
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
        {lessonFile && (
          <AudioPlayer
            audioUrl={audioUrl}
            onPause={onPause}
          />
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <div className="relative">
              <p
                className={cn(
                  "mb-2 mt-6 text-base font-medium leading-none",
                  error && "text-destructive"
                )}
              >
                File
              </p>
              <input
                className="bg-background w-full border border-input rounded-md p-2 py-1"
                value={fileName}
                onChange={onType}
              />
              {focused && (
                <div className=" border border-input rounded-md absolute top-16 right-0 left-0 bg-background z-30 p-1">
                  {isLoading && <p>loading</p>}

                  {data && data.files.length === 0 && <p>no data</p>}
                  {data && data.files.length > 0 && (
                    <>
                      {data.files.map((file, index) => (
                        <div
                          key={index}
                          className="rounded-sm px-2 py-1 bg-opacity-5 hover:bg-neutral-800"
                          onClick={() => onFileSelect(file)}
                        >
                          {file.file_name}
                        </div>
                      ))}
                    </>
                  )}

                  {isError && <p>something went wrong</p>}
                </div>
              )}
              {error && (
                <p className="mt-2 text-[0.8rem] font-medium text-destructive">
                  {error}
                </p>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button disabled={isSubmitting} type="submit" variant={"default"}>
                {isSubmitting && <Loader2 className="animate-spin w-4 mr-2" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
