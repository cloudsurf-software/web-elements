export type TruncatedTextProps =
  | {
      text: string;
      truncateBy?: "chars";
      maxLength: number;
      numLines?: never;
      width?: never;
    }
  | {
      text: string;
      truncateBy: "lines";
      numLines: number;
      maxLength?: never;
      width?: never;
    }
  | {
      text: string;
      truncateBy: "width";
      width: number | string;
      maxLength?: never;
      numLines?: never;
    }
  | {
      text: string;
      truncateBy?: never;
      maxLength?: never;
      numLines?: never;
      width?: never;
    };
