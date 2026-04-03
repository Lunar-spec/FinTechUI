import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TradeDownIcon, TradeUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface DashCardsPropss {
  title: string;
  desc: string;
  amount: number;
  change: "up" | "down";
  changeRate: number;
}

const DashCards = ({
  title,
  desc,
  amount,
  change,
  changeRate,
}: DashCardsPropss) => {
  return (
    <Card className="w-2xs shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
        <CardAction>
          <div className="flex items-center">
            <span className="text-xl font-medium">{changeRate}%</span>
            <HugeiconsIcon
              icon={change === "up" ? TradeUpIcon : TradeDownIcon}
              className={change === "up" ? "text-green-500" : "text-red-500"}
            />
          </div>
        </CardAction>
        <span className="text-2xl font-semibold">
          ₹{amount.toLocaleString("en-IN")}
        </span>
      </CardHeader>
    </Card>
  );
};

export default DashCards;
