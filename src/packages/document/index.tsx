import { Document } from "@/lib/types/document";
import { Grid2, Stack, Typography } from "@mui/material";
import { BookSettingIcon } from "../../lib/constants/icons";
import CreateCourseModal from "../course-detail/create-course-modal";
import CreateDocumentModal from "./create-document-modal";
import DocumentCard from "./document-card";
import useCourseSection from "./hooks";

export default function CourseSection() {
  const { isModalOpen, handleOpen, handleClose, data, isLoading, mutate } =
    useCourseSection();

  return !fakeData ? (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{
        height: "100%",
      }}
    >
      <BookSettingIcon sx={{ fontSize: 255 }} />
      <Typography variant="h5">
        Khai thác sức mạnh bản thân với bộ bài test toàn diện
      </Typography>
      <CreateCourseModal
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        mutate={mutate}
      />
    </Stack>
  ) : (
    <Stack
      sx={{
        px: 4,
        py: 3,
      }}
      gap={4}
    >
      <Stack direction="row" justifyContent="space-between">
        <div></div>
        <CreateDocumentModal
          isModalOpen={isModalOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          mutate={mutate}
        />
      </Stack>
      <Grid2 container spacing={2}>
        {fakeData?.map((document) => (
          <Grid2 key={document._id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            <DocumentCard documentData={document} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

const fakeData: Document[] = [
  {
    _id: "1",
    title: "Document 1",
    description: "Short description",
    coverImage:
      "https://storage-apis.sonatgame.com/data-connectors/2/files?fileId=1XDa4UenZC_hKNv2gRSACsCNg4m8DGqdD",
  },
  {
    _id: "2",
    title: "Document 2",
    description: "Short description",
    coverImage:
      "https://storage-apis.sonatgame.com/data-connectors/2/files?fileId=1XDa4UenZC_hKNv2gRSACsCNg4m8DGqdD",
  },
  {
    _id: "3",
    title: "Document 3",
    description: "Short description",
    coverImage:
      "https://storage-apis.sonatgame.com/data-connectors/2/files?fileId=1XDa4UenZC_hKNv2gRSACsCNg4m8DGqdD",
  },
];
