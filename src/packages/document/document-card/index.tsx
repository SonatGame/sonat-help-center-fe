import TextMaxLine from "@/components/TextMaxLine";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Collection } from "@/lib/types/document";
import { Box, Card, useTheme } from "@mui/material";
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
          mt: 1.5,
          overflow: "hidden",
        }}
      >
        <Image
          src={thumbnail}
          alt="cover-image"
          width={600}
          height={248}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <TextMaxLine
        TypographyProps={{
          variant: "h6",
        }}
        sx={{
          mt: 1.5,
        }}
      >
        {title}
      </TextMaxLine>
      <TextMaxLine
        TypographyProps={{
          variant: "body2",
        }}
        sx={{
          mt: 1.5,
          flexGrow: 1,
        }}
      >
        {description}
      </TextMaxLine>
    </Card>
  );
}
