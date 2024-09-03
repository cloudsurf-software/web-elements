import React from "react";
import { Drawer } from "@mui/material";
import DrawerList from "./DrawerList";
import { NavDrawerProps } from "../../types";

function NavDrawer({
  toggleDrawer,
  drawerOpen,
  isTablet,
  isPhone,
  navItems,
}: NavDrawerProps) {
  return (
    <Drawer
      elevation={0}
      variant={isTablet ? "temporary" : "persistent"}
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          borderRight: "none !important",
          marginTop: isTablet ? "0px" : "55px",
          width: isTablet ? (isPhone ? "50vw" : "30vw") : "250px",
        },
      }}
    >
      <DrawerList
        toggleDrawer={toggleDrawer}
        isTablet={isTablet}
        isPhone={isPhone}
        navItems={navItems}
      />
    </Drawer>
  );
}

export default NavDrawer;
