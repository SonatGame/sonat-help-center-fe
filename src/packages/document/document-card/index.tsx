import ButtonMenu from "@/components/button-menu";
import TextMaxLine from "@/components/TextMaxLine";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Collection } from "@/lib/types/document";
import { MoreVert } from "@mui/icons-material";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface IDocumentCardProps {
  documentData: Collection;
}

export default function DocumentCard({ documentData }: IDocumentCardProps) {
  const { title, description, thumbnail, _id } = documentData;
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => router.push(`${AppRoutes.DOCUMENT}${_id}`)}
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
        <TextMaxLine
          TypographyProps={{
            variant: "h6",
          }}
        >
          {title}
        </TextMaxLine>
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
              onClick: () => {},
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
              onClick: () => {},
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
  );
}
