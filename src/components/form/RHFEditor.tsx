import { Link as LinkType } from "@/lib/types/ticketManagementData";
import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { nanoid } from "nanoid";
import { keymap } from "prosemirror-keymap";
import { useEffect } from "react";
import EditorMenu from "./EditorMenu";

interface IRHFEditorProps {
  valueName: string;
  value: string;
  setValue: any;
  editorHeight?: string | number;
  placeholder?: string;
  autoFocus?: boolean;
  menuPosition?: "top" | "bottom";
  sx?: any;
  menuSx?: any;
  isMinimalMenu?: boolean;
  extraMenuItems?: React.ReactNode[];
  files?: File[];
  links?: LinkType[];
  onRemoveFile?: (index: number) => () => void;
  onRemoveLink?: (index: number) => () => void;
  disabled?: boolean;
}

export default function RHFEditor({
  valueName,
  value,
  setValue,
  editorHeight = 240,
  placeholder,
  autoFocus = false,
  menuPosition = "top",
  sx,
  menuSx,
  isMinimalMenu = false,
  extraMenuItems,
  files,
  links,
  onRemoveFile,
  onRemoveLink,
  disabled = false,
}: IRHFEditorProps) {
  const theme = useTheme();
  const TabKeyMapExtension = Extension.create({
    addProseMirrorPlugins() {
      return [
        keymap({
          Tab: (state, dispatch) => {
            const { tr } = state;
            dispatch?.(tr.insertText("\t"));
            return true;
          },
        }),
      ];
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Link.configure({
        // openOnClick: true,
        HTMLAttributes: {
          style: `color: ${theme.palette.primary.main}; text-decoration: underline;`,
        },
        autolink: true,
        defaultProtocol: "https",
      }),
      Highlight.configure({ multicolor: true }),
      ListItem,
      Underline,
      TabKeyMapExtension,
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 3, 5],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: value,
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(valueName, html);
    },
    editable: !disabled,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <Card
      sx={{
        width: 1,
        "& .ProseMirror": {
          outline: "none",
          height: "100%",
        },
        ...sx,
      }}
    >
      {menuPosition === "top" && (
        <>
          <EditorMenu
            sx={menuSx}
            editor={editor}
            extraMenuItems={extraMenuItems}
            isMinimal={isMinimalMenu}
            disabled={disabled}
          />
          <Divider />
        </>
      )}

      <Box
        py={2}
        px={3}
        overflow="auto"
        sx={{
          "& .is-editor-empty:first-of-type::before": {
            color: "text.secondary",
            content: "attr(data-placeholder)",
            float: "left",
            height: 0,
            pointerEvents: "none",
          },
        }}
      >
        <EditorContent editor={editor} style={{ height: editorHeight }} />
      </Box>

      <Grid px={1.5} pb={1.5} container spacing={1}>
        {(() => {
          if (!files || !files?.length) return null;

          const previewImages = [];
          let index = 0;
          for (const file of files) {
            index++;
            previewImages.push(
              <Grid key={nanoid()} item spacing={0.5}>
                <DisplayFile
                  name={file.name}
                  onRemove={onRemoveFile?.(index)}
                />
              </Grid>
            );
          }

          return previewImages;
        })()}

        {links?.map((link, index) => (
          <Grid key={nanoid()} item spacing={0.5}>
            <DisplayFile name={link.key} onRemove={onRemoveLink?.(index)} />
          </Grid>
        ))}
      </Grid>

      {menuPosition === "bottom" && (
        <>
          <Divider />
          <EditorMenu
            sx={menuSx}
            editor={editor}
            extraMenuItems={extraMenuItems}
            isMinimal={isMinimalMenu}
            disabled={disabled}
          />
        </>
      )}
    </Card>
  );
}

function DisplayFile({
  name,
  onRemove,
}: {
  name: string;
  onRemove?: () => void;
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      py={0.5}
      px={1}
      alignItems="center"
      justifyContent="space-between"
      width={1}
      sx={{
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" spacing={0.5}>
        <Typography variant="caption" fontWeight={500} color="primary">
          {name}
        </Typography>
      </Stack>

      <IconButton size="small" onClick={onRemove}>
        <Close sx={{ fontSize: 16 }} />
      </IconButton>
    </Stack>
  );
}
