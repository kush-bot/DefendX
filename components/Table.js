"use client";
import React, { useState, useEffect, useRef } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 2000);

    // Fetch data immediately when component mounts
    fetchData();

    // Clear interval on component unmount
    return () => clearInterval(fetchDataInterval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports');
      const jsonData = await response.json();
      setData(jsonData);
      // Scroll to the bottom of the table
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'rejected' ? 'text-red-500' : 'text-green-500';
  };

  return (
    <div className="w-4/5 mx-auto border rounded-lg overflow-auto" ref={tableRef}>
      <table className="w-full border-collapse border h-13 border-gray-300 rounded-lg">
        <thead>
          <tr className="rounded-lg">
            <th className="border border-gray-300 p-3 rounded-lg">Ip Address</th>
            <th className="border border-gray-300 p-2 rounded-lg">Port</th>
            <th className="border border-gray-300 p-3 rounded-lg">Destination</th>
            <th className="border border-gray-300 p-3 rounded-lg">Payload</th>
            <th className="border border-gray-300 p-3 rounded-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center text-x text-black">
              <td className="p-4 rounded-lg">{item.client_ip}</td>
              <td className="p-4 rounded-lg">{item.destination_port}</td>
              <td className="p-4 rounded-lg">{item.request_path}</td>
              <td className="p-4 rounded-lg">{item.payload}</td>
              <td className={`p-4 rounded-lg ${getStatusColor(item.status)}`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
