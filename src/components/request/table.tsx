import {
  Table as ShadTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import Approve from "./approve";
import { useGetRequestsQuery } from "@/states/services/course";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

const Table = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isSuccess } = useGetRequestsQuery({
    page: 1,
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
            <TableHead>Full Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Unit Title</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {isSuccess && (
          <TableBody>
            {data.requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  {request.first_name} {request.last_name}
                </TableCell>
                <TableCell>{request.phone_number}</TableCell>
                <TableCell>{request.address}</TableCell>
                <TableCell>{request.unit_title}</TableCell>
                <TableCell>
                  {new Date(request.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  <Badge>{request.status}</Badge>
                </TableCell>
                <TableCell>
                  {/* <Approve /> */}
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
