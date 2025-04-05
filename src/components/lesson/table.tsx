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
import Edit from "./edit";
import Delete from "./delete";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useGetLessonsQuery } from "@/states/services/course";
import { useParams, useNavigate } from "react-router-dom";

const Table = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { courseId, unitId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetLessonsQuery({
    page: currentPage,
    unitId: `${unitId}`,
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
            <TableHead className="w-24 text-center">Lesson No</TableHead>
            <TableHead>Lesson Name</TableHead>
            <TableHead className="w-60">Action</TableHead>
          </TableRow>
        </TableHeader>
        {isSuccess && (
          <TableBody>
            {data.lessons.map((lesson, index) => (
              <TableRow
                key={index}
                onClick={() =>
                  navigate(`/app/course/${courseId}/unit/${unitId}/lesson/${lesson.id}/question`)
                }
              >
                <TableCell className="text-center">
                  {lesson.file_no}
                </TableCell>
                <TableCell>{lesson.file_name}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Edit lessonId={lesson.id} fileNo={lesson.file_no} fileName={lesson.file_name} content={lesson.content} state={lesson.state} oldTimestamp={lesson.timestamp} lessonAudio={lesson.file_audio}/>
                    <Delete lessonId={lesson.id}/>
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
