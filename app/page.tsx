"use client";

import { useState, useMemo } from "react";
import DashCards from "@/components/shared/dashboardcards";
import DashPieChart from "@/components/shared/dashpiechart";
import DataDropDown, { DataView } from "@/components/shared/datadropdown";
import Navbar from "@/components/shared/Navbar";
import { Separator } from "@/components/ui/separator";
import {
  transactions,
  expenseData,
  incomeData,
  Category,
} from "@/data/transactions";
import TxnTable from "@/components/shared/txntable";
import BalanceTrendChart from "@/components/shared/balancetrendchart";

const Home = () => {
  const [view, setView] = useState<DataView>("expenses");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const pieData = useMemo(() => {
    const base = view === "expenses" ? expenseData : incomeData;
    if (activeCategory === "All") return base;
    return base.filter((d) => d.name === activeCategory);
  }, [view, activeCategory]);

  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <div className="px-8 py-4 flex flex-col gap-6">
        <span className="text-xl font-semibold">Dashboard</span>

        {/* Row 1 — Cards and pie */}
        <div className="flex flex-col md:flex-row md:justify-around gap-6">
          {/* Cards — vertical stack */}
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Overview</span>
            <div className="flex flex-col md:flex-row items-center h-full gap-4">
              <DashCards
                title="Balance"
                desc="Your current balance"
                amount={balance}
                change="up"
                changeRate={10}
              />
              <DashCards
                title="Income"
                desc="Total income this month"
                amount={totalIncome}
                change="up"
                changeRate={20}
              />
              <DashCards
                title="Expenses"
                desc="Total expenses this month"
                amount={totalExpenses}
                change="down"
                changeRate={15}
              />
            </div>
          </div>

          {/* Pie chart */}
          <div className="flex flex-col px-6 py-4 shadow-lg rounded-2xl border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold">Analysis</span>
              <DataDropDown
                view={view}
                onViewChange={(v) => {
                  setView(v);
                  setActiveCategory("All");
                }}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
            <div className="flex items-center">
              <DashPieChart data={pieData} />
            </div>
          </div>
        </div>

        {/* Row 2 — Trend chart */}
        <div className="px-6 py-4 shadow-lg rounded-2xl border">
          <BalanceTrendChart />
        </div>

        <Separator />

        {/* Transaction table */}
        <TxnTable />
      </div>
    </div>
  );
};

export default Home;
