"use client"
import React, { Fragment, useState } from "react";
import { Box, Tab, Tabs,  useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import AddProduct from "../AddProduct/AddProduct";
import SaleChart from "../chart/SaleChart";
import OrderList from "../Order/OrderList";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className=""
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };
  const isNonMobileScreens = useMediaQuery("(min-width:900px)")

  return (
    <Fragment>
      <Box sx={{ width: isNonMobileScreens?"60%":"100%" ,bgcolor:""}} >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
           
          >
            <Tab
              
              sx={{color:"black" }}
              label="Sales Graph"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ color:"black" }}
              label="Add Product"
              {...a11yProps(1)}
            />
            <Tab 
            label="Orders" 
            {...a11yProps(2)} 
            sx={{ color:"black" }}
            /> 
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SaleChart />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddProduct/>
        </CustomTabPanel>
       <CustomTabPanel value={value} index={2}>
        <OrderList />
      </CustomTabPanel> 
      </Box>
    </Fragment>
  );
};

export default TabPanel;
