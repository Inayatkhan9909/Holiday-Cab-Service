"use client"
import React, { useState } from 'react'
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,} from '@mui/material';
import LoadingComponent from '@/app/components/LoadingComponent';

const Loodd = () => {
    const [loadDialog,setloadDialog]= useState(false);
    function handle(){
setloadDialog(true);
    }
  return (
    <div className='w-full h-full'>
        
      <h1> Demo Page</h1> 
       
        <Button onClick={handle}>Load</Button>


        <Dialog open={loadDialog} onClose={() => setloadDialog(false)}
          style={{backgroundColor: 'transparent'}}
          overlayStyle={{backgroundColor: 'transparent'}}
          title= 'Loading'
          titleStyle={{paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px'}}
          >
                    
                    <DialogContent>
                       <LoadingComponent/>
                    
                    </DialogContent>

                </Dialog>


    </div>
  )
}

export default Loodd