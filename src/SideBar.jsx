import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';
import { sideBarChilds } from './common/SideBar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { Paper, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;
  const [selected, setSelected] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toolbarTitle,setTitle] = React.useState(sideBarChilds[0].title);
  let location = useLocation();
  const [currentPage,setCurrentPage]=React.useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelect = (index,title) =>{
    setSelected(index);
    setTitle(title);
  };

    React.useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

  

  const drawer = (
    <Paper sx={{ height: '100vh', bottom: 0 }} style={{ maxHeight: '100vh', overflow: 'auto' }}>
      <Toolbar>
        <Stack direction={'column'} alignItems={'center'} p={3}>
          <img src="/images/gerb.png" style={{ width: '50px', height: '50px' }} alt="gerb" />
          <Typography sx={{ width: '100%', textAlign: 'center' }} variant="body">73-nji çagalar bagy</Typography>
        </Stack>
      </Toolbar>
      <Divider />
      <List style={{ maxHeight: '100%', overflow: 'auto' }}>
        {sideBarChilds.map((sideBarChild, i) => (
          <Link to={sideBarChild.link} style={{ textDecoration: 'none', color: props.isDark ? '#FFFFFF' : '#000000' }} key={`${sideBarChild.title}___`}>
            <ListItem
              selected={currentPage==sideBarChild.link}
              onClick={() => handleSelect(i,sideBarChild.title)}
              key={sideBarChild.title}
              disablePadding>
              <ListItemButton sx={{ textDecoration: 'none' }} color="action">
                <ListItemIcon color="action">
                  {sideBarChild.icon}
                </ListItemIcon>
                <ListItemText primary={sideBarChild.title} color="action" />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const getTitle=()=>{
      return sideBarChilds.filter((item)=>{
          return item.link==currentPage;
      });

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <Stack sx={{ width: '100%' }} direction={'row'} justifyContent={'space-between'}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                {typeof getTitle()[0] === 'undefined' || getTitle()[0]== null || getTitle()[0] === ''?'Hasabat':getTitle()[0].title}
            </Typography>

            <Stack direction="row">
              <IconButton sx={{ ml: 1 }} onClick={props.changeMode} color="inherit" title="Change mode">
                {props.isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <IconButton sx={{ ml: 1 }} onClick={() => { }} color="inherit" title="Logout">
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;
