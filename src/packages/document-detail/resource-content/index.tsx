import ButtonMenu from "@/components/button-menu";
import {
  ColoredFolderIcon,
  EditIcon,
  FileIcon,
  FolderIcon,
  UploadCloudIcon,
} from "@/lib/constants/icons";
import { ResourseType } from "@/lib/types/document";
import { Add, NavigateNext } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FolderItem from "../folder-item";
import { getParentList } from "../helper";
import UploadDocsModal from "../upload-docs-modal";
import useResourceContent from "./hooks";
import "./styles.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResourceContent() {
  const theme = useTheme();
  const {
    resourceData,
    setSelectedResource,
    selectedResource,
    handleOpenUploadDocsModal,
    isLoading,
    pdfUrl,
    googleDocs,
    createResourceInResource,
    isRenaming,
    handleEnableRename,
    handleCancelRename,
    title,
    setTitle,
    loadingRename,
    handleRename,
    numPages,
    onDocumentLoadSuccess,
  } = useResourceContent();

  const breadcrumbs = useMemo(() => {
    if (!selectedResource) return [];
    const parents = getParentList(resourceData, selectedResource?._id);
    return parents.map((item, index) => {
      if (index < parents.length - 1)
        return (
          <Typography key={index} variant="body2" fontWeight="bold">
            {item?.title}
          </Typography>
        );
      return (
        <Stack key={index} direction="row" alignItems="center" gap={0.5}>
          {item.type === ResourseType.folder ? (
            <FolderIcon
              fontSize="small"
              sx={{ color: theme.palette.primary.main }}
            />
          ) : (
            <FileIcon
              fontSize="small"
              sx={{ color: theme.palette.primary.main }}
            />
          )}
          <Typography
            key={index}
            variant="body2"
            fontWeight="bold"
            sx={{ color: theme.palette.primary.main }}
          >
            {item?.title}
          </Typography>
        </Stack>
      );
    });
  }, [resourceData, selectedResource]);

  if (resourceData.length === 0)
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
        <ColoredFolderIcon sx={{ fontSize: 200 }} />
        <Typography variant="h4" sx={{ color: theme.palette.grey[700] }}>
          Không có nội dung trong tài liệu này
        </Typography>
      </Stack>
    );

  return (
    <Stack sx={{ flexGrow: 1 }}>
      {breadcrumbs.length > 0 && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      )}
      {selectedResource?.type === ResourseType.document && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Stack
            direction="row"
            gap={3}
            sx={{
              p: 1.5,
              border: 1,
              borderColor: theme.palette.grey[200],
              borderRadius: 1,
              color: theme.palette.primary.main,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => handleOpenUploadDocsModal()}
            >
              <UploadCloudIcon />
              <Typography variant="body2" fontWeight="bold">
                {googleDocs.url.length === 0
                  ? "Đăng tải tài liệu docs"
                  : "Thay đổi tài liệu docs"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        {(() => {
          if (!selectedResource) return;

          if (isLoading)
            return (
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
              >
                <CircularProgress />
              </Stack>
            );

          if (selectedResource?.type === ResourseType.document) {
            if (pdfUrl.length === 0) return;
            return (
              <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {numPages &&
                  Array.from({ length: numPages }, (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      renderMode="canvas"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      width={900}
                    />
                  ))}
              </Document>
            );
          }

          return (
            <Stack gap={1.5}>
              {!isRenaming ? (
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      <FolderIcon
                        sx={{ color: theme.palette.grey[500], fontSize: 32 }}
                      />
                      <Typography
                        fontSize={36}
                        fontWeight="bold"
                        sx={{
                          wordBreak: "break-word",
                        }}
                      >
                        {selectedResource?.title}
                      </Typography>
                    </Stack>
                    <IconButton onClick={handleEnableRename}>
                      <EditIcon sx={{ fill: theme.palette.grey[500] }} />
                    </IconButton>
                  </Stack>
                </>
              ) : (
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <TextField
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                      flexGrow: 1,
                      "& .MuiInput-input": {
                        py: 0,
                        fontSize: 36,
                        fontWeight: theme.typography.fontWeightBold,
                        "::placeholder": {
                          fontSize: 36,
                          fontWeight: theme.typography.fontWeightBold,
                        },
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    sx={{ textWrap: "nowrap" }}
                    onClick={handleCancelRename}
                  >
                    Hủy bỏ
                  </Button>
                  <LoadingButton
                    variant="contained"
                    onClick={handleRename}
                    loading={loadingRename}
                  >
                    Lưu
                  </LoadingButton>
                </Stack>
              )}
              <Stack>
                {selectedResource?.children?.map((item, index) => {
                  return (
                    <FolderItem
                      key={index}
                      resource={item}
                      onClick={() => setSelectedResource(item)}
                    />
                  );
                })}
              </Stack>
              <ButtonMenu
                buttonTitle={
                  <Add
                    fontSize="small"
                    sx={{ color: theme.palette.grey[500] }}
                  />
                }
                buttonProps={{
                  variant: "contained",
                  sx: {
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    backgroundColor: theme.palette.background.paper,
                    width: "fit-content",
                    minWidth: "fit-content",
                    p: 1,
                    boxShadow: 0,
                  },
                }}
                menuOptions={[
                  {
                    label: (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{ py: 0.5, color: theme.palette.grey[500] }}
                      >
                        <FileIcon fontSize="small" />
                        <Typography variant="body2">Tài liệu mới</Typography>
                      </Stack>
                    ),
                    onClick: () =>
                      createResourceInResource(
                        ResourseType.document,
                        selectedResource._id
                      ),
                  },
                  {
                    label: (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{ py: 0.5, color: theme.palette.grey[500] }}
                      >
                        <FolderIcon fontSize="small" />
                        <Typography variant="body2">Thư mục mới</Typography>
                      </Stack>
                    ),
                    onClick: () =>
                      createResourceInResource(
                        ResourseType.folder,
                        selectedResource._id
                      ),
                  },
                ]}
              />
            </Stack>
          );
        })()}
      </Container>
      <UploadDocsModal />
    </Stack>
  );
}
