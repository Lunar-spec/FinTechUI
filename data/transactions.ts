export type Category =
    | "Education"
    | "Skills"
    | "Investment"
    | "Interest"
    | "Groceries"
    | "Bills"
    | "Salary"
    | "Freelance"
    | "Rental";

export type Transaction = {
    date: string;
    amount: number;
    type: "credit" | "debit";
    category: Category;
    particulars: string;
};

export const transactions: Transaction[] = [
    { date: "2025-04-01", amount: 85000, type: "credit", category: "Salary", particulars: "April salary credit" },
    { date: "2025-04-02", amount: 1200, type: "debit", category: "Groceries", particulars: "Weekly grocery run - DMart" },
    { date: "2025-04-03", amount: 4999, type: "debit", category: "Skills", particulars: "Udemy - React Advanced course" },
    { date: "2025-04-04", amount: 15000, type: "credit", category: "Freelance", particulars: "UI design project - client payment" },
    { date: "2025-04-05", amount: 2400, type: "debit", category: "Bills", particulars: "Electricity bill - April" },
    { date: "2025-04-06", amount: 10000, type: "debit", category: "Investment", particulars: "SIP - Axis Bluechip Fund" },
    { date: "2025-04-07", amount: 650, type: "credit", category: "Interest", particulars: "Savings account interest" },
    { date: "2025-04-08", amount: 3200, type: "debit", category: "Bills", particulars: "Internet + OTT subscriptions" },
    { date: "2025-04-09", amount: 7500, type: "credit", category: "Rental", particulars: "Rent received - tenant payment" },
    { date: "2025-04-10", amount: 1800, type: "debit", category: "Education", particulars: "School fee - Q1 instalment" },
    { date: "2025-04-11", amount: 560, type: "debit", category: "Groceries", particulars: "Quick mart - vegetables & dairy" },
    { date: "2025-04-12", amount: 5000, type: "debit", category: "Investment", particulars: "Stock purchase - HDFC Bank" },
    { date: "2025-04-13", amount: 299, type: "debit", category: "Skills", particulars: "GitHub Copilot subscription" },
    { date: "2025-04-14", amount: 12000, type: "credit", category: "Freelance", particulars: "SEO consulting - milestone 2" },
    { date: "2025-04-15", amount: 900, type: "debit", category: "Bills", particulars: "Mobile recharge - family plan" },
];

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7", "#EC4899", "#14B8A6", "#F97316", "#84CC16"];

function aggregateByCategory(txns: Transaction[]) {
    const map: Record<string, number> = {};
    txns.forEach(({ category, amount }) => {
        map[category] = (map[category] ?? 0) + amount;
    });
    return Object.entries(map).map(([name, value], i) => ({
        name,
        value,
        color: COLORS[i % COLORS.length],
    }));
}

export const expenseData = aggregateByCategory(
    transactions.filter((t) => t.type === "debit")
);

export const incomeData = aggregateByCategory(
    transactions.filter((t) => t.type === "credit")
);

export const balanceTrend = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce<{ date: string; balance: number }[]>((acc, t) => {
        const prev = acc.at(-1)?.balance ?? 0;
        const delta = t.type === "credit" ? t.amount : -t.amount;
        acc.push({ date: t.date, balance: prev + delta });
        return acc;
    }, []);