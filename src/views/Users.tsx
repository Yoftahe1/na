import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filter from "@/components/users/filter";
import Table from "@/components/users/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useGetUsersQuery } from "@/states/services/user";
import { useEffect, useState } from "react";

const Users = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isFetching, isError } = useGetUsersQuery({
    page: currentPage,
    first_name: firstName,
    last_name: lastName,
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: "Fetching users failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  }, [isError, toast]);

  function setValues(fName: string, lName: string) {
    setFirstName(fName);
    setLastName(lName);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-2xl">Users</h3>
        <Filter setValues={setValues} isLoading={isLoading || isFetching} />
      </div>
      <Table isLoading={isLoading} users={data ? data.users : []} />
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
                  if (currentPage < data!.totalPages)
                    setCurrentPage((prev) => prev + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Users;
