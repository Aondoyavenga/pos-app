import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const DrawerList = ({ func,icon, title }) => {
  return (
        <Box sx={{ width: '100%', maxWidth: 360,}}
            className='bg-white text-pos_color'
        >
        <nav aria-label="main mailbox folders">
            {
            
                <div
                    onClick={() =>func()}
                    className='hover:text-pos_color-green'
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText 
                        className='md:-ml-5'
                        primary={
                            <p className='text-xs'>{title}</p>
                        } />
                        </ListItemButton>
                    </ListItem>
                </div>
            
            }
        </nav>
        
        </Box>
    );
}

export default DrawerList
