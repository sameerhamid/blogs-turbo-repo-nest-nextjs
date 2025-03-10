import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};
const Pagination = (props: Props) => {
  const { totalPages, currentPage, pageNeighbors = 2, className } = props;
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  });
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* prev page button */}
      {currentPage !== 1 && (
        <button className={cn("rounded-md bg-slate-200 py-2 px-2")}>
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4" />
          </Link>
        </button>
      )}

      {pageNumbers.map((page, i) => {
        return (
          <button
            key={i}
            className={cn(
              "px-3 py-1 rounded-md transition hover:text-sky-600",
              {
                "bg-slate-200": currentPage !== page && page !== "...",
                "bg-blue-500 text-white": currentPage === page,
                "cursor-not-allowed": page === "...",
              }
            )}
          >
            {page === "..." ? (
              "..."
            ) : (
              <Link href={`?page=${page}`}>{page}</Link>
            )}
          </button>
        );
      })}

      {/* next page button */}

      {currentPage !== totalPages && (
        <button className={cn("rounded-md bg-slate-200 py-2 px-2")}>
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
