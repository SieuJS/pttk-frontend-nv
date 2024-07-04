'use client'
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from 'react';
import { BackEndURL } from '@/components/env/config';
import { Pagination } from '@mui/material';
import { HiringSheet, columns, detailColumns } from '../schema/hiring-sheet';
import { DataTable } from '@/components/shared/DataTable';
export default function HiringSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<HiringSheet>({
    mode: 'all',
    defaultValues: {
      doanhnghiep: "",
      vitridangtuyen: "",
      maphieudangtuyen: "",
    },
  });

  const fetchData = async () => {
    const searchData = getValues();
    try {
      const response = await fetch(BackEndURL+`/hiring-sheet/search?limit=${limit}&page=${currentPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...searchData, 
          page: currentPage, // Pass current page to API
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data);
        setTotalCount(data.total);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on initial render, page change, or search criteria change
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  async function onSearch (event : ChangeEvent<HTMLInputElement>){
    setCurrentPage(1);
    let fieldName = event.target.id;
    if (fieldName === 'doanhnghiep') {
    setValue('doanhnghiep',event.target.value)
    }
    if (fieldName === 'maphieudangtuyen') {
      setValue('maphieudangtuyen',event.target.value)
    }
    if (fieldName === 'vitridangtuyen') {
      setValue('vitridangtuyen',event.target.value)
    }
    await fetchData();
  }



  // Handle page change (from pagination buttons)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  return (
    <>
      {/* ... Input fields (with onBlur={onSearch}) */}
      <div className="grid grid-cols-3 gap-4">
      <Input
          label='Mã phiếu đăng tuyển'
          id='maphieudangtuyen'
          {...register('maphieudangtuyen', {onChange:onSearch})}
        />
        <Input
          label='Mã số thuế'
          id='doanhnghiep'
          {...register('doanhnghiep', {onChange : onSearch})}
// Call onSearch when input loses focus
        />
        <Input
          label='Vị trí'
          id='vitridangtuyen'
          {...register('vitridangtuyen', {onChange : onSearch})}
        />
        </div>
      {/* Display Search Results */}
    <DataTable columns={detailColumns} data={searchResults} />
    <Pagination
        count={Math.ceil(totalCount / limit)} // Assuming 10 items per page
        page={currentPage} 
        onChange={(event, newPage) => handlePageChange(newPage)} 
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </>
  );
}