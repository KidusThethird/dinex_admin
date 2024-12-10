"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
import React, { useEffect, useState } from "react";

// ChartConfig setup
const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  const [chartData, setChartData] = useState<
    { date: string; orders: number }[]
  >([]);

  useEffect(() => {
    // Fetch finance info and process data for the last 15 days
    const fetchOrdersData = async () => {
      try {
        const response = await fetch("http://localhost:5000/finance_info/");
        if (!response.ok) {
          throw new Error("Failed to fetch finance data");
        }
        const data = await response.json();

        // Calculate the number of orders for each of the last 15 days
        const now = new Date();
        const last15Days = Array.from({ length: 15 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - i);
          return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        });

        // Count orders per day
        const orderCounts = last15Days.map((day) => {
          const ordersOnDay = data.filter(
            (order: any) => order.createdAt.startsWith(day)
          );
          return { date: day, orders: ordersOnDay.length };
        });

        setChartData(orderCounts.reverse()); // Reverse to show the most recent day on the right
      } catch (error) {
        console.error("Error fetching finance info:", error);
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Orders in Last 15 Days</CardTitle>
        <CardDescription>Comparing daily order counts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)} // Format the date for readability
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="orders" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing order counts for the last 15 days
        </div>
      </CardFooter>
    </Card>
  );
}
