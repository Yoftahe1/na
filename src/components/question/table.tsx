import { useEffect, useState } from "react";

import {
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
  Table as ShadTable,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
} from "../ui/pagination";
import Delete from "./delete";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useGetQuestionsQuery } from "@/states/services/course";
import { useParams } from "react-router-dom";

const Table = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { lessonId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetQuestionsQuery({
    page: currentPage,
    lessonId: `${lessonId}`,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Fetching users failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }, [isError, toast]);

  return (
    <>
      <ShadTable>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-center">Test No</TableHead>
            <TableHead>Test Type</TableHead>
            <TableHead className="w-60 text-center">Test Difficulty</TableHead>
            <TableHead className="w-60">Is Quiz</TableHead>
            <TableHead className="w-60">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isSuccess && (
          <TableBody>
            {data.questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{question.type}</TableCell>
                <TableCell className="text-center">
                  {question.difficulty}
                </TableCell>
                <TableCell>{question.is_quiz ? "True" : "False"}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Delete questionId={question.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {isLoading && (
          <TableBody>
            <TableRow>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          </TableBody>
        )}
        {isError && <TableCaption>Something went wrong.</TableCaption>}
      </ShadTable>
      {isSuccess && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn(currentPage === 1 && "opacity-50")}
                onClick={() => {
                  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={cn(currentPage === data.totalPages && "opacity-50")}
                onClick={() => {
                  if (currentPage < data.totalPages)
                    setCurrentPage((prev) => prev + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Table;
