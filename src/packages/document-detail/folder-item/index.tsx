import ButtonMenu from "@/components/button-menu";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { FileIcon, FolderIcon } from "@/lib/constants/icons";
import { Resource, ResourseType } from "@/lib/types/document";
import { MoreHoriz } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDocumentDetailContext } from "../context";

export default function FolderItem({
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
          Bạn có chắc muốn xoá&nbsp;
          {resource.type === ResourseType.folder ? "thư mục" : "tài liệu"}
          &nbsp;này không?
        </Typography>
      </ConfirmDeleteModal>
    </Stack>
  );
}
