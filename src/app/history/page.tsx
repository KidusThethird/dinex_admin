'use client';
import React, { useEffect, useState } from 'react';
import { CircleCheck, Check, CircleEllipsis, CheckCheck, Ellipsis, Loader, X } from 'lucide-react';
import { useRouter } from 'next/navigation'; // For navigation
import * as XLSX from 'xlsx'; // Import XLSX for Excel export

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Rows per page (can be changed)
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/finance_info/');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return createdAt.toLocaleString();
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMinutes} minutes ago`;
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle rows per page change
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when rows per page is changed
  };

  // Total pages
  const totalPages = Math.ceil(orders.length / rowsPerPage);

  // Export to Excel functionality
  const exportToExcel = () => {
    const tableData = orders.map((order) => {
      const totalAmount = order.OrderItems.reduce(
        (sum: number, item: any) => sum + item.Item.price * item.quantity,
        0
      );

      return {
        ID: order.id,
        TableNumber: order.TableNumber,
        WaiterName: `${order.Waiter.firstName} ${order.Waiter.lastName}`,
        OrderDetails: order.OrderItems.map((item: any) => `${item.quantity} x ${item.Item.name} ($${item.Item.price})`).join(', '),
        TotalAmount: `$${totalAmount}`,
        Time: formatTime(order.createdAt),
        Status: order.OrderStatus,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Create the Excel file
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <div className="p-6 mt-14">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Export to Excel button */}
      <div className="mb-4">
        <button
          onClick={exportToExcel}
          className="bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryColor-dark transition"
        >
          Export to Excel
        </button>
      </div>

      {/* Dropdown for rows per page */}
      <div className="mb-4">
        <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="p-2 border border-gray-300 rounded"
        >
          {[5, 10, 20, 30, 50, 70, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Details</th>
            <th className="border border-gray-300 p-2">Table Number</th>
            <th className="border border-gray-300 p-2">Waiter Name</th>
            <th className="border border-gray-300 p-2">Order Details</th>
            <th className="border border-gray-300 p-2">Total Amount</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => {
            const totalAmount = order.OrderItems.reduce(
              (sum: number, item: any) => sum + item.Item.price * item.quantity,
              0
            );

            return (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => router.push(`/order_details/${order.id}`)}
                    className=" text-primaryColor px-1 py-1 rounded hover:bg-primaryColor hover:text-white transition"
                  >
                    <Ellipsis />
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {order.TableNumber}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {order.Waiter.firstName} {order.Waiter.lastName}
                </td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {order.OrderItems.map((item: any) => (
                      <li key={item.id}>
                        {item.quantity} x {item.Item.name} (${item.Item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  ${totalAmount}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {formatTime(order.createdAt)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {order.OrderStatus === 'approved' ? (
                    <div className='text-primaryColor'>
                    <Check /></div>
                  ) : order.OrderStatus === 'delivered' ? (
                    <div className='text-green-400'>
                    <CheckCheck /></div>
                  ) : (
                    order.OrderStatus === 'removed' ? (
                     <div className='text-red-500'> <X /></div>
                    ) : (
                      <div className='text-yellow-500'>
                      <Loader />
                      </div>
                    )
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-primaryColor text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
