import { Button } from "../ui/button";
import CreateMatcher from "../createMatcher";
import { useState } from "react";
import Matcher from "../matcher";
import { StateObject } from "@/types";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { ClipboardPaste, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAddQuestionMutation } from "@/states/services/course";
import { useParams } from "react-router-dom";

const Fill = ({
  content,
  state,
  position,
  isQuiz,
  difficulty,
}: {
  content: string;
  state: StateObject;
  position: string | null;
  isQuiz: string;
  difficulty: string;
}) => {
  const { toast } = useToast();
  const { lessonId } = useParams();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [correctOptionError, setCorrectOptionError] = useState<string | null>(
    null
  );
  const [firstOptionError, setFirstOptionError] = useState<string | null>(null);
  const [secondOptionError, setSecondOptionError] = useState<string | null>(
    null
  );
  const [thirdOptionError, setThirdOptionError] = useState<string | null>(null);
  const [firstState, setFirstState] = useState({});
  const [secondState, setSecondState] = useState({});
  const [thirdState, setThirdState] = useState({});
  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  async function onSubmit() {
    if (content.length === 0) {
      setCorrectOptionError("Required");
      return;
    } else if (firstOption.length === 0) {
      setFirstOptionError("Required");
      return;
    } else if (secondOption.length === 0) {
      setSecondOptionError("Required");
      return;
    } else if (thirdOption.length === 0) {
      setThirdOptionError("Required");
      return;
    } else {
      setCorrectOptionError(null);
      setFirstOptionError(null);
      setSecondOptionError(null);
      setThirdOptionError(null);
    }

    const formData = new FormData();
    formData.append("correctOption", content.replace(/"/g, ""));
    formData.append("firstOption", firstOption);
    formData.append("secondOption", secondOption);
    formData.append("thirdOption", thirdOption);
    formData.append("correctState", JSON.stringify(state));
    formData.append("firstState", JSON.stringify(firstState));
    formData.append("secondState", JSON.stringify(secondState));
    formData.append("thirdState", JSON.stringify(thirdState));
    formData.append("questionType", "fill");
    formData.append("difficulty", difficulty);
    formData.append("isQuiz", isQuiz);
    formData.append("position", position!.toString());
    formData.append("lessonId", lessonId!.toString());
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

  const getClipboardContent = async (key: number) => {
    try {
      const text = await navigator.clipboard.readText();
      if (key === 1) setFirstOption(text);
      if (key === 2) setSecondOption(text);
      if (key === 3) setThirdOption(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      toast({
        title: "Something went wrong",
        description: "Failed to read clipboard",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-end ">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label>Correct option</Label>
          <div className="flex gap-2 h-20">
            <div
              className={cn(
                "h-20 w-full",
                !content && "rounded-md border border-input"
              )}
            >
              {content && (
                <Matcher
                  content={content}
                  state={state}
                  onWordSelect={() => {}}
                  timestamp={null}
                />
              )}
            </div>
            <Button disabled variant={"outline"} size={"icon"}>
              <ClipboardPaste />
            </Button>
          </div>
          {correctOptionError && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">
              {correctOptionError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>First option</Label>
          <div className="flex gap-2 h-20">
            <CreateMatcher
              setState={setFirstState}
              state={firstState}
              text={firstOption}
            />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => getClipboardContent(1)}
            >
              <ClipboardPaste />
            </Button>
          </div>
          {firstOptionError && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">
              {firstOptionError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Second option</Label>
          <div className="flex gap-2 h-20">
            <CreateMatcher
              setState={setSecondState}
              state={secondState}
              text={secondOption}
            />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => getClipboardContent(2)}
            >
              <ClipboardPaste />
            </Button>
          </div>
          {secondOptionError && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">
              {secondOptionError}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Third option</Label>
          <div className="flex gap-2 h-20">
            <CreateMatcher
              setState={setThirdState}
              state={thirdState}
              text={thirdOption}
            />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => getClipboardContent(3)}
            >
              <ClipboardPaste />
            </Button>
          </div>
          {thirdOptionError && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">
              {thirdOptionError}
            </p>
          )}
        </div>
      </div>

      <Button disabled={isLoading} onClick={onSubmit} variant={"default"}>
        {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
        Create
      </Button>
    </div>
  );
};

export default Fill;
