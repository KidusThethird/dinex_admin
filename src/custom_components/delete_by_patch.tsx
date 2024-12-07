"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // For handling route changes
import { apiUrl } from "@/apiConfig";

interface DeleteDialogProps {
  type: string;
  id: number;
  goBackTo: string; // New prop to handle the redirection URL
}

export default function DeleteButton({ type, id, goBackTo }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Router hook to programmatically navigate

  const handleDelete = async () => {
    try {
      // Send PATCH request to update the "deleted" attribute to true
      const response = await fetch(`${apiUrl}/${type}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deleted: true }), // Set the "deleted" attribute to true
      });

      if (response.ok) {
        toast("Item deleted successfully");
        setOpen(false);
        // Redirect to the "goBackTo" URL after successful deletion
        router.push(goBackTo);
      } else {
        console.error("Failed to delete item");
        toast("Failed to delete item", { description: "Something went wrong" });
      }
    } catch (error) {
      console.error("Error deleting item", error);
      toast("Error deleting item", { description: "Something went wrong" });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" " size="sm">
            Delete
          </Button> 
          
     
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete the item. Please confirm to proceed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              className="bg-gray-400 text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              // className="bg-red-500 text-white"
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
