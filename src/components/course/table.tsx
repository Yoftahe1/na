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
import { useGetCoursesQuery } from "@/states/services/course";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const { toast } = useToast();
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetCoursesQuery({
    page: currentPage,
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
            <TableHead className="w-24">Course No</TableHead>
            <TableHead className="w-36">Course Image</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead className="w-60">Action</TableHead>
          </TableRow>
        </TableHeader>
        {isSuccess && (
          <TableBody>
            {data.courses.map((course, index) => (
              <TableRow key={index} onClick={()=>navigate(`/app/course/${course.id}/unit`)}>
                <TableCell className="text-center">{course.course_no}</TableCell>
                <TableCell>
                  <Avatar className="rounded-md size-16">
                    <AvatarImage src={course.course_img} alt="course image" />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{course.course_title}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Edit courseId={course.id} courseNo={course.course_no} courseName={course.course_title}/>
                    <Delete courseId={course.id}/>
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
