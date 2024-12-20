import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Stack,
  SxProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";
interface ITextMaxLineProps {
  children?: ReactNode;
  line?: number;
  sx?: SxProps;
  TypographyProps?: TypographyProps;
  withExpand?: boolean;
}
const TextMaxLine = ({
  line = 2,
  children,
  sx,
  TypographyProps,
  withExpand,
}: ITextMaxLineProps) => {
  const theme = useTheme();
  const [maxLine, setMaxLine] = useState<number | undefined>(line);

  return (
    <Box>
      <Typography
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          WebkitLineClamp: maxLine,
          ...sx,
        }}
        {...TypographyProps}
      >
        {children}
      </Typography>
      {withExpand && (
        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{
            mt: 1,
            color: theme.palette.primary.main,
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            setMaxLine(maxLine ? undefined : line);
          }}
        >
          <Typography variant="body2">
            {maxLine ? "Xem tất cả" : "Thu gọn"}
          </Typography>
          {maxLine ? <ExpandMore /> : <ExpandLess />}
        </Stack>
      )}
    </Box>
  );
};

export default TextMaxLine;
