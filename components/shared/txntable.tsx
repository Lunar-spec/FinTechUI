"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { transactions, Transaction, Category } from "@/data/transactions";
import { useMemo, useState } from "react";

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Education",
  "Skills",
  "Investment",
  "Interest",
  "Groceries",
  "Bills",
  "Salary",
  "Freelance",
  "Rental",
];

const PAGE_SIZES = [5, 10, 20];

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

const SortIcon = ({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) => (
  <span className="ml-1 text-xs text-muted-foreground">
    {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
  </span>
);

const TxnTable = () => {
  // Internal category filter (independent of the chart filter)
  const [localCategory, setLocalCategory] = useState<Category | "All">("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const filtered = useMemo<Transaction[]>(() => {
    let txns = [...transactions];
    if (localCategory !== "All")
      txns = txns.filter((t) => t.category === localCategory);
    txns.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "date")
        return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return txns;
  }, [localCategory, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Transaction History</span>

        {/* Category filter */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="rounded-md" />
            }
          >
            {localCategory === "All" ? "All Categories" : localCategory}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {CATEGORIES.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => {
                    setLocalCategory(cat);
                    setPage(1);
                  }}
                  className={localCategory === cat ? "font-semibold" : ""}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="rounded-md" />
            }
          >
            {localCategory === "All" ? "All Categories" : localCategory}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => {
                  setLocalCategory(cat);
                  setPage(1);
                }}
                className={localCategory === cat ? "font-semibold" : ""}
              >
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead
                className="cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort("date")}
              >
                Date <SortIcon col="date" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead>Particulars</TableHead>
              <TableHead>Category</TableHead>
              <TableHead
                className="cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort("amount")}
              >
                Amount{" "}
                <SortIcon col="amount" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="tabular-nums text-muted-foreground whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.particulars}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-muted font-medium">
                      {t.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`tabular-nums font-semibold ${
                      t.type === "credit" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {t.type === "credit" ? "+" : "−"}₹
                    {t.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded-md w-14"
                />
              }
            >
              {pageSize}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {PAGE_SIZES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => {
                    setPageSize(s);
                    setPage(1);
                  }}
                  className={pageSize === s ? "font-semibold" : ""}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <span>
          {filtered.length === 0 ? "0" : (page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            «
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ‹
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            ›
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            »
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TxnTable;
