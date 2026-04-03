"use client";

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
import { Category } from "@/data/transactions";

export type DataView = "expenses" | "income";

interface DataDropDownProps {
  view: DataView;
  onViewChange: (v: DataView) => void;
  activeCategory: Category | "All";
  onCategoryChange: (c: Category | "All") => void;
}

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

const DataDropDown = ({
  view,
  onViewChange,
  activeCategory,
  onCategoryChange,
}: DataDropDownProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Data type toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" className="rounded-md capitalize" />
          }
        >
          {view}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onViewChange("expenses")}>
              Expenses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange("income")}>
              Income
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Category filter */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="rounded-md" />}
        >
          {activeCategory === "All" ? "All Categories" : activeCategory}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-64 overflow-y-auto">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Category</DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={activeCategory === cat ? "font-semibold" : ""}
              >
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataDropDown;
