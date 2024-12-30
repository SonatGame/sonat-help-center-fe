import ButtonMenu from "@/components/button-menu";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import {
  EditIcon,
  FileIcon,
  FolderIcon,
  UploadCloudIcon,
} from "@/lib/constants/icons";
import { Resource, ResourseType } from "@/lib/types/document";
import { Add, MoreHoriz, NavigateNext } from "@mui/icons-material";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useDocumentDetailContext } from "../context";
import { getParentList } from "../helper";
import UploadDocsModal from "../upload-docs-modal";
import useResourceContent from "./hooks";

export default function ResourceContent() {
  const theme = useTheme();
  const {
    resourceData,
    setSelectedResource,
    selectedResource,
    handleOpenUploadDocsModal,
    isLoading,
    htmlContent,
    googleDocs,
    createResourceInResource,
    isRenaming,
    handleEnableRename,
    handleCancelRename,
    title,
    setTitle,
    loadingRename,
    handleRename,
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
        <Typography
          key={index}
          variant="body2"
          fontWeight="bold"
          sx={{ color: theme.palette.primary.main }}
        >
          {item?.title}
        </Typography>
      );
    });
  }, [resourceData, selectedResource]);

  return (
    <Stack gap={4} sx={{ flexGrow: 1 }}>
      {breadcrumbs.length > 0 && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      )}
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

          if (selectedResource?.type === ResourseType.document)
            return (
              <Box dangerouslySetInnerHTML={{ __html: htmlContent ?? "" }} />
            );

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
                      <Typography fontSize={36} fontWeight="bold">
                        {selectedResource?.title}
                      </Typography>
                    </Stack>
                    <IconButton onClick={handleEnableRename}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </>
              ) : (
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <TextField
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ flexGrow: 1 }}
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

function FolderItem({
  onClick,
  resource,
}: {
  onClick: () => void;
  resource: Resource;
}) {
  const theme = useTheme();
  const { updateResource, deleteResource } = useDocumentDetailContext();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [loadingRename, setLoadingRename] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);

  function handleEnableRename() {
    setIsRenaming(true);
  }

  function handleCancelRename() {
    setTitle(resource.title);
    setIsRenaming(false);
  }

  async function handleRename() {
    setLoadingRename(true);
    await updateResource(resource._id, {
      title: title,
    });
    setIsRenaming(false);
    setLoadingRename(false);
  }

  function handleClose() {
    setIsConfirmModalOpen(false);
  }

  function handleDelete() {
    setIsConfirmModalOpen(true);
  }

  async function handleConfirmDelete() {
    await deleteResource(resource._id);
  }

  useEffect(() => {
    setTitle(resource.title);
  }, [resource]);

  useEffect(() => {
    if (isRenaming) ref.current?.focus();
  }, [isRenaming]);

  if (isRenaming)
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <TextField
          ref={ref}
          size="small"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoComplete="off"
          sx={{ flexGrow: 1 }}
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
    );

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
          {title}
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
              onClick: handleEnableRename,
            },
            {
              label: (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Xoá
                </Typography>
              ),
              onClick: handleDelete,
            },
          ]}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        title={
          resource.type === ResourseType.folder ? "Xoá thư mục" : "Xoá tài liệu"
        }
        onApply={handleConfirmDelete}
        onClose={handleClose}
      >
        <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
          Bạn có chắc muốn xoá{" "}
          {resource.type === ResourseType.folder ? "thư mục" : "tài liệu"} này
          không?
        </Typography>
      </ConfirmDeleteModal>
    </Stack>
  );
}
