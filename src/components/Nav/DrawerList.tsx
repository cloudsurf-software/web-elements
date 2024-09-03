import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { colors } from "@mui/material";
import { DrawerListProps, NavItem } from "../../types";

function DrawerList({
  navItems,
  toggleDrawer,
  isTablet,
  isPhone,
  primaryColor = colors.indigo[700],
  primaryHoverColor = colors.indigo[900],
}: DrawerListProps) {
  const router = useRouter();

  const onClickMenuItem = (page: NavItem) => {
    if (isTablet) {
      toggleDrawer(false);
    }
    router.push(page.route);
  };

  return (
    <Box
      sx={{
        width: isTablet ? (isPhone ? "50vw" : "30vw") : "250px",

        marginTop: isTablet ? 3 : 0,
      }}
      role="presentation"
    >
      <List sx={{ marginRight: isTablet ? 1 : 0 }}>
        {navItems?.map((page: NavItem, index) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: "0 25px 25px 0", // Rounded right side
                backgroundColor:
                  router.pathname === page.route ? primaryColor : "transparent",
                color:
                  router.pathname === page.route ? "primary.main" : "inherit",
                "&:hover": {
                  backgroundColor:
                    router.pathname === page.route
                      ? primaryHoverColor
                      : primaryHoverColor,
                  color: "primary.main",
                },
              }}
              onClick={() => onClickMenuItem(page)}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
}

export default DrawerList;
