import Tag from "@/components/Tag";
import {
  Avatar,
  AvatarGroup,
  Box,
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
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform .2s",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
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
        <Tag>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {courseCount} bài học
          </Typography>
        </Tag>
        <Tag>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {ksa}
          </Typography>
        </Tag>
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
          {["A", "B", "C"].map((user, index) => (
            <Avatar key={index} sx={{ width: 24, height: 24 }}>
              {user}
            </Avatar>
          ))}
        </AvatarGroup>
        <Typography variant="body2" color="primary" fontWeight="medium">
          +{15} người tham gia
        </Typography>
      </Stack>
    </Card>
  );
}
