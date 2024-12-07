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
      <BreadcrumbPage>Foods</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
</div>
    <a href="/foods/create_food" className='bg-primaryColor text-white p-1 rounded '>Create a new Food Item</a>
   
   <div className='w-full '>

<FoodsTable />
   </div>
   
    </div>
  )
}
