"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreVertical } from "lucide-react";
//import { TableOptionDropDown } from "@/custom_components/table_option_menu";

import { CreditCard, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

//import { Action } from "@radix-ui/react-alert-dialog";
//import DeleteAlert from "../../custom_components/deleteAlert";

export type Student = {
  id: string;
  firstsName: string;
  lastName: string;
 
};

export const columns: ColumnDef<Student>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const Waiter = row.original;
      const WaiterId = Waiter.id;
      const WaiterFirstName = Waiter.firstsName;
    

      return (
        <div className="cursor-pointer my-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{WaiterFirstName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    console.log(WaiterId);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <Link href={`/foods/${WaiterId}`}>Details</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Name
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "name",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Type
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "type",
  },

  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          <div className="flex space-x-1">
            Price
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "price",
    cell: ({ row }) => {
      const price = String(row.getValue("price")); // Access the 'price' value
      return <span>{price} Birr</span>; // Add "USD" or any other text
    },
  },
  {
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() == "asc");
          }}
        >
          {" "}
          <div className="flex space-x-1">
            Status
            <ArrowUpDown size={16} />
          </div>
        </button>
      );
    },
    accessorKey: "status",
  },
  

 
];