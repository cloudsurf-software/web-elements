import React from "react";
import {
  Box,
  colors,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavDrawerProps, NavItem } from "../../types";
import { useRouter } from "next/router";

function NavDrawer({
  toggleDrawer,
  drawerOpen,
  isTablet,
  isPhone,
  navItems,
  extraNavItems = [],
  primaryColor = colors.indigo[700],
  primaryHoverColor = colors.indigo[700],
  iconComponent = <></>,
  backgroundColor = colors.grey[300],
  textColor = colors.grey[900],
  selectedTextColor = colors.grey[900],
  iconColor = colors.grey[800],
}: NavDrawerProps) {
  const router = useRouter();

  const onClickMenuItem = (page: NavItem) => {
    if (isTablet) {
      toggleDrawer(false);
    }
    router.push(page.route);
  };

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
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Box
        sx={{
          width: isTablet ? (isPhone ? "50vw" : "30vw") : "250px",

          marginTop: isTablet ? 1 : 0,
        }}
        role="presentation"
      >
        {isTablet && (
          <Box sx={{ marginLeft: 1, marginBottom: 1 }}>{iconComponent}</Box>
        )}
        <List>
          {navItems?.map((page: NavItem, index) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: "0px", // Rounded right side
                  backgroundColor:
                    router.pathname === page.route
                      ? primaryColor
                      : "transparent",
                  color:
                    router.pathname === page.route
                      ? selectedTextColor
                      : textColor,

                  // router.pathname === page.route ? "primary.main" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      router.pathname === page.route
                        ? primaryHoverColor
                        : primaryHoverColor,
                    color: selectedTextColor,
                  },
                }}
                onClick={() => onClickMenuItem(page)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          {extraNavItems?.map((item, index) => (
            <ListItem key={index} disablePadding>
              {item}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default NavDrawer;
