import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar sx={{ marginBottom: '20px' }}>
        <Stack sx={{ width: '100%' }} direction="row" justifyContent="center">
          <Avatar src="/path-to-your-logo.png" alt="Company Logo" />
        </Stack>
      </Toolbar>
      <List>
        <ListItemButton>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
