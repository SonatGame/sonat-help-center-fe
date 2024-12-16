import { Button, Stack, Typography, useTheme } from "@mui/material";

interface IProps {
  name: string;
  time: string;
}

export default function ClubItem({ name, time }: IProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 2 }}
    >
      <Stack gap={1}>
        <Typography fontWeight="bold" color="primary">
          {name}
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {time}
        </Typography>
      </Stack>
      <Button
        sx={{
          backgroundColor: theme.palette.primary[50],
        }}
      >
        Đăng ký
      </Button>
    </Stack>
  );
}
