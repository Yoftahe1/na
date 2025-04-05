import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import Ban from "./ban";
import UnBan from "./unban";
import { UserI } from "@/states/services/user";

interface TableI {
  isLoading: boolean;
  users: UserI[];
}

const Table = ({ users, isLoading }: TableI) => {
  return (
    <>
      <ShadTable>
        <TableHeader>
          <TableRow>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Date of birth</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 &&
            !isLoading &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  {user.date_of_birth
                    ? new Date(user.date_of_birth).toDateString()
                    : ""}
                </TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.xp}</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
                <TableCell>
                  {/* <Ban />
                  <UnBan /> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </ShadTable>
      {users.length === 0 && !isLoading && <p>no data</p>}
    </>
  );
};

export default Table;
