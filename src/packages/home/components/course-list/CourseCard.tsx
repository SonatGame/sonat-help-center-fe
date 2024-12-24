import Tag from "@/components/Tag";
import TextMaxLine from "@/components/TextMaxLine";
import { BookClosedIcon, PeopleIcon } from "@/lib/constants/icons";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Course } from "@/lib/types/course";
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
import { useRouter } from "next/navigation";

export interface ICourseCardProps {
  courseData: Course;
}

export default function CourseCard({ courseData }: ICourseCardProps) {
  const {
    team,
    _id,
    thumbnail,
    KSA,
    title,
    description,
    modules,
    learnersCount,
  } = courseData;
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
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
            {modules?.reduce(
              (accumulator, currentValue) =>
                accumulator + (currentValue.lessons?.length ?? 0),
              0
            ) ?? 0}
            &nbsp;bài học
          </Typography>
        </Tag>
        <Tag>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <BookClosedIcon fontSize="small" />
            <Typography variant="body2" color="primary" fontWeight="medium">
              {KSA}
            </Typography>
          </Stack>
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
        {learnersCount === 0 ? (
          <>
            <AvatarGroup
              spacing={8}
              sx={{
                "& .MuiAvatar-root": {
                  border: 0,
                },
              }}
            >
              {["A", "B", "C"].map((user, index) => (
                <Avatar key={index} sx={{ width: 24, height: 24 }}>
                  {user}
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="body2" color="primary" fontWeight="medium">
              +{learnersCount} người tham gia
            </Typography>
          </>
        ) : (
          <>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: theme.palette.grey[200],
              }}
            >
              <PeopleIcon sx={{ fontSize: 16 }} />
            </Stack>
            <Typography variant="body2" color="primary" fontWeight="medium">
              Chưa có người tham gia
            </Typography>
          </>
        )}
      </Stack>
    </Card>
  );
}
