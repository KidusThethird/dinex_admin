"use client";
import React, { useEffect, useState } from "react";
import { Student, columns } from "./columns";
//import DataTableGenerator from "@/main_components/data-table";

import axios from "axios";
import { apiUrl } from "@/apiConfig";
import DataTableGenerator from "@/main_components/data-table";





export default function WaitersTable() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the access token (example: from localStorage or state)
        const accessToken = localStorage.getItem("accessToken");

        // Make sure the token exists
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        // Make the request
       const response = await axios.get(`${apiUrl}/waiters`, {
   // const response = await axios.get(`https://api.fayidaacademy.com/city`, {  
  headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Attach token to Authorization header
          },
          withCredentials: true, // Include credentials in the request
        });

        // Extract and set the data
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []); 

  return (
    <div className="mx-3">
      <h1 className="text-lg text-blue-800 underline font-semibold my-8">
        Waiters List
      </h1>
      <DataTableGenerator
        columns={columns}
        data={data}
        filterBy="firstName"
        type="waiter"
      />
    </div>
  );
}