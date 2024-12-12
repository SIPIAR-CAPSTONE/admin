import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function TableSkeleton({ numberOfCells = 6, numberOfRows = 3 }) {
  return (
    <>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: numberOfCells }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="w-full h-[1.40rem]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
