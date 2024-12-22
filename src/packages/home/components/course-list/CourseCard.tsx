import Tag from "@/components/Tag";
import TextMaxLine from "@/components/TextMaxLine";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Course } from "@/lib/types/course";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ICourseCardProps {
  courseData: Course;
}

export default function CourseCard({ courseData }: ICourseCardProps) {
  const { team, _id, thumbnailUrl, KSA, title, description, modules } =
    courseData;
  const router = useRouter();

  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        // transition: "transform .2s",
        // ":hover": {
        //   transform: "scale(1.05)",
        // },
      }}
      onClick={() => router.push(`${AppRoutes.COURSE}${_id}`)}
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
          src={thumbnailUrl}
          alt="course-thumbnail"
          width={600}
          height={248}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Tag>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {modules.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.lessons.length,
              0
            )}
            &nbsp; bài học
          </Typography>
        </Tag>
        <Tag>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {KSA}
          </Typography>
        </Tag>
      </Stack>
      <TextMaxLine
        TypographyProps={{
          variant: "h6",
        }}
        sx={{
          mt: 1.5,
        }}
      >
        {title}
      </TextMaxLine>
      <TextMaxLine
        TypographyProps={{
          variant: "body2",
        }}
        sx={{
          mt: 1.5,
          flexGrow: 1,
        }}
      >
        {description}
      </TextMaxLine>
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
