import React, { ReactNode, useEffect } from "react";
import styled from "@emotion/styled";
import Footer from "../Footer";
import TopBar from "../Nav/TopBar";
import { colors } from "@mui/material";
import NavDrawer from "../Nav/NavDrawer";
import { LayoutProps, NavItem } from "../../types";

const MainContainer = styled.div<{
  startColor?: string;
  endColor?: string;
  isScrollable?: boolean;
  open?: boolean;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
}>`
  padding: 20px 16px 40px 16px;
  height: 100%;
  min-height: 100vh;
  transition: margin-left 0.3s;
  margin-top: 55px;
  margin-bottom: 100px; // distance including footer
  border-radius: ${(props) => props.borderRadius};
  margin-left: ${(props) => (props.open && !props.isTablet ? "250px" : "0")};
  background: linear-gradient(
    ${(props) => props.startColor},
    ${(props) => props.endColor}
  );
`;

export default function Layout({
  startColor,
  endColor,
  backgroundColor = colors.grey[300],
  children,
  isScrollable,
  isDrawerOpen,
  handleToggleDrawer,
  navItems,
  logoImg,
  isTablet = false,
  isPhone = false,
  borderRadius = "0px",
}: LayoutProps) {
  const toggleDrawer = (open: boolean) => {
    console.log("toggleDrawer start", open, "before:", isDrawerOpen);
    handleToggleDrawer(open);
    console.log("toggleDrawer finish", open, "before:", isDrawerOpen);
  };
  return (
    <main
      style={
        isScrollable
          ? {
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: backgroundColor,
              padding: 10,
              position: "relative", // Needed for absolute positioning of the footer
              width: "100%",
            }
          : {
              height: "100vh",
              overflow: "hidden",
              backgroundColor: backgroundColor,
              padding: 10,
              position: "relative", // Needed for absolute positioning of the footer
              width: "100%",
            }
      }
    >
      <TopBar
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        logoImg={logoImg}
        isTablet={isTablet}
      />

      <NavDrawer
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        isTablet={isTablet}
        isPhone={isPhone}
        navItems={navItems}
      />
      <MainContainer
        startColor={startColor ?? colors.grey[200]}
        endColor={endColor ?? colors.grey[200]}
        open={isDrawerOpen}
        isScrollable={isScrollable}
        isTablet={isTablet}
        isPhone={isPhone}
        borderRadius={borderRadius}
      >
        {children}
      </MainContainer>
      <Footer
        logoImg={logoImg}
        isDrawerOpen={isDrawerOpen}
        isPhone={isPhone}
        isTablet={isTablet}
        borderRadius={borderRadius}
      />
    </main>
  );
}
