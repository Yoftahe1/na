import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { useGetUnitsQuery } from "@/states/services/course";

const Table = () => {
  const { toast } = useToast();
  const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const { courseId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetUnitsQuery({
    page: currentPage,
    courseId: `${courseId}`,
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
            <TableHead className="w-24 text-center">Unit No</TableHead>
            <TableHead>Unit Name</TableHead>
            <TableHead className="w-60">Action</TableHead>
          </TableRow>
        </TableHeader>
        {isSuccess && (
          <TableBody>
            {data.units.map((unit, index) => (
              <TableRow key={index} onClick={()=>navigate(`/app/course/${courseId}/unit/${unit.id}/lesson`)}>
                <TableCell className="text-center">{unit.unit_no}</TableCell>
                <TableCell>{unit.unit_title}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Edit unitId={unit.id} unitNo={unit.unit_no} unitName={unit.unit_title}/>
                    <Delete unitId={unit.id}/>
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
