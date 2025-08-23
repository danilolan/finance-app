import { Skeleton } from "@/components/atoms/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/molecules/table";
import { ScrollArea, ScrollBar } from "@/components/molecules/scroll-area";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
  showFilter?: boolean;
  showColumnSelector?: boolean;
  showPagination?: boolean;
}

export function DataTableSkeleton({
  columns = 5,
  rows = 20,
  showFilter = true,
  showColumnSelector = true,
  showPagination = true,
}: DataTableSkeletonProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      {/* Header with filter and column selector */}
      <div className="flex shrink-0 items-center gap-2">
        {showFilter && (
          <Skeleton className="h-8 w-48" />
        )}
        {showColumnSelector && (
          <Skeleton className="ml-auto h-8 w-24" />
        )}
      </div>

      {/* Table */}
      <div className="min-h-0 flex-1 rounded-md border bg-card">
        <ScrollArea className="h-full rounded-md">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="hover:bg-transparent">
                                 {Array.from({ length: columns }).map((_, index) => (
                   <TableHead key={index} className="h-8 px-2 py-1 text-xs">
                     <Skeleton className="h-4 w-20" />
                   </TableHead>
                 ))}
              </TableRow>
            </TableHeader>
            <TableBody>
                             {Array.from({ length: rows }).map((_, rowIndex) => (
                 <TableRow key={rowIndex} className="hover:bg-muted/50">
                   {Array.from({ length: columns }).map((_, colIndex) => (
                     <TableCell key={colIndex} className="h-10 px-2 py-2 text-xs">
                       <Skeleton className="h-5 w-full" />
                     </TableCell>
                   ))}
                 </TableRow>
               ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
          <ScrollBar />
        </ScrollArea>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex shrink-0 items-center justify-end gap-2">
          <div className="text-muted-foreground flex-1 text-xs">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-x-1">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      )}
    </div>
  );
}
