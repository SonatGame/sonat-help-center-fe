import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function CourseOverview() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEnableEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return (
    <Container>
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
          Become a Python Programm er and learn one of employer's most requested
          skills of 2023! This is the most comprehensive, yet straight-forward,
          course for the Python programming language on Udemy! Whether you have
          never programmed before, already know basic syntax, or want to learn
          about the advanced features of Python, this course is for you! In this
          course we will teach you Python 3. With over 100 lectures and more
          than 21 hours of video this comprehensive course leaves no stone
          unturned! This course includes quizzes, tests, coding exercises and
          homework assignments as well as 3 major projects to create a Python
          project portfolio! Learn how to use Python for real-world tasks, such
          as working with PDF Files, sending emails, reading Excel files,
          Scraping websites for informations, working with image files, and much
          more! This course will teach you Python in a practical manner, with
          every lecture comes a full coding screencast and a corresponding code
          notebook! Learn in whatever manner is best for you! We will start by
          helping you get Python i nstalled on your computer, regardless of your
          operating system, whether its Linux, MacOS, or Windows, we've got you
          covered.
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="h4">Mục tiêu khóa học</Typography>
      </Stack>
      <Stack>
        <Typography variant="h4">Nội dung khóa học</Typography>
      </Stack>
      <Stack>
        <Typography variant="h4">Giảng viên</Typography>
      </Stack>
    </Container>
  );
}
