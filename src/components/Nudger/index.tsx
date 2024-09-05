import React, { ReactNode } from "react";
import { Box, colors, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NudgerBoxProps, NudgerProps } from "../../types";

const NudgerBox = ({
  img,
  title,
  description,
  link,
  backgroundColor = "white",
  backgroundHoverColor = colors.grey[300],
  textColor = "black",
  secondaryTextColor = colors.grey[300],
  primaryColor = colors.blue[500],
  buttonIconColor = "white",
  fontFamily = "Roboto",
  isTablet = false,
  isPhone = false,
}: NudgerBoxProps) => {
  const router = useRouter();

  const redirect = (url: string) => {
    router.push(url);
  };

  return (
    <Box
      onClick={() => redirect(link)}
      sx={{
        display: "flex",
        flex: isTablet ? "1 1 100%" : "1 1 25%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        pt: 3,
        px: 3,
        borderRadius: "15px",
        mb: 1,
        boxShadow:
          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "&:hover": {
          backgroundColor: backgroundHoverColor,
          cursor: "pointer",
          color: textColor,
          boxShadow:
            "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
          "& .MuiTypography-root": {
            color: textColor,
          },
          "& .MuiIconButton-root": {
            backgroundColor: primaryColor,
          },
        },
      }}
    >
      <IconButton
        sx={{
          backgroundColor: textColor,
          color: buttonIconColor,
          padding: 2,
          mb: 3,
          "&:hover": { backgroundColor: primaryColor },
        }}
      >
        {img}
      </IconButton>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="h3"
          fontSize={isTablet ? (isPhone ? "1.5em" : "2em") : "2.1em"}
          fontFamily={fontFamily}
          fontWeight={"bold"}
          pb={2}
          alignSelf={"center"}
          sx={{
            transition: "color 0.3s",
            "&:hover": { color: textColor },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body1"
          fontSize={isTablet ? (isPhone ? "1em" : "1.2em") : "1.2em"}
          color={secondaryTextColor}
          fontFamily={fontFamily}
          fontWeight={"regular"}
          maxWidth={300}
          sx={{ mb: 3 }}
          textAlign={"left"}
          // ml={3}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const Nudger = ({
  items,
  isTablet,
  isPhone,
  fontFamily = "Roboto",
  backgroundColor = colors.grey[300],
  backgroundHoverColor = colors.grey[300],
  textColor = "black",
  secondaryTextColor = colors.grey[800],
  primaryColor = colors.blue[500],
  buttonIconColor = "white",
  headerTitle = "Want to Learn More?",
}: NudgerProps) => {
  const router = useRouter();
  console.log("current route:", router.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        textAlign: "center",
        padding: isTablet ? (isPhone ? 0 : 3) : 3,
        mt: 8,
        mb: 8,
      }}
    >
      <Box sx={{ marginX: isTablet ? (isPhone ? 1 : 3) : 20, mb: 7 }}>
        <Typography
          variant="h2"
          fontSize={isTablet ? (isPhone ? "1.2em" : "2.2em") : "3em"}
          fontFamily={fontFamily}
          fontWeight={"bold"}
          pb={2}
          alignSelf={"center"}
        >
          {headerTitle}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        {items?.map((item, index) =>
          router.pathname !== item.route ? (
            <NudgerBox
              key={index}
              title={item.title}
              description={item.description}
              img={item.imgComponent}
              link={item.route}
              backgroundColor={backgroundColor}
              backgroundHoverColor={backgroundHoverColor}
              textColor={textColor}
              secondaryTextColor={secondaryTextColor}
              primaryColor={primaryColor}
              buttonIconColor={buttonIconColor}
              fontFamily={fontFamily}
              isTablet={isTablet}
              isPhone={isPhone}
            />
          ) : (
            <></>
          )
        )}
      </Box>
    </Box>
  );
};

export default Nudger;
