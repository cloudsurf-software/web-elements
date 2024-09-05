import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Card, Typography, colors } from "@mui/material";
import Image from "next/image";
import { ImageHeaderProps } from "../../types";

function ImageCarouselHeader({
  title,
  subtitle,
  imgLogo,
  imgUrls = [],
  fontFamily = "Roboto",
  subtitleFontFamily = "Roboto",
  textColor = "white",
  subtitleTextColor = colors.grey[300],
}: ImageHeaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
        setCurrentPage((prevPage) => (prevPage + 1) % imgUrls.length);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextPage = (currentPage + 1) % imgUrls.length;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "65vh",
        overflow: "hidden",
        marginLeft: "-16px",
        marginRight: "-16px",
        marginTop: "-20px",
      }}
    >
      {/* Overlay Logo, Title, and Subtitle */}
      <Box
        sx={{
          position: "absolute",
          textAlign: "center",
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "25vh",
          }}
        >
          {imgLogo && imgLogo}
          <Typography variant="h4" fontFamily={fontFamily} color={textColor}>
            {title}
          </Typography>
          <Typography
            variant="h5"
            fontFamily={subtitleFontFamily}
            color={subtitleTextColor}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: `100%`, height: "100%", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            width: "200%", // 100% for each image
            height: "100%",
            position: "absolute",
            transform: `translateX(${isAnimating ? "-50%" : "0%"})`,
            transition: isAnimating ? "transform 1s ease-in-out" : "none",
          }}
          onTransitionEnd={() => {
            if (isAnimating) {
              setIsAnimating(false);
              setCurrentPage((prevPage) => (prevPage + 1) % imgUrls.length);
            }
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              position: "relative",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={imgUrls[currentPage]}
                alt="Displayed Image"
                layout="fill"
                objectFit="cover"
                style={{ filter: "brightness(35%)" }}
              />
            </Card>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              position: "relative",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={imgUrls[nextPage]}
                alt="Next Image"
                layout="fill"
                objectFit="cover"
                style={{ filter: "brightness(35%)" }}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ImageCarouselHeader;
