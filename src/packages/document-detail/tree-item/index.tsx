import ButtonMenu from "@/components/button-menu";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { FileIcon, FolderIcon } from "@/lib/constants/icons";
import { Resource, ResourseType } from "@/lib/types/document";
import { Add, MoreVert } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDocumentDetailContext } from "../context";

export default function TreeItem({ resource }: { resource: Resource }) {
  const theme = useTheme();
  const { createResourceInResource, updateResource, deleteResource } =
    useDocumentDetailContext();
  const [isHovering, setIsHovering] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [loadingRename, setLoadingRename] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

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
    setIsConfirmModalOpen(false);
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
        onClick={(e) => e.stopPropagation()}
      >
        <TextField
          ref={ref}
          size="small"
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
      gap={1.5}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        width: "100%",
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
        },
      }}
    >
      {resource.type === ResourseType.document ? (
        <FileIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
      ) : (
        <FolderIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
      )}
      <Typography
        variant="body2"
        sx={{
          flexGrow: 1,
          color: theme.palette.grey[700],
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {resource?.title}
      </Typography>
      {isHovering && (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <ButtonMenu
            usingIconButton
            icon={<MoreVert fontSize="small" />}
            buttonProps={{
              size: "small",
              sx: {
                p: 0.1,
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
                onClick: handleDelete,
              },
            ]}
          />
          {resource.type === ResourseType.folder && (
            <ButtonMenu
              usingIconButton
              icon={<Add fontSize="small" />}
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
                      resource._id
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
                    createResourceInResource(ResourseType.folder, resource._id),
                },
              ]}
              buttonProps={{
                size: "small",
                sx: { p: 0.1 },
              }}
            />
          )}
        </Stack>
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
          Bạn có chắc muốn xoá&nbsp;
          {resource.type === ResourseType.folder ? "thư mục" : "tài liệu"}
          &nbsp;này không?
        </Typography>
      </ConfirmDeleteModal>
    </Stack>
  );
}
