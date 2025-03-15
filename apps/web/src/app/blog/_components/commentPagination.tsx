import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};
const CommentPagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  setCurrentPage,
  className,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* prev page button */}
      {currentPage !== 1 && (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className={cn("rounded-md bg-slate-200 py-2 px-2 cursor-pointer ")}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}

      {pageNumbers.map((page, i) => {
        return (
          <button
            onClick={() => handleClick(page)}
            key={i}
            className={cn("px-3 py-1 rounded-md transition   cursor-pointer", {
              "bg-slate-200": currentPage !== page && page !== "...",
              "bg-blue-500 text-white": currentPage === page,
              "cursor-not-allowed": page === "...",
            })}
            disabled={page === "..."}
          >
            {page === "..." ? "..." : <span>{page}</span>}
          </button>
        );
      })}

      {/* next page button */}

      {currentPage !== totalPages && currentPage !== 1 && (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className={cn("rounded-md bg-slate-200 py-2 px-2 cursor-pointer")}
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
};

export default CommentPagination;
