import { Grid2, Stack } from "@mui/material";
import BookList from "./components/book-list";
import CourseList from "./components/course-list";
import EventCard from "./components/event-card";

export default function HomeSection() {
  return (
    <Grid2 container p={4} spacing={3}>
      <Grid2 size={{ xs: 12, lg: "grow" }}>
        <Stack spacing={3}>
          <CourseList />
          <BookList />
        </Stack>
      </Grid2>
      <Grid2 sx={{ width: 420 }}>
        <Stack spacing={3}>
          <EventCard />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
