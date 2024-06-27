import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School'; 
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../../../contexts/AuthContext';


const drawerWidth = 240;

function PersistentDrawer(props) {
  const {signOut}= useAuthContext()
  const Navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const openProfile = () =>{
    Navigate('/view-student-profile')
  }

  const openTest = () =>{
    Navigate('/profile')
  }

  const ClickHandleResume = () =>{
    Navigate('/resume')
  }

  const ClickHandleViewRequests= () =>{
    Navigate('/view-requests')
  }

  const drawer = (
    <div>
      <Divider />
      <List sx={{ textAlign: 'center' }}>
        <Typography textAlign='center' variant="h6" noWrap sx={{ mt: 2 }}>
          الملف الشخصي
        </Typography>

        <ListItem disablePadding>
          <ListItemButton onClick={openProfile}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText sx={{ textAlign:"start" }} primary="مشاهدة الملف الشخصي" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton onClick={openTest}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText sx={{ textAlign:"start" }} primary="المعلومات الشخصية" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={ClickHandleResume}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText sx={{ textAlign:"start" }} primary="السيرة الذاتية" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={ClickHandleViewRequests}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText sx={{ textAlign:"start" }} primary="الطلبات المقدمة" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText sx={{ textAlign:"start" }} primary="مساعدك الشخصي" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DescriptionOutlinedIcon />
            </ListItemIcon>
            <ListItemText  sx={{ textAlign:"start" }} primary="التدريب الالكتروني" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText 
            sx={{ textAlign:"start" }}
            primary="تسجيل الخروج" 
            style={{fontFamily: 'Tajawal'}}
            onClick={(e)=>{
              signOut();
            }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Toolbar />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(!open)}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#efefef', // Change the drawer background color here
            fontFamily: 'Tajawal, sans-serif', 
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

PersistentDrawer.propTypes = {
  window: PropTypes.func,
};

export default PersistentDrawer;


