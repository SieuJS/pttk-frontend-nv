'use client'
import { useForm } from 'react-hook-form';

import Input from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from 'react';
import { BackEndURL } from '@/components/env/config';
import { Pagination } from '@mui/material';
import { HiringSheet, columns, detailColumns, paymentColumns } from '../schema/hiring-sheet';
import { DataTable } from '@/components/shared/DataTable';

interface SearchHiringProps {
  context? : string ;
}

export default function HiringSearch({context} : SearchHiringProps) {
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm<HiringSheet>({
    mode: 'all',
    defaultValues: {
      doanhnghiep: "",
      vitridangtuyen: "",
      maphieudangtuyen: "",
    },
  });

  const fetchData = async (page?:number) => {
    const searchData = getValues();
    try {
      const response = await fetch(BackEndURL+`/hiring-sheet/search?limit=${limit}&page=${page || currentPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...searchData, 
          page: page || currentPage, // Pass current page to API
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

  async function onSearch (event? : any){
    console.log('on search');

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
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
    await fetchData();
  };

  return (
    <>
      <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit(onSearch)}>        
      <Input
          label='Mã phiếu đăng tuyển'
          id='maphieudangtuyen'
          {...register('maphieudangtuyen', {onChange: onSearch})}
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
        </form>
      {/* Display Search Results */}
    <DataTable columns={context === 'hiring' ? detailColumns : paymentColumns} data={searchResults} />
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