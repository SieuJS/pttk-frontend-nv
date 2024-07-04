import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useState, useEffect } from 'react';

interface PaymentInforSearchProps {
  maphieu: string;
  masothue: string;
  vitri: string;
}

export default function searchPaymentInfor() {
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<PaymentInforSearchProps>({
    mode: 'all',
    defaultValues: {
      masothue: "",
      vitri: "",
      maphieu: "",
    },
  });

  const fetchData = async () => {
    const searchData = getValues();

    try {
      const response = await fetch(`/api/payment`, {
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
  }, [currentPage, getValues()]);

  const onSearch = async () => {
    setCurrentPage(1); // Reset to page 1 on new search
    fetchData();
  };

  // Handle page change (from pagination buttons)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* ... Input fields (with onBlur={onSearch}) */}
      <Input
          label='Mã phiếu đăng tuyển'
          id='maphieu'
          {...register('maphieu')}
          onBlur={onSearch} // Call onSearch when input loses focus
        />
        <Input
          label='Mã số thuế'
          id='masothue'
          {...register('masothue')}
          onBlur={onSearch} // Call onSearch when input loses focus
        />
        <Input
          label='Vị trí'
          id='vitri'
          {...register('vitri')}
          onBlur={onSearch} // Call onSearch when input loses focus
        />
      {/* Display Search Results */}
      {searchResults.map((result, index) => (
        <Card key={index}>
          {/* ... Card content */}
        </Card>
      ))}

      {/* Pagination Controls */}
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={searchResults.length < 10 /* Assuming 10 items per page */}>
        Next Page
      </button>
    </>
  );
}