import Tag from "@/components/Tag";
import TextMaxLine from "@/components/TextMaxLine";
import {
  BIIcon,
  BookClosedIcon,
  CareIcon,
  MarketingIcon,
  PeopleIcon,
  ProductIcon,
} from "@/lib/constants/icons";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Course, Team } from "@/lib/types/course";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export interface ICourseCardProps {
  courseData: Course;
}

export default function CourseCard({ courseData }: ICourseCardProps) {
  const { team, _id, coverImage, KSA, title, learnersCount, totalLessons } =
    courseData;
  const theme = useTheme();
  const router = useRouter();

  const teamData = useMemo(() => {
    const teamDataMap = {
      [Team.Care]: {
        color: theme.palette.bring_pink.main,
        icon: <CareIcon fontSize="small" />,
      },
      [Team["Business Intelligent"]]: {
        color: theme.palette.primary.main,
        icon: <BIIcon fontSize="small" />,
      },
      [Team.Marketing]: {
        color: theme.palette.warning.main,
        icon: <MarketingIcon fontSize="small" />,
      },
      [Team.Product]: {
        color: theme.palette.success.main,
        icon: <ProductIcon fontSize="small" />,
      },
    };
    return teamDataMap[team];
  }, [team]);

  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => router.push(`${AppRoutes.COURSE}${_id}?tab=overview`)}
    >
      <Stack direction="row" spacing={0.5}>
        {teamData.icon}
        <Typography
          variant="body2"
          fontWeight="medium"
          sx={{ color: teamData.color }}
        >
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
          src={coverImage}
          alt="course-coverImage"
          width={600}
          height={157}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Tag>
          <Typography variant="body2" color="primary" fontWeight="medium">
            {totalLessons}
            &nbsp;bài học
          </Typography>
        </Tag>
        <Tag>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <BookClosedIcon
              fontSize="small"
              sx={{ color: theme.palette.primary.main }}
            />
            <Typography variant="body2" color="primary" fontWeight="medium">
              {KSA}
            </Typography>
          </Stack>
        </Tag>
      </Stack>
      <Tooltip placement="top" title={title}>
        <Box>
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
        </Box>
      </Tooltip>

      <Stack
        direction="row"
        alignItems="end"
        gap={0.5}
        sx={{ mt: 1.5, flexGrow: 1 }}
      >
        {learnersCount !== 0 ? (
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
