import React from "react";
import Box from "@mui/material/Box";
import { Card, colors, Typography } from "@mui/material";
import Image from "next/image";
import { ImageHeaderProps } from "../../types";

const StaticImageHeader = ({
  title,
  subtitle,
  imgLogo,
  imgUrls = [],
  fontFamily = "Roboto",
  subtitleFontFamily = "Roboto",
  textColor = "white",
  subtitleTextColor = colors.grey[300],
}: ImageHeaderProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "65vh",
        marginLeft: "-16px",
        marginRight: "-16px",
        marginTop: "-20px",
      }}
    >
      {/* Overlay Logo, Title, and Subtitle */}

      <Box
        sx={{
          height: "25vh",
          position: "absolute",
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {imgLogo && imgLogo}

        {title && (
          <Typography variant="h4" fontFamily={fontFamily} color={textColor}>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="h5"
            fontFamily={subtitleFontFamily}
            color={subtitleTextColor}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: `100%`, height: "100%" }}>
        <Box
          key={`card-1`}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <Card
            sx={{
              width: "auto",
              height: "50vh",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={imgUrls[0]}
              alt="Displayed Image"
              fill
              style={{ objectFit: "cover", filter: "brightness(35%)" }}
              // layout="fill"
              // objectFit="cover"
              // style={{ filter: "brightness(35%)" }}
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default StaticImageHeader;
