import {
  CircularProgress,
  Grid2,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { BookSettingIcon, SearchIcon } from "../../lib/constants/icons";
import CreateDocumentModal from "./create-document-modal";
import DocumentCard from "./document-card";
import useCourseSection from "./hooks";

export default function CourseSection() {
  const theme = useTheme();
  const {
    isModalOpen,
    handleOpen,
    handleClose,
    data,
    isLoading,
    mutate,
    inputValue,
    setInputValue,
  } = useCourseSection();

  if (!data && inputValue.length === 0)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{
          height: "100%",
        }}
      >
        {isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              flexGrow: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <>
            <BookSettingIcon sx={{ fontSize: 255 }} />
            <Typography variant="h5">Không có bộ tài liệu nào</Typography>
            <CreateDocumentModal
              isModalOpen={isModalOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
              mutate={mutate}
            />
          </>
        )}
      </Stack>
    );

  return (
    <Stack
      sx={{
        px: 4,
        py: 3,
        height: "100%",
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
      <TextField
        placeholder="Tìm kiếm"
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon
                fontSize="small"
                sx={{ color: theme.palette.grey[500] }}
              />
            ),
          },
        }}
        sx={{ maxWidth: 350 }}
      />

      {isLoading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
          }}
        >
          <CircularProgress />
        </Stack>
      ) : data?.length === 0 ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={3}
          sx={{
            flexGrow: 1,
          }}
        >
          <BookSettingIcon sx={{ fontSize: 255 }} />
          <Typography variant="h5">Không có bộ tài liệu nào</Typography>
        </Stack>
      ) : (
        <Grid2 container spacing={2}>
          {data?.map((document) => (
            <Grid2
              key={document._id}
              size={{ xs: 12, sm: 6, lg: 4, xl: 3, xxl: 2.4 }}
            >
              <DocumentCard documentData={document} mutate={mutate} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
}
