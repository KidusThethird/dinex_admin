import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import FoodsTable from './table/page'
//import WaitersTable from './table/page'

  
export default function Waiters() {
  return (
    <div className=' m-4 w-full '>
        <div className='py-4'><Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    
   
    <BreadcrumbItem>
      <BreadcrumbPage>Drinks</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
</div>
    <a href="/drinks/create_drink" className='bg-primaryColor text-white p-1 rounded '>Create a new Drink Item</a>
   
   <div className='w-full '>

<FoodsTable />
   </div>
   
    </div>
  )
}
