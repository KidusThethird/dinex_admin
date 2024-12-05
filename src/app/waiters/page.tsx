import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import WaitersTable from './table/page'

  
export default function Waiters() {
  return (
    <div className=' m-4'>
        <div className='py-4'><Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    
   
    <BreadcrumbItem>
      <BreadcrumbPage>Waiters</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
</div>
    <a href="/waiters/create_waiter" className='bg-primaryColor text-white p-1 rounded '>Create a new waiter</a>
   
   <div>

    <WaitersTable />
   </div>
   
    </div>
  )
}
