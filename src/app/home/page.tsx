"use client";
import React, { useEffect, useState } from 'react';
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

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // State to store the count data from the API
  const [dashboardData, setDashboardData] = useState({
    waiters: 0,
    foods: 0,
    drinks: 0,
  });

  // Fetch the data from /dashboard_info endpoint
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

  return (
    <div>
      <div className=''>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md w-fit border-2 border-primaryColor bg-orange-100"
          />
        </div>
        <div className='w-full flex'>
      <div className="grid grid-cols-4 w-full gap-10 my-9">
        

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex mx-auto m-6 text-7xl">
                <div className='w-fit mx-auto'>{dashboardData.waiters}</div></CardTitle>
              <CardDescription className="mx-auto w-fit">Waiters</CardDescription>
            </CardHeader>
          </Card>
</div>
<div>
          <Card>
            <CardHeader>
              <CardTitle className="flex mx-auto m-6 text-7xl"><div className='w-fit mx-auto'> {dashboardData.foods}</div></CardTitle>
              <CardDescription className="mx-auto w-fit">Foods</CardDescription>
            </CardHeader>
          </Card>
</div><div>
          <Card>
            <CardHeader>
              <CardTitle className="flex mx-auto m-6 text-7xl"><div className='w-fit mx-auto'> {dashboardData.drinks}</div></CardTitle>
              <CardDescription className="mx-auto w-fit">Drinks</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
