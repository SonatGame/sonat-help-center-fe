import { Grid2, Stack, Typography } from "@mui/material";
import BookCard from "./BookCard";

export interface IBookListProps {
  team: string;
}

export default function BookList() {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Thư viện</Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Xem thêm
        </Typography>
      </Stack>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <BookCard
            thumbnail="/assets/img/sample_book.jpg"
            title="Nghệ thuật thiết kế game"
            author="Jesse Schell"
            available
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <BookCard
            thumbnail="/assets/img/sample_book.jpg"
            title="Người giỏi không phải là người làm tất cả"
            author="Donna M. Genett"
            available
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <BookCard
            thumbnail="/assets/img/sample_book.jpg"
            title="Bàn về ham muốn"
            author="William B.Irvine"
            available={false}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, xl: 4 }}>
          <BookCard
            thumbnail="/assets/img/sample_book.jpg"
            title="Thói Quen Nguyên Tử – Atomic Habits"
            author="James Clear"
            available={false}
          />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
