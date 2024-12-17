import StyledAccordion from "@/components/accordion";
import { ArrowForward, Verified } from "@mui/icons-material";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export default function CourseOverview() {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEnableEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <Container maxWidth="md" sx={{ py: 9 }}>
      <Stack gap={6}>
        <Stack gap={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h4">Mô tả khóa học</Typography>
            {isEditing ? (
              <Stack direction="row" gap={2}>
                <Button variant="outlined" onClick={handleCancelEdit}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleCancelEdit}>
                  Lưu
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" onClick={handleEnableEdit}>
                Chỉnh sửa
              </Button>
            )}
          </Stack>
          <Typography variant="body2">
            Become a Python Programm er and learn one of employer&apos;s most
            requested skills of 2023! This is the most comprehensive, yet
            straight-forward, course for the Python programming language on
            Udemy! Whether you have never programmed before, already know basic
            syntax, or want to learn about the advanced features of Python, this
            course is for you! In this course we will teach you Python 3. With
            over 100 lectures and more than 21 hours of video this comprehensive
            course leaves no stone unturned! This course includes quizzes,
            tests, coding exercises and homework assignments as well as 3 major
            projects to create a Python project portfolio! Learn how to use
            Python for real-world tasks, such as working with PDF Files, sending
            emails, reading Excel files, Scraping websites for informations,
            working with image files, and much more! This course will teach you
            Python in a practical manner, with every lecture comes a full coding
            screencast and a corresponding code notebook! Learn in whatever
            manner is best for you! We will start by helping you get Python i
            nstalled on your computer, regardless of your operating system,
            whether its Linux, MacOS, or Windows, we&apos;ve got you covered.
          </Typography>
        </Stack>
        <Stack gap={3}>
          <Typography variant="h4">Mục tiêu khóa học</Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Verified color="primary" fontSize="small" />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              Nắm được hệ thống kiến thức cơ bản về video
            </Typography>
            <Stack direction="row" gap={1}></Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Verified color="primary" fontSize="small" />
            <TextField placeholder="Điền thông tin" sx={{ flexGrow: 1 }} />
            <Button variant="outlined">Hủy bỏ</Button>
            <Button variant="contained">Lưu</Button>
          </Stack>
          <Button variant="outlined" sx={{ width: "fit-content" }}>
            Thêm thông tin
          </Button>
        </Stack>
        <Stack gap={3}>
          <Stack gap={1.5}>
            <Typography variant="h4">Nội dung khóa học</Typography>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{
                color: theme.palette.grey[500],
              }}
            >
              20 bài học
            </Typography>
          </Stack>
          <StyledAccordion
            summary={
              <Stack>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.grey[700],
                  }}
                >
                  Tổng quan về phần mềm Excel
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  4 bài học
                </Typography>
              </Stack>
            }
            detail={<></>}
          />
          <StyledAccordion
            summary={
              <Stack>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.grey[700],
                  }}
                >
                  Tổng quan về dữ liệu và định dạng dữ liệu Excel
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  10 bài học
                </Typography>
              </Stack>
            }
            detail={<></>}
          />
          <Button
            variant="outlined"
            endIcon={<ArrowForward fontSize="small" />}
            sx={{ width: "fit-content" }}
          >
            Thêm nội dung khóa học
          </Button>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h4">Giảng viên</Typography>
          <Typography variant="body2">
            Become a Python Programm er and learn one of employer&apos;s most
            requested skills of 2023! This is the most comprehensive, yet
            straight-forward, course for the Python programming language on
            Udemy! Whether you have never programmed before, already know basic
            syntax, or want to learn about the advanced features of Python, this
            course is for you! In this course we will teach you Python 3. With
            over 100 lectures and more than 21 hours of video this comprehensive
            course leaves no stone unturned! This course includes quizzes,
            tests, coding exercises and homework assignments as well as 3 major
            projects to create a Python project portfolio! Learn how to use
            Python for real-world tasks, such as working with PDF Files, sending
            emails, reading Excel files, Scraping websites for informations,
            working with image files, and much more! This course will teach you
            Python in a practical manner, with every lecture comes a full coding
            screencast and a corresponding code notebook! Learn in whatever
            manner is best for you! We will start by helping you get Python i
            nstalled on your computer, regardless of your operating system,
            whether its Linux, MacOS, or Windows, we&apos;ve got you covered.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
