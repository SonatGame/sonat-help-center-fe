import { Link, LinkProps, Typography, TypographyProps } from "@mui/material";
import { forwardRef } from "react";
interface ITextMaxLineProps {
  asLink?: boolean;
  children?: React.ReactNode;
  line: number;
  sx?: any;
  TextMaxLineProps?: LinkProps & TypographyProps;
}
const TextMaxLine = forwardRef(
  (
    { asLink, line = 2, children, sx, TextMaxLineProps }: ITextMaxLineProps,
    ref: any
  ) => {
    const style = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: line,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-word",
      ...sx,
    };

    if (asLink) {
      return (
        <Link ref={ref} color="inherit" sx={{ ...style }} {...TextMaxLineProps}>
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} sx={{ ...style }} {...TextMaxLineProps}>
        {children}
      </Typography>
    );
  }
);

TextMaxLine.displayName = "TextMaxLine";
export default TextMaxLine;
