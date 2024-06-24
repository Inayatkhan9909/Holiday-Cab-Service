import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => {
  return ( 
    <div className='w-56  bg-transparent flex flex-col justify-center align-middle'>
         <CircularProgress size={34} sx={{ color: 'blue',m:'auto'  }} />
         <div className='w-18 m-auto'>loading</div>
    </div>
  )
}

export default LoadingComponent