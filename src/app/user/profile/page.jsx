 "use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const page = () => {
    const submitLogout = async (req,res) =>{

    }
    return (
        <Stack spacing={2} direction="row" margin="55px 59px">

            <Button
                variant="contained"
                onClick={submitLogout}
            >
                Contained
            </Button>

        </Stack>
    )
}

export default page