import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import Matcher from "../matcher";
import CreateMatcher from "../createMatcher";
import { Loader2 } from "lucide-react";
import { StateObject } from "@/types";
import { useAddQuestionMutation } from "@/states/services/course";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

const Spelling = ({
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
  const [firstState, setFirstState] = useState({});
  const [secondState, setSecondState] = useState({});
  const [thirdState, setThirdState] = useState({});

  const [correctOptionError, setCorrectOptionError] = useState<string | null>(
    null
  );

  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  useEffect(() => {
    setFirstOption(content.replace(/"/g, ""));
    setSecondOption(content.replace(/"/g, ""));
    setThirdOption(content.replace(/"/g, ""));
  }, [content]);

  async function onSubmit() {
    if (content.length === 0) {
      setCorrectOptionError("Required");
      return;
    } else {
      setCorrectOptionError(null);
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
    formData.append("questionType", "spelling");
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
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Second option</Label>
          <div className="flex gap-2 h-20">
            <CreateMatcher
              setState={setSecondState}
              state={secondState}
              text={secondOption}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Third option</Label>
          <div className="flex gap-2 h-20">
            <CreateMatcher
              setState={setThirdState}
              state={thirdState}
              text={thirdOption}
            />
          </div>
        </div>
      </div>
      <Button disabled={isLoading} onClick={onSubmit} variant={"default"}>
        {isLoading && <Loader2 className="animate-spin w-4 mr-2" />}
        Create
      </Button>
    </div>
  );
};

export default Spelling;
