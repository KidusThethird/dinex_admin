"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Initialize variables for "Pending," "Delivered," and "Approved" orders
// const pendingOrders = 3;
// const deliveredOrders = 5;
// const approvedOrders = 2;



const chartConfig = {
  count: {
    label: "Orders",
  },
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  Delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-2))",
  },
  Approved: {
    label: "Approved",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieChartComponent({
    pendingOrders,
    deliveredOrders,
    approvedOrders,
  }: {
    pendingOrders: number;
    deliveredOrders: number;
    approvedOrders: number;
  }) {

    const chartData = [
        { status: "Pending", count: pendingOrders, fill: "hsl(var(--chart-1))" },
        { status: "Delivered", count: deliveredOrders, fill: "hsl(var(--chart-2))" },
        { status: "Approved", count: approvedOrders, fill: "hsl(var(--chart-3))" },
      ];

//   const totalOrders = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.count, 0);
//   }, []);
const totalOrders = pendingOrders + deliveredOrders + approvedOrders;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Orders Breakdown</CardTitle>
        <CardDescription>Current Orders Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: any) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Orders summary for the current period <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of pending, delivered, and approved orders
        </div>
      </CardFooter>
    </Card>
  );
}
