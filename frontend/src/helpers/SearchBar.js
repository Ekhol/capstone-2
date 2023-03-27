import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchBar({ queryFor }) {
    const [query, setQuery] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        queryFor(query.trim() || undefined);
        setQuery(query.trim());
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <div>
            <form className='form-inline' onSubmit={handleSubmit}>
                <TextField
                    size='small'
                    className=''
                    name='query'
                    placeholder='Enter search...'
                    value={query}
                    onChange={handleChange}
                />
                <Button type='submit'>
                    Search
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;