import ButtonMenu from "@/components/button-menu";
import { FileIcon, FolderIcon, SearchIcon } from "@/lib/constants/icons";
import { AppRoutes } from "@/lib/constants/routesAndPermissions";
import { Resource, ResourseType } from "@/lib/types/document";
import { Add, ArrowBack } from "@mui/icons-material";
import {
  CircularProgress,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  TreeItem as MuiTreeItem,
  treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { Empty } from "antd";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useDocumentDetail from "./hooks";
import ResourceContent from "./resource-content";
import TreeItem from "./tree-item";

const CustomTreeItem = styled(MuiTreeItem)(({ theme }) => ({
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
    marginLeft: 16,
  },
}));

export default function CourseContent() {
  const theme = useTheme();
  const router = useRouter();
  const {
    collectionResources,
    collectionId,
    loadingResources,
    treeData,
    handleNodeClick,
    selectedResource,
    createResourceInCollection,
    setInputValue,
    inputValue,
    searchText,
  } = useDocumentDetail();

  const renderTreeItems = (items: Resource[]) => {
    return items.map((item) => (
      <CustomTreeItem
        key={item._id}
        itemId={item._id}
        label={<TreeItem resource={item} />}
        onClick={() => handleNodeClick(item)}
      >
        {item.children && renderTreeItems(item.children)}
      </CustomTreeItem>
    ));
  };

  const treeItems = useMemo(() => {
    return renderTreeItems(treeData);
  }, [treeData]);

  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Stack
        gap={1.5}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRight: 1,
          borderColor: theme.palette.divider,
          width: 350,
        }}
      >
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
        {/* <Typography variant="h6">{collectionData?.title}</Typography> */}
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
                onClick: () =>
                  createResourceInCollection(
                    ResourseType.document,
                    collectionId
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
                  createResourceInCollection(ResourseType.folder, collectionId),
              },
            ]}
            buttonProps={{
              size: "small",
            }}
          />
        </Stack>
        {(() => {
          if (loadingResources)
            return (
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <CircularProgress />
              </Stack>
            );

          if (treeItems.length !== 0)
            return (
              <SimpleTreeView
                selectedItems={selectedResource?._id}
                expandedItems={
                  collectionResources && searchText.length > 0
                    ? collectionResources.map((item) => item._id)
                    : undefined
                }
              >
                {treeItems}
              </SimpleTreeView>
            );

          return (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Empty />
            </Stack>
          );
        })()}
      </Stack>
      <Stack
        sx={{ flexGrow: 1, backgroundColor: theme.palette.background.paper }}
      >
        {(() => {
          if (loadingResources)
            return (
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <CircularProgress />
              </Stack>
            );
          return <ResourceContent />;
        })()}
      </Stack>
    </Stack>
  );
}
