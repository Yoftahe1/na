import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Pronunciation from "./pronunciation";
import Spelling from "./spelling";
import Fill from "./fill";
import { useGetLessonQuery } from "@/states/services/course";
import { useParams } from "react-router-dom";
import Matcher from "../matcher";
import { Label } from "../ui/label";

const formSchema = z.object({
  unit_no: z.number().min(1, "Unit no must be greater than 0"),
  unit_name: z.string().min(2, "Unit name must be at least 2 characters long"),
});

const Create = () => {
  const { toast } = useToast();
  const { lessonId } = useParams();
  const [wordIdx, setWordIdx] = useState<string | null>(null);

  const [isQuiz, setIsQuiz] = useState("false");
  const [difficulty, setDifficulty] = useState("1");
  const [questionType, setQuestionType] = useState("fill");
  function onTypeChange(value: string) {
    setQuestionType(value);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data, isLoading, isSuccess, isError } = useGetLessonQuery({
    lessonId: `${lessonId}`,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      // await changePassword(values).unwrap();
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

  function onWordSelect(idx: string) {
    setWordIdx(idx);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a question</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create a question</DialogTitle>
          <DialogDescription>
            Fill the form below. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        {data && (
          <Matcher
            content={data.lesson.content}
            state={data.lesson.state}
            selectedWord={wordIdx}
            onWordSelect={onWordSelect}
            timestamp={null}
          />
        )}
        <Label>Question type</Label>
        <Select defaultValue={questionType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Question Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fill">Fill</SelectItem>
            {/* <SelectItem value="pronunciation">Pronunciation</SelectItem> */}
            <SelectItem value="spelling">Spelling</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label>Difficulty</Label>
            <div className="flex gap-2">
              <Select
                defaultValue={difficulty}
                onValueChange={(value) => setDifficulty(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Easy</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Is quiz</Label>
            <div className="flex gap-2">
              <Select
                defaultValue={isQuiz}
                onValueChange={(value) => setIsQuiz(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Is Quiz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {questionType === "fill" && (
          <Fill
            content={
              wordIdx && data?.lesson.content
                ? JSON.stringify(
                    JSON.parse(data.lesson.content)
                      .split("\n")
                      [Number(wordIdx.split(":")[0])].split(" ")[
                      Number(wordIdx.split(":")[1])
                    ]
                  )
                : ""
            }
            state={
              wordIdx && data?.lesson.state
                ? Object.fromEntries(
                    Object.entries(data.lesson.state)
                      .filter(([key]) => key.startsWith(wordIdx))
                      .map(([key, value]) => {
                        const newKey = key.replace(
                          new RegExp(`^${wordIdx}`),
                          "0:0"
                        );
                        return [newKey, value];
                      })
                  )
                : {}
            }
            position={wordIdx}
            isQuiz={isQuiz}
            difficulty={difficulty}
          />
        )}
        {questionType === "pronunciation" && <Pronunciation />}
        {questionType === "spelling" && (
          <Spelling
            content={
              wordIdx && data?.lesson.content
                ? JSON.stringify(
                    JSON.parse(data.lesson.content)
                      .split("\n")
                      [Number(wordIdx.split(":")[0])].split(" ")[
                      Number(wordIdx.split(":")[1])
                    ]
                  )
                : ""
            }
            state={
              wordIdx && data?.lesson.state
                ? Object.fromEntries(
                    Object.entries(data.lesson.state)
                      .filter(([key]) => key.startsWith(wordIdx))
                      .map(([key, value]) => {
                        const newKey = key.replace(
                          new RegExp(`^${wordIdx}`),
                          "0:0"
                        );
                        return [newKey, value];
                      })
                  )
                : {}
            }
            position={wordIdx}
            isQuiz={isQuiz}
            difficulty={difficulty}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Create;
