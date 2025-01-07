import { DocumentApi } from "@/api/DocumentApi";
import ButtonMenu from "@/components/button-menu";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import TextMaxLine from "@/components/TextMaxLine";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Collection } from "@/lib/types/document";
import { MoreVert } from "@mui/icons-material";
import { Box, Card, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditDocumentModal from "../edit-document-modal";

export interface IDocumentCardProps {
  documentData: Collection;
  mutate: any;
}

export default function DocumentCard({
  documentData,
  mutate,
}: IDocumentCardProps) {
  const { title, description, thumbnail, _id } = documentData;
  const theme = useTheme();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteResource = async (id: string) => {
    await DocumentApi.deleteCollection(id);
  };

  function handleDelete() {
    setIsDeleteModalOpen(true);
  }

  async function handleConfirmDelete() {
    await deleteResource(_id);
    mutate();
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <Card
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          router.push(`${AppRoutes.DOCUMENT}${_id}`);
        }}
      >
        <Box
          sx={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image
            src={thumbnail}
            alt="cover-image"
            width={600}
            height={156}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          sx={{
            mt: 1,
          }}
        >
          <Tooltip placement="top" title={title}>
            <Box>
              <TextMaxLine
                TypographyProps={{
                  variant: "h6",
                }}
              >
                {title}
              </TextMaxLine>
            </Box>
          </Tooltip>
          <ButtonMenu
            usingIconButton
            icon={<MoreVert fontSize="small" />}
            menuOptions={[
              {
                label: (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ py: 0.5, color: theme.palette.grey[500] }}
                  >
                    <Typography variant="body2">Chỉnh sửa</Typography>
                  </Stack>
                ),
                onClick: () => {
                  setIsEditModalOpen(true);
                },
              },
              {
                label: (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ py: 0.5, color: theme.palette.grey[500] }}
                  >
                    <Typography variant="body2">Xoá tài liệu</Typography>
                  </Stack>
                ),
                onClick: handleDelete,
              },
            ]}
            buttonProps={{
              size: "small",
            }}
          ></ButtonMenu>
        </Stack>
        <TextMaxLine
          TypographyProps={{
            variant: "body2",
          }}
          sx={{
            mt: 1,
            flexGrow: 1,
          }}
        >
          {description}
        </TextMaxLine>
      </Card>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        title={"Xoá tài liệu"}
        onApply={handleConfirmDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
          Bạn có chắc muốn xoá&nbsp;
          {"tài liệu"}
          &nbsp;này không?
        </Typography>
      </ConfirmDeleteModal>
      <EditDocumentModal
        isModalOpen={isEditModalOpen}
        data={documentData}
        handleClose={() => {
          setIsEditModalOpen(false);
        }}
        mutate={mutate}
      />
    </>
  );
}
