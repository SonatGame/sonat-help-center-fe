import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";

export interface ICourseCardProps {
  team: string;
  thumbnail: string;
  courseCount: number;
  ksa: string;
  title: string;
  description: string;
}

export default function CourseCard(props: ICourseCardProps) {
  const { team, thumbnail, courseCount, ksa, title, description } = props;
  const theme = useTheme();

  return (
    <Card
      sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" color="primary" fontWeight="medium">
          {team}
        </Typography>
      </Stack>
      <Box
        sx={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          mt: 1.5,
          overflow: "hidden",
        }}
      >
        <Image
          src={thumbnail}
          alt="course-thumbnail"
          width={600}
          height={248}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            backgroundColor: theme.palette.primary[50],
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="primary" fontWeight="medium">
            {courseCount} bài học
          </Typography>
        </Box>
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            backgroundColor: theme.palette.primary[50],
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="primary" fontWeight="medium">
            {ksa}
          </Typography>
        </Box>
      </Stack>
      <Typography
        variant="h6"
        sx={{
          mt: 1.5,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          WebkitLineClamp: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 1.5,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          WebkitLineClamp: 2,
          flexGrow: 1,
        }}
      >
        {description}
      </Typography>
      <Stack direction="row" alignItems="center" gap={0.5} sx={{ mt: 1.5 }}>
        <AvatarGroup spacing={8}>
          {["A", "B", "C"].map((user) => (
            <Avatar sx={{ width: 24, height: 24 }}>{user}</Avatar>
          ))}
        </AvatarGroup>
        <Typography variant="body2" color="primary" fontWeight="medium">
          +{15} người tham gia
        </Typography>
      </Stack>
      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        sx={{ mt: 3, width: "fit-content" }}
      >
        Tham gia
      </Button>
    </Card>
  );
}
