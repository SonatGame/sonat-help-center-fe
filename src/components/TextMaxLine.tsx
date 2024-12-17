import { SxProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
interface ITextMaxLineProps {
  children?: ReactNode;
  line?: number;
  sx?: SxProps;
  TypographyProps?: TypographyProps;
  // show
}
const TextMaxLine = ({
  line = 2,
  children,
  sx,
  TypographyProps,
}: ITextMaxLineProps) => {
  return (
    <Typography
      sx={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        WebkitLineClamp: line,
        ...sx,
      }}
      {...TypographyProps}
    >
      {children}
    </Typography>
  );
};

export default TextMaxLine;
