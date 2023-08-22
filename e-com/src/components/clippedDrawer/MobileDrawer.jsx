"use client"
import * as React from 'react';

import {Box ,Drawer,Button,List, Divider,ListItem,ListItemButton,ListItemIcon,ListItemText,} from "@mui/material"
import {AiOutlineLaptop} from "react-icons/ai"


import {AiOutlineMenu} from "react-icons/ai"
import {styled} from "@mui/material";
import { BsMessenger } from 'react-icons/bs';
import {ImMan,ImWoman} from "react-icons/im"
import {MdOutlineSoupKitchen,MdChildFriendly} from "react-icons/md"

import {AiOutlineLogout} from "react-icons/ai"
import {GoPersonFill} from "react-icons/go"

const bottomicons = [
  <GoPersonFill className='text-[30px] text-[black]'/>,
  <AiOutlineLogout className='text-[30px] text-[black]'/>
]
const menuicons = [
<ImMan className='text-[30px] text-[black]'/>,
<ImWoman className='text-[30px] text-[black]' />,
<MdChildFriendly className='text-[30px] text-[black]'/>,
<AiOutlineLaptop className='text-[30px] text-[black]'/>,
<MdOutlineSoupKitchen className='text-[30px] text-[black]'/>]
export default function MobileDrawer() {
  const [state, setState] = React.useState({
    left: false,
  
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 ,
      height:"100vh",
     
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between"

    }}
    
    role="presentation"

      
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Men', 'Women', 'Kids', 'Electronics',"Kitchen"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {menuicons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <List>
        {['Profile','Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {bottomicons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> 
    </Box>
  );
  const anchor = 'left'

  return (
    <div>
    
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} ><AiOutlineMenu className='text-[40px] text-[black]' /></Button>
          <Drawer
            PaperProps={{
            sx: {
              backgroundColor: "",
             
            }
          }} 
          
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
