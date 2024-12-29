import ButtonMenu from "@/components/button-menu";
import { FileIcon, FolderIcon, SearchIcon } from "@/lib/constants/icons";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Resource } from "@/lib/types/document";
import { Add, ArrowBack } from "@mui/icons-material";
import { Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { useRouter } from "next/navigation";
import useDocumentDetail from "./hooks";
import ResourceContent from "./resource-content";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[500],
  [`& .${treeItemClasses.selected}`]: {
    backgroundColor: `${theme.palette.grey[100]} !important`,
    color: `${theme.palette.grey[700]} !important`,
  },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 0.5),
    userSelect: "none",
    [`& .${treeItemClasses.label}`]: {
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.grey[500],
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    // marginLeft: 15,
    // paddingLeft: 18,
  },
}));

export default function CourseContent() {
  const theme = useTheme();
  const router = useRouter();
  const { isLoading, treeData, handleNodeClick, selectedResource } =
    useDocumentDetail();

  const renderTreeItems = (items: Resource[]) => {
    return items.map((item) => (
      <CustomTreeItem
        key={item._id}
        itemId={item._id}
        label={item.title}
        onClick={() => handleNodeClick(item)}
      >
        {item.children && renderTreeItems(item.children)}
      </CustomTreeItem>
    ));
  };

  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Stack
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRight: 1,
          borderColor: theme.palette.divider,
          minWidth: 350,
        }}
      >
        <Stack gap={1.5} sx={{ p: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.5}
            sx={{
              cursor: "pointer",
              userSelect: "none",
              color: theme.palette.primary.main,
            }}
            onClick={() => router.push(AppRoutes.DOCUMENT)}
          >
            <ArrowBack fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Quay lại
            </Typography>
          </Stack>
          <Typography variant="h6">{selectedResource?.title}</Typography>
          <TextField
            placeholder="Tìm kiếm"
            autoComplete="off"
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
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: theme.palette.grey[500] }}
          >
            <Typography variant="body2" fontWeight="bold">
              Mục lục
            </Typography>
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
                      <FolderIcon fontSize="small" />
                      <Typography variant="body2">Thư mục mới</Typography>
                    </Stack>
                  ),
                  onClick: () => {},
                },
              ]}
              buttonProps={{
                size: "small",
              }}
            />
          </Stack>
          <SimpleTreeView selectedItems={selectedResource?._id}>
            {renderTreeItems(treeData)}
          </SimpleTreeView>
        </Stack>
      </Stack>
      <Stack
        sx={{ flexGrow: 1, backgroundColor: theme.palette.background.paper }}
      >
        <ResourceContent />
      </Stack>
    </Stack>
  );
}
