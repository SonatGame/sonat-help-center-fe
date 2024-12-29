import ButtonMenu from "@/components/button-menu";
import { FileIcon, FolderIcon, UploadCloudIcon } from "@/lib/constants/icons";
import { Resource, ResourseType } from "@/lib/types/document";
import { MoreHoriz, NavigateNext } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import UploadDocsModal from "../upload-docs-modal";
import useResourceContent from "./hooks";

export default function ResourceContent() {
  const theme = useTheme();
  const {
    setSelectedResource,
    selectedResource,
    handleOpenUploadDocsModal,
    isLoading,
    htmlContent,
    showModalUpload,
    setGoogleDocs,
    googleDocs,
    handleCloseUploadDocsModal,
    isCreatingResource,
  } = useResourceContent();

  return (
    <Stack gap={4} sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <Typography variant="body2" fontWeight="bold">
            Breadcrumb
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            Breadcrumb
          </Typography>
        </Breadcrumbs>
      </Box>
      {selectedResource?.type === ResourseType.document && (
        <Stack alignItems="center">
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
                {!selectedResource
                  ? "Đăng tải tài liệu docs"
                  : "Thay đổi tài liệu docs"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Container maxWidth="md" sx={{ flexGrow: 1 }}>
        {(() => {
          if (isCreatingResource) return <></>;

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

          if (selectedResource?.type === ResourseType.document)
            return (
              <Box dangerouslySetInnerHTML={{ __html: htmlContent ?? "" }} />
            );

          return (
            <Stack gap={1.5}>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <FolderIcon
                  sx={{ color: theme.palette.grey[500], fontSize: 32 }}
                />
                <Typography fontSize={36} fontWeight="bold">
                  {selectedResource?.title}
                </Typography>
              </Stack>
              <Stack>
                {selectedResource?.children?.map((item) => {
                  return (
                    <FolderItem
                      resource={item}
                      onClick={() => setSelectedResource(item)}
                    />
                  );
                })}
              </Stack>
            </Stack>
          );
        })()}
      </Container>
      <UploadDocsModal
        isModalOpen={showModalUpload}
        setGoogleDocs={setGoogleDocs}
        googleDocs={googleDocs}
        handleClose={handleCloseUploadDocsModal}
        editingResource={selectedResource}
      />
    </Stack>
  );
}

function FolderItem({
  onClick,
  resource,
}: {
  onClick: () => void;
  resource: Resource;
}) {
  const [isHovering, setIsHovering] = useState(false);

  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={onClick}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        position: "relative",
        width: "100%",
        p: 1.5,
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
        },
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        {resource.type === ResourseType.document ? (
          <FileIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
        ) : (
          <FolderIcon
            fontSize="small"
            sx={{ color: theme.palette.grey[500] }}
          />
        )}
        <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
          {resource?.title}
        </Typography>
      </Stack>
      {isHovering && (
        <ButtonMenu
          usingIconButton
          icon={<MoreHoriz fontSize="small" />}
          buttonProps={{
            size: "small",
            sx: {
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
            },
          }}
          menuOptions={[
            {
              label: (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Đổi tên
                </Typography>
              ),
              onClick: () => {},
            },
            // {
            //   label: (
            //     <Typography
            //       variant="body2"
            //       sx={{ color: theme.palette.grey[500] }}
            //     >
            //       Tạo bản sao
            //     </Typography>
            //   ),
            //   onClick: () => {},
            // },
            // {
            //   label: (
            //     <Typography
            //       variant="body2"
            //       sx={{ color: theme.palette.grey[500] }}
            //     >
            //       Sao chép link
            //     </Typography>
            //   ),
            //   onClick: () => {},
            // },
            {
              label: (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Xoá
                </Typography>
              ),
              onClick: () => {},
            },
          ]}
        />
      )}
    </Stack>
  );
}
