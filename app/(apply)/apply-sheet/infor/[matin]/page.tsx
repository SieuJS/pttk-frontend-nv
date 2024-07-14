'use client'
import {useForm} from 'react-hook-form';
import { useParams } from 'next/navigation'
import Input from "@/components/ui/input" ; 

import { useState, useEffect } from 'react';

import { BackEndURL } from '@/components/env/config';

import { ApplySheet, columns } from '@/app/(apply)/schema/apply-sheet';

import { DataTable } from '@/components/shared/DataTable';

import { Pagination } from '@mui/material';

export default function ApplySearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    const params = useParams() ; 
    const {
      register,
      setValue,
      formState: { errors },
      getValues,
      handleSubmit
    } = useForm<ApplySheet>({
      mode: 'all',
      defaultValues: {
        maphieuungtuyen : `${params.matin}`,
        maungvien : "",
      },
    });
  
    const fetchData = async (page?:number) => {
      const searchData = getValues();
      try {
        const response = await fetch(BackEndURL+`/apply-sheet/search?limit=${limit}&page=${page || currentPage}`, {
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
    }, [currentPage, params.matin]);
  
    async function onSearch (event? : any){
  
      setCurrentPage(1);
      let fieldName = event.target.id;
      setValue (fieldName, event.target.value);
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
            label='Mã số thuế'
            id='congty'
            {...register('maungvien', {onChange : onSearch})}
  // Call onSearch when input loses focus
          />
          <Input
            label='Vị trí'
            id='diachi'
            {...register('thoigianungtuyen', {onChange : onSearch})}
          />
          </form>
        {/* Display Search Results */}
      <DataTable columns={columns} data={searchResults} />
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