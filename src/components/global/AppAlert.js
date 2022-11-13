import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { XIcon } from '@heroicons/react/outline';


const TransitionAlerts = ({message, success, Error, open, setOpen}) =>{
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <XIcon className='w-6 h-6' />
            </IconButton>
          }
          sx={{ mb: 2 }}
          className={`${success? 'bg-pos_color-green text-white shadow': Error ? 'bg-red-500 text-white shadow' : ''}`}
        >
         {message}
        </Alert>
      </Collapse>
      
    </Box>
  );
}

export default TransitionAlerts