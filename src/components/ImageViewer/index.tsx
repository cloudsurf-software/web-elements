import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import TruncatedText from "../TruncatedText";
import { ImageViewerProps } from "../../types/ImageViewer.types";

const ImageViewer: React.FC<ImageViewerProps> = ({
  isVisible,
  setIsVisible,
  photoUrl,
  altText = "Image",
  title = "Image Viewer",
  description = "",
}) => {
  const windowDimenstions = useWindowDimensions();
  const imgRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [dragging, setDragging] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const [initialDistance, setInitialDistance] = useState<number | null>(null); // Track pinch distance
  const [initialScale, setInitialScale] = useState(1); // Track scale when pinch started

  // Add/remove class to body to prevent scrolling when image viewer is open
  useEffect(() => {
    const body = document.querySelector("body");
    if (isVisible && document?.body) {
      document.body.style.overflow = "hidden";
    } else if (!isVisible && body) {
      document.body.style.overflow = "unset";
    }

    if (document?.body) {
      // Cleanup on unmount
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isVisible]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent scroll
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(1, scale + delta), 5); // Limit scale between 1 and 5
    setScale(newScale);

    // Update transform origin based on mouse position
    const rect = imgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100 + "%";
      const y = ((e.clientY - rect.top) / rect.height) * 100 + "%";
      setOrigin({ x, y });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent scroll
    setDragging(true);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      lastPosition.current = { x: e.clientX, y: e.clientY };
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      lastPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      // Pinch to zoom start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setInitialDistance(distance);
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && dragging) {
      e.preventDefault();
      e.stopPropagation();
      const dx = e.touches[0].clientX - lastPosition.current.x;
      const dy = e.touches[0].clientY - lastPosition.current.y;
      lastPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2 && initialDistance) {
      // Handle pinch to zoom
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = newDistance / initialDistance;
      const newScale = Math.min(Math.max(1, initialScale * scaleFactor), 5); // Limit scale between 1 and 5
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  const handleClose = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setOrigin({ x: "50%", y: "50%" });
    setIsVisible(false);
  };

  return (
    <Dialog
      fullScreen
      open={isVisible}
      onClose={handleClose}
      hideBackdrop={true}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6" sx={{ flex: 1 }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ flex: 1 }}>
                <TruncatedText
                  text={description}
                  truncateBy="width"
                  width={windowDimenstions.width - 100}
                />
              </Typography>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          touchAction: "none",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 8,
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={imgRef}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: `${origin.x} ${origin.y}`,
            transition: dragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          <Image
            src={photoUrl}
            alt={altText}
            fill
            priority
            unoptimized
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImageViewer;
