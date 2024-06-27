import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({ search, setSearch }) => {
    return (
        <TextField
            placeholder="ابحث عن الفرصة التدريبية...."
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                            <SearchIcon style={{ color: '#66cdaa' }} />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            style={{ width: '50%', minHeight: '100px', marginTop: '55px', marginRight: '400px', borderColor: '#66cdaa', borderWidth: '20px' }}
        />
    );
};

export default SearchField;

