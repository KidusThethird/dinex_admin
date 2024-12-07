"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { apiUrl } from "@/apiConfig";

interface EditDialogProps {
  type: string;
  id: number;
  field: string;
  content: string;
  dataType: string;
  choices: string[]; // Add choices as a prop
}

export default function DropDownEditDialog({
  type,
  id,
  field,
  content,
  dataType,
  choices, // Array of choices passed as prop
}: EditDialogProps) {
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = field;
  const RecivedContent = content;
  const DataType = dataType;

  const [selectedValue, setSelectedValue] = useState(RecivedContent || ""); // Initial value for dropdown
  const [open, setOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value); // Update state with selected value
  };

  const updatedData = {
    [RecivedField.toString()]: selectedValue, // Send the selected value in the request
  };

  const router = useRouter();
  const handleUpdate = async () => {
    try {
      console.log("Updating...");

      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("File Updated");
        router.push(window.location.href); // Refresh the page after update
        setOpen(false);
        router.refresh();
        toast("Section Edited.");
      } else {
        console.error("Failed to Update file");
      }
    } catch (error) {
      console.error("Error Updating file", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-1 text-white bg-primaryColor rounded">
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit from {RecivedType}</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Choose {RecivedField}
              </Label>
              <select
                id={RecivedField}
                value={selectedValue}
                onChange={handleSelectChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {choices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-primaryColor text-white"
              type="button"
              onClick={handleUpdate}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
