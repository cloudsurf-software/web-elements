import React from "react";
import styled from "@emotion/styled";
import { Box, colors, Link, Typography } from "@mui/material";
// import moment from "moment";
// import { useSelector } from "react-redux";
// import { selectColorsByTheme, selectNavOpen } from "@/redux/settingsSlice";
// import Logo from "../Logo";
import { FooterProps } from "../../types";

const FooterContainer = styled.footer<{
  backgroundColor: string;
  open: boolean;
  isTablet?: boolean;
  isPhone?: boolean;
  borderRadius?: string;
}>`
  position: absolute; // Changed from fixed to absolute
  bottom: 0;
  height: 200px;
  background-color: ${(props) => props.backgroundColor};
  z-index: 1000;
  transition: margin-left 0.3s;
  margin-left: ${(props) => (props.open && !props.isTablet ? "250px" : "0")};
  width: calc(
    100% - 18px -
      ${(props) => (props.open && !props.isTablet ? "250px" : "0px")}
  );

  border-top-left-radius: ${(props) => props.borderRadius};
  border-top-right-radius: ${(props) => props.borderRadius};
`;

export default function Footer({
  logoImg,
  isDrawerOpen,
  backgroundColor = colors.grey[200],
  textColor = colors.grey[900],
  isTablet = false,
  isPhone = false,
  borderRadius = "0px",
  companyName = "CloudSurf Software",
  showPoweredBy = true,
}: FooterProps) {
  return (
    <FooterContainer
      backgroundColor={backgroundColor}
      open={isDrawerOpen}
      isTablet={isTablet}
      isPhone={isPhone}
      borderRadius={borderRadius}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "8px 0",
        }}
      >
        {logoImg && logoImg}

        <Typography
          variant={"subtitle2"}
          sx={{ textAlign: "center", color: textColor }}
          color={textColor}
          mt={3}
        >
          &copy; {new Date().getFullYear()} {companyName}
        </Typography>
        {showPoweredBy && (
          <Link
            href="https://cloudsurfsoftware.com"
            target="_blank"
            sx={{
              color: colors.blue[700],
              ":hover": {
                color: colors.blue[500],
              },
            }}
          >
            Powered by CloudSurf
          </Link>
        )}
      </Box>
    </FooterContainer>
  );
}
