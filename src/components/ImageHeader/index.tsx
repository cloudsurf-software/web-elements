import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, colors } from "@mui/material";
import StaticImageHeader from "./StaticImageHeader";
import { ImageHeaderProps } from "../../types";
import ImageCarouselHeader from "./ImageCarouselHeader";

const ImageHeader = ({
  title,
  subtitle,
  imgLogo,
  imgUrls = [],
  fontFamily = "Roboto",
  subtitleFontFamily = "Roboto",
  textColor = "white",
  subtitleTextColor = colors.grey[300],
}: ImageHeaderProps) => {
  if (imgUrls.length === 0) {
    return (
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "65vh",
          marginLeft: "-26px",
          marginRight: "-26px",
          marginTop: "-22px",
        }}
      >
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
      </Box>
    );
  } else if (imgUrls.length === 1) {
    return (
      <StaticImageHeader
        title={title}
        fontFamily={fontFamily}
        subtitleFontFamily={subtitleFontFamily}
        subtitle={subtitle}
        imgUrls={[imgUrls[0]]}
        imgLogo={imgLogo}
      />
    );
  } else if (imgUrls.length > 1) {
    return (
      <ImageCarouselHeader
        title={title}
        fontFamily={fontFamily}
        subtitleFontFamily={subtitleFontFamily}
        subtitle={subtitle}
        imgUrls={imgUrls}
        imgLogo={imgLogo}
      />
    );
  }
};

export default ImageHeader;
