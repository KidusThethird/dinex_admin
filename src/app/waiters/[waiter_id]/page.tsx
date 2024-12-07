'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiUrl } from '@/apiConfig';
import EditCellDialog from '@/custom_components/edit_cell_dialog';
import DropDownEditDialog from '@/custom_components/drop_down_edit_dialog';
import DeleteButton from '@/custom_components/delete_by_patch';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Waiter {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  status: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export default function Page() {
  const params = useParams();
  const waiterId = params?.waiter_id;

  const [waiter, setWaiter] = useState<Waiter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaiterDetails = async () => {
      if (!waiterId) {
        setError('Waiter ID is not provided.');
        setLoading(false);
        return;
      }

      try {
        // Replace this with your actual API base URL
        const Url = `${apiUrl}/waiters/${waiterId}`;
        const response = await fetch(Url);

        if (!response.ok) {
          throw new Error('Failed to fetch waiter details.');
        }

        const data: Waiter = await response.json();
        setWaiter(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchWaiterDetails();
  }, [waiterId]);

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
      <BreadcrumbLink href="/waiters">Waiters</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Waiter Details</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>



      <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>Waiter Details</h1>
      {waiter ? (
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
            <strong style={{ color: '#555' }}>First Name:</strong> {waiter.firstName} 
           
          </p>
          <EditCellDialog content={waiter.firstName} dataType='text' field='firstName'   id={Number(waiterId) || 0}   type='waiters'/>
          </div>


          <div className='flex justify-between'>
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Last Name:</strong> {waiter.lastName}
          </p>
          <EditCellDialog content={waiter.lastName} dataType='text' field='lastName'   id={Number(waiterId) || 0}   type='waiters'/>

          </div>

          <div className='flex justify-between'>
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Type:</strong> {waiter.type}
          </p>

          <DropDownEditDialog choices={["Full Time", "Part Time", "Other"]} content={waiter.type} dataType='text' field='type'  id={Number(waiterId) || 0} type='waiters' />

          </div>

          <div className='flex justify-between'>
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Status:</strong>{' '}
            <span style={{ color: waiter.status === 'active' ? 'green' : 'red' }}>{waiter.status}</span>
          </p>
          <DropDownEditDialog choices={["active", "down"]} content={waiter.status} dataType='text' field='status'  id={Number(waiterId) || 0} type='waiters' />
          </div>

          <div className='flex justify-between'>
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Email:</strong>{' '}
            <a href={`mailto:${waiter.email}`} style={{ color: '#4CAF50', textDecoration: 'none' }}>
              {waiter.email}
            </a>
          </p>

          <EditCellDialog content={waiter.email} dataType='text' field='email'   id={Number(waiterId) || 0}   type='waiters'/>

          </div>


          <div className='flex justify-between'>
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Phone Number:</strong> {waiter.phoneNumber}
          </p>

          <EditCellDialog content={waiter.phoneNumber} dataType='text' field='phoneNumber'   id={Number(waiterId) || 0}   type='waiters'/>

          </div>
          
          
          <p style={{ margin: '10px 0' }}>
            <strong style={{ color: '#555' }}>Created At:</strong>{' '}
            {new Date(waiter.createdAt).toLocaleString()}
          </p>


          <div>
            <DeleteButton id={Number(waiterId) || 0} type='waiters' goBackTo='/waiters'/>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#f44336' }}>No waiter details available.</p>
      )}
    </div></div>
  );
  
}
