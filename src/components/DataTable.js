import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import './DataTable.css'; 
const DataTable = () => {
   const [records, setRecords] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [page, setPage] = useState(1);

   const fetchRecords = useCallback(async () => {
      try {
         const res = await axios.get(`http://localhost:5000/records?_page=${page}&_limit=10`);
         setRecords(prev => {
            const newRecords = [...prev, ...res.data];
            const uniqueRecords = Array.from(new Map(newRecords.map(record => [record.id, record])).values());
            return uniqueRecords;
         });
         if (res.data.length < 10) setHasMore(false); 
      } catch (error) {
         console.error('Error fetching records:', error);
      }
   }, [page]);

   useEffect(() => {
      fetchRecords();
   }, [fetchRecords]);

   return (
      <div className="dataTableContainer">
         <InfiniteScroll
            dataLength={records.length}
            next={() => setPage(prev => prev + 1)}
            hasMore={hasMore}
            loader={<div className="loader"><CircularProgress /></div>}
            endMessage={<div className="endMessage">No more records to load.</div>}
         >
            <Table className="dataTable">
               <TableHead>
                  <TableRow className="tableHeader">
                     <TableCell>ID</TableCell>
                     <TableCell>Name</TableCell>
                     <TableCell>Surname</TableCell>
                     <TableCell>Age</TableCell>
                     <TableCell>Address</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {records.map(record => (
                     <TableRow key={record.id} className="tableRow">
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.surname}</TableCell>
                        <TableCell>{record.age}</TableCell>
                        <TableCell>{record.address}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </InfiniteScroll>
      </div>
   );
};

export default DataTable;
