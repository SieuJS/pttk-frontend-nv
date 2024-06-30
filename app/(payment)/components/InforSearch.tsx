'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';

interface SearchInputs {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
}

interface SearchResult {
    id: number;
    title: string;
    description: string;
}

const SearchForm: React.FC = () => {
    const [searchInputs, setSearchInputs] = useState<SearchInputs>({
        field1: '',
        field2: '',
        field3: '',
        field4: ''
    });

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform search with the input values
        const results = performSearch(searchInputs);
        setSearchResults(results);
    };

    const performSearch = (inputs: SearchInputs): SearchResult[] => {
        // Dummy search function, replace with actual search logic
        return [
            { id: 1, title: `Result for ${inputs.field1}`, description: 'Description 1' },
            { id: 2, title: `Result for ${inputs.field2}`, description: 'Description 2' },
            { id: 3, title: `Result for ${inputs.field3}`, description: 'Description 3' },
            { id: 4, title: `Result for ${inputs.field4}`, description: 'Description 4' }
        ];
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="field1"
                            label="Field 1"
                            value={searchInputs.field1}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="field2"
                            label="Field 2"
                            value={searchInputs.field2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="field3"
                            label="Field 3"
                            value={searchInputs.field3}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="field4"
                            label="Field 4"
                            value={searchInputs.field4}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {searchResults.map(result => (
                    <Grid item xs={12} md={6} key={result.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {result.title}
                                </Typography>
                                <Typography color="textSecondary">
                                    {result.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default SearchForm;
