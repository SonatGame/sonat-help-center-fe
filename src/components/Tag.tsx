import { Box, useTheme } from "@mui/material";

interface ITagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: ITagProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        backgroundColor: theme.palette.primary[50],
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  );
}
