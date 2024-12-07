'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiUrl } from '@/apiConfig';
import EditCellDialog from '@/custom_components/edit_cell_dialog';
import DropDownEditDialog from '@/custom_components/drop_down_edit_dialog';
import DeleteButton from '@/custom_components/delete_by_patch';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Food {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  duration: number;
  status: string;
  createdAt: string;
}

export default function Page() {
  const params = useParams();
  const foodId = params?.food_id;

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      if (!foodId) {
        setError('Food ID is not provided.');
        setLoading(false);
        return;
      }

      try {
        const Url = `${apiUrl}/items/${foodId}`;
        const response = await fetch(Url);

        if (!response.ok) {
          throw new Error('Failed to fetch food details.');
        }

        const data: Food = await response.json();
        setFood(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [foodId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

<div>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/foods">Foods</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Food Details</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>


    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>Food Details</h1>
      {food ? (
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Food Name:</strong> {food.name}
            </p>
            <EditCellDialog content={food.name} dataType='text' field='name' id={Number(foodId) || 0} type='items' />
          </div>

          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Description:</strong> {food.description}
            </p>
            <EditCellDialog content={food.description} dataType='text' field='description' id={Number(foodId) || 0} type='items' />
          </div>

          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Type:</strong> {food.type}
            </p>
            <DropDownEditDialog choices={["Starter", "Main Course", "Dessert", "Drink"]} content={food.type} dataType='text' field='type' id={Number(foodId) || 0} type='items' />
          </div>

          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Price:</strong> {food.price.toFixed(2) } Birr
            </p>
            <EditCellDialog content={food.price.toString()} dataType='number' field='price' id={Number(foodId) || 0} type='items' />
          </div>

          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Duration (minutes):</strong> {food.duration}
            </p>
            <EditCellDialog content={food.duration.toString()} dataType='number' field='duration' id={Number(foodId) || 0} type='items' />
          </div>

          <div className='flex justify-between'>
            <p style={{ margin: '10px 0' }}>
              <strong style={{ color: '#555' }}>Status:</strong> <span style={{ color: food.status === 'Available' ? 'green' : 'red' }}>{food.status}</span>
            </p>
            <DropDownEditDialog choices={["Available", "Unavailable"]} content={food.status} dataType='text' field='status' id={Number(foodId) || 0} type='items' />
          </div>

          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Created At:</strong> {new Date(food.createdAt).toLocaleString()}
          </p>

          <div>
            <DeleteButton id={Number(foodId) || 0} type='items' goBackTo='/foods' />
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#f44336' }}>No food details available.</p>
      )}
    </div>
    </div>
  );
}
