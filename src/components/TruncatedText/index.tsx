import React from "react";
import { Box } from "@mui/material";
import { TruncatedTextProps } from "../../types/TruncatedText.types";

// type TruncatedTextProps =
//   | {
//       text: string;
//       truncateBy?: "chars";
//       maxLength: number;
//       numLines?: never;
//       width?: never;
//     }
//   | {
//       text: string;
//       truncateBy: "lines";
//       numLines: number;
//       maxLength?: never;
//       width?: never;
//     }
//   | {
//       text: string;
//       truncateBy: "width";
//       width: number | string;
//       maxLength?: never;
//       numLines?: never;
//     }
//   | {
//       text: string;
//       truncateBy?: never;
//       maxLength?: never;
//       numLines?: never;
//       width?: never;
//     };

const TruncatedText: React.FC<TruncatedTextProps> = (props) => {
  const { text } = props;

  if (props.truncateBy === "chars" || props.truncateBy === undefined) {
    // Truncate by characters
    const { maxLength } = props;
    if (maxLength === undefined) {
      console.warn('maxLength prop is required when truncateBy is "chars".');
      return <span>{text}</span>;
    }

    const truncated =
      text.length > maxLength ? text.substring(0, maxLength) + "…" : text;

    return <span>{truncated}</span>;
  } else if (props.truncateBy === "lines") {
    // Truncate by lines
    const { numLines } = props;
    if (numLines === undefined) {
      console.warn('numLines prop is required when truncateBy is "lines".');
      return <span>{text}</span>;
    }

    return (
      <Box
        sx={{
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: numLines,
        }}
      >
        {text}
      </Box>
    );
  } else if (props.truncateBy === "width") {
    // Truncate by width
    const { width } = props;
    if (width === undefined) {
      console.warn('width prop is required when truncateBy is "width".');
      return <span>{text}</span>;
    }

    return (
      <Box
        sx={{
          width,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Box>
    );
  } else {
    // Default case, render text as is
    return <span>{text}</span>;
  }
};

export default TruncatedText;
