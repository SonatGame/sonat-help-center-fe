import { FileIcon, FolderIcon, SearchIcon } from "@/lib/constants/icons";
import { ArrowBack } from "@mui/icons-material";
import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { NodeRendererProps, Tree } from "react-arborist";

export default function CourseContent() {
  const theme = useTheme();
  // const {} = useDocumentDetail();

  // const onCreate = ({ parentId, index, type }) => {};
  // const onRename = ({ id, name }) => {};
  // const onMove = ({ dragIds, parentId, index }) => {};
  // const onDelete = ({ ids }) => {};

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
            onClick={() => {}}
          >
            <ArrowBack fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Quay lại
            </Typography>
          </Stack>
          <TextField
            placeholder="Search"
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
          <Stack>
            <Typography variant="body2" fontWeight="bold">
              Tài liệu test
            </Typography>
          </Stack>
          <Typography variant="h6">Tài liệu test</Typography>
          <Tree
            initialData={data}
            // onCreate={onCreate}
            // onRename={onRename}
            // onMove={onMove}
            // onDelete={onDelete}
            openByDefault={false}
          >
            {Node}
          </Tree>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      style={style}
      sx={{
        cursor: "pointer",
        color: theme.palette.grey[500],
      }}
      ref={dragHandle}
    >
      {node.isLeaf ? (
        <FileIcon fontSize="small" />
      ) : (
        <FolderIcon fontSize="small" />
      )}
      <Typography variant="body2" fontWeight="bold">
        {node.data.name}
      </Typography>
    </Stack>
  );
}

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];
