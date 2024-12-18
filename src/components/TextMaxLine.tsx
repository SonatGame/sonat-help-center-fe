import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
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
  const [expanded, setExpanded] = useState(false);
  const [maxLine, setMaxLine] = useState<number | undefined>(
    withExpand ? line : undefined
  );

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
          gap={1}
          sx={{ color: theme.palette.primary.main }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="body2">
            {!expanded ? "Xem tất cả" : "Thu gọn"}
          </Typography>
          {!expanded ? <ArrowDownward /> : <ArrowUpward />}
        </Stack>
      )}
    </Box>
  );
};

export default TextMaxLine;
