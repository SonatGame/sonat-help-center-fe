import { CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { BookSettingIcon } from "../../lib/constants/icons";
import CreateDocumentModal from "./create-document-modal";
import DocumentCard from "./document-card";
import useCourseSection from "./hooks";

export default function CourseSection() {
  const { isModalOpen, handleOpen, handleClose, data, isLoading, mutate } =
    useCourseSection();

  if (isLoading)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100%",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  if (!data)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{
          height: "100%",
        }}
      >
        <BookSettingIcon sx={{ fontSize: 255 }} />
        <Typography variant="h5">Không có bộ tài liệu nào</Typography>
        <CreateDocumentModal
          isModalOpen={isModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          mutate={mutate}
        />
      </Stack>
    );

  return (
    <Stack
      sx={{
        px: 4,
        py: 3,
      }}
      gap={4}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Danh sách tài liệu</Typography>
        <CreateDocumentModal
          isModalOpen={isModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          mutate={mutate}
        />
      </Stack>
      <Grid2 container spacing={2}>
        {data?.map((document) => (
          <Grid2 key={document._id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <DocumentCard documentData={document} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}
