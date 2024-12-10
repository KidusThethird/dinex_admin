"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiUrl } from "@/apiConfig"; // Make sure to import apiUrl
import { PieChartComponent } from "@/custom_components/pie_chart";
import { BarChartComponent } from "@/custom_components/bar_chart";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // State to store the count data from the /dashboard_info API
  const [dashboardData, setDashboardData] = useState({
    waiters: 0,
    foods: 0,
    drinks: 0,
  });

  // State to store daily statistics data
  const [orderStatistics, setOrderStatistics] = useState({
    last24Hours: 0,
    pendingLast24Hours: 0,
    deliveredLast24Hours: 0,
    approvedLast24Hours: 0,
  });

  // State to store weekly statistics data
  const [weeklyOrderStatistics, setWeeklyOrderStatistics] = useState({
    pendingLastWeek: 0,
    deliveredLastWeek: 0,
    approvedLastWeek: 0,
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${apiUrl}/dashboard_info`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDashboardData({
          waiters: data.waiters || 0,
          foods: data.foods || 0,
          drinks: data.drinks || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array to run only once on component mount

  // Fetch finance info and calculate statistics
  useEffect(() => {
    const fetchFinanceInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/finance_info/");
        if (!response.ok) {
          throw new Error("Failed to fetch finance info");
        }
        const data = await response.json();

        // Calculate statistics
        const now = new Date();
        const dailyStats = {
          last24Hours: 0,
          pendingLast24Hours: 0,
          deliveredLast24Hours: 0,
          approvedLast24Hours: 0,
        };
        const weeklyStats = {
          pendingLastWeek: 0,
          deliveredLastWeek: 0,
          approvedLastWeek: 0,
        };

        data.forEach((order: any) => {
          const orderDate = new Date(order.createdAt);
          const hoursDifference =
            (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

          // Update daily statistics
          if (hoursDifference <= 24) {
            dailyStats.last24Hours++;
            if (order.OrderStatus === "pending") dailyStats.pendingLast24Hours++;
            if (order.OrderStatus === "delivered") dailyStats.deliveredLast24Hours++;
            if (order.OrderStatus === "approved") dailyStats.approvedLast24Hours++;
          }

          // Update weekly statistics
          if (hoursDifference <= 7 * 24) {
            if (order.OrderStatus === "pending") weeklyStats.pendingLastWeek++;
            if (order.OrderStatus === "delivered") weeklyStats.deliveredLastWeek++;
            if (order.OrderStatus === "approved") weeklyStats.approvedLastWeek++;
          }
        });

        setOrderStatistics(dailyStats);
        setWeeklyOrderStatistics(weeklyStats);
      } catch (error) {
        console.error("Error fetching finance info:", error);
      }
    };

    fetchFinanceInfo();
  }, []);

  return (
    <div>
      {/* Existing Dashboard Section */}
      <div className=" grid grid-cols-3 gap-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md w-fit border-2 border-primaryColor bg-orange-100"
        />

        {/* Pie Chart for Last 24 Hours */}
        <div>
          <h1 className="text-center text-primaryColor font-semibold">Orders in the Last 24 Hours</h1>
        <PieChartComponent
          approvedOrders={orderStatistics.approvedLast24Hours}
          deliveredOrders={orderStatistics.deliveredLast24Hours}
          pendingOrders={orderStatistics.pendingLast24Hours}
        /></div>

        {/* Pie Chart for Last Week */}
        <div><h1 className="text-center text-primaryColor font-semibold">Orders in the last week</h1>
        <PieChartComponent
          approvedOrders={weeklyOrderStatistics.approvedLastWeek}
          deliveredOrders={weeklyOrderStatistics.deliveredLastWeek}
          pendingOrders={weeklyOrderStatistics.pendingLastWeek}
        /></div>
      </div>

      <div className="w-full flex">
        <div className="grid grid-cols-4 w-full  gap-10 my-9">
          <Card>
            <CardHeader>
              <CardTitle className="flex mx-auto m-6 text-7xl">
                <div className="w-fit mx-auto">{dashboardData.waiters}</div>
              </CardTitle>
              <CardDescription className="mx-auto w-fit">Waiters</CardDescription>
            </CardHeader>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex mx-auto m-6 text-7xl">
                  <div className="w-fit mx-auto">{dashboardData.foods}</div>
                </CardTitle>
                <CardDescription className="mx-auto w-fit">Foods</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex mx-auto m-6 text-7xl">
                  <div className="w-fit mx-auto">{dashboardData.drinks}</div>
                </CardTitle>
                <CardDescription className="mx-auto w-fit">Drinks</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
<div className="grid grid-cols-2 mb-10 gap-3">
      <BarChartComponent />
      <div className="grid grid-cols-2 gap-6 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Orders in Last 24 Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total: {orderStatistics.last24Hours}</p>
            <p>Pending: {orderStatistics.pendingLast24Hours}</p>
            <p>Delivered: {orderStatistics.deliveredLast24Hours}</p>
            <p>Approved: {orderStatistics.approvedLast24Hours}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders in Last Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Pending: {weeklyOrderStatistics.pendingLastWeek}</p>
            <p>Delivered: {weeklyOrderStatistics.deliveredLastWeek}</p>
            <p>Approved: {weeklyOrderStatistics.approvedLastWeek}</p>
          </CardContent>
        </Card>
      </div>
      </div>
      {/* Order Statistics Section */}
      
    </div>
  );
}
