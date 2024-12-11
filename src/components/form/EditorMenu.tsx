import {
  Check,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatListBulleted,
  FormatUnderlined,
  InsertLink,
  Redo,
  Undo,
} from "@mui/icons-material";
import {
  Button,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import BaseChip from "../BaseChip";
import ChipPopover from "../chip-popover";
import ModalWrapper from "../modal";
export default function EditorMenu({
  editor,
  isMinimal,
  extraMenuItems,
  sx,
  disabled = false,
}: {
  editor: any;
  isMinimal?: boolean;
  extraMenuItems?: React.ReactNode[];
  sx?: any;
  disabled?: boolean;
}) {
  const theme = useTheme();
  const [isOpenInsertLink, setIsOpenInsertLink] = useState(false);
  const [link, setLink] = useState("");

  const listColors = [
    theme.palette.common.black,
    theme.palette.text.primary,
    theme.palette.text.secondary,
    theme.palette.text.disabled,
    theme.palette.common.white,
    theme.palette.primary.dark,
    theme.palette.primary.main_600,
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.primary.light_200,
    theme.palette.error.dark,
    theme.palette.error.main_600,
    theme.palette.error.main,
    theme.palette.error.light,
    theme.palette.error.light_200,
    theme.palette.warning.dark,
    theme.palette.warning.main_600,
    theme.palette.warning.main,
    theme.palette.warning.light,
    theme.palette.warning.light_200,
    theme.palette.info.dark,
    theme.palette.info.main_600,
    theme.palette.info.main,
    theme.palette.info.light,
    theme.palette.info.light_200,
    theme.palette.success.dark,
    theme.palette.success.main_600,
    theme.palette.success.main,
    theme.palette.success.light,
    theme.palette.success.light_200,
  ];

  const hasTextSelected = editor && editor.state.selection.empty === false;

  if (!editor) return null;

  return (
    <>
      <Stack sx={sx} direction="row" alignItems="center">
        <Tooltip title="Bold">
          <BaseChip
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              disabled || !editor.can().chain().focus().toggleBold().run()
            }
            className={editor.isActive("bold") ? "is-active" : ""}
            sx={{
              border: "none",
              borderRadius: 0,
              color: (theme) =>
                editor.isActive("bold")
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            label={<FormatBold fontSize="small" />}
          />
        </Tooltip>

        <Tooltip title="Italic">
          <BaseChip
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              disabled || !editor.can().chain().focus().toggleItalic().run()
            }
            className={editor.isActive("italic") ? "is-active" : ""}
            sx={{
              border: "none",
              borderRadius: 0,
              color: (theme) =>
                editor.isActive("italic")
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            label={<FormatItalic fontSize="small" />}
          />
        </Tooltip>

        <Tooltip title="Underline">
          <BaseChip
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={
              disabled || !editor?.can().chain().focus().toggleUnderline().run()
            }
            sx={{
              border: "none",
              borderRadius: 0,

              color: (theme) =>
                editor.isActive("underline")
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            label={<FormatUnderlined fontSize="small" />}
          />
        </Tooltip>

        <ChipPopover
          tooltipTitle="Text color"
          sx={{
            border: "none",
            borderRadius: 0,
          }}
          label={
            <FormatColorText
              fontSize="small"
              sx={{ color: editor.getAttributes("textStyle").color }}
            />
          }
          disabled={disabled}
          popoverChildren={
            <Stack p={1} maxWidth={128} direction="row" flexWrap="wrap" gap={1}>
              {listColors.map((color) => {
                const isSelected =
                  editor.getAttributes("textStyle").color === color;
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    key={color}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: 0.25,
                      backgroundColor: color,
                      border: (theme) => `0.5px solid ${theme.palette.divider}`,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      isSelected
                        ? editor.commands.unsetColor()
                        : editor.chain().focus().setColor(color).run()
                    }
                  >
                    {isSelected && (
                      <Check
                        sx={{
                          fontSize: 14,
                          color: theme.palette.getContrastText(color),
                        }}
                      />
                    )}
                  </Stack>
                );
              })}
            </Stack>
          }
        />

        <ChipPopover
          tooltipTitle="Highlight color"
          sx={{
            border: "none",
            borderRadius: 0,
          }}
          label={
            <FormatColorFill
              fontSize="small"
              sx={{ color: editor.getAttributes("highlight").color }}
            />
          }
          disabled={disabled}
          popoverChildren={
            <Stack p={1} maxWidth={128} direction="row" flexWrap="wrap" gap={1}>
              {listColors.map((color) => {
                const isSelected = editor.isActive("highlight", { color });
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    key={color}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: 0.25,
                      backgroundColor: color,
                      border: (theme) => `0.5px solid ${theme.palette.divider}`,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      editor.chain().focus().toggleHighlight({ color }).run()
                    }
                  >
                    {isSelected && (
                      <Check
                        sx={{
                          fontSize: 14,
                          color: theme.palette.getContrastText(color),
                        }}
                      />
                    )}
                  </Stack>
                );
              })}
            </Stack>
          }
        />

        <Tooltip title="Bullet list">
          <BaseChip
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={
              disabled || !editor.can().chain().focus().toggleBulletList().run()
            }
            sx={{
              border: "none",
              borderRadius: 0,
              color: (theme) =>
                editor.isActive("bulletList")
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            label={<FormatListBulleted fontSize="small" />}
          />
        </Tooltip>

        <Tooltip title="Insert link">
          <BaseChip
            disabled={disabled || !hasTextSelected}
            sx={{
              border: "none",
              borderRadius: 0,
              color: (theme) =>
                editor.isActive("link")
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
            label={<InsertLink fontSize="small" />}
            onClick={() => {
              setIsOpenInsertLink(true);
              setLink(editor.getAttributes("link").href);
            }}
          />
        </Tooltip>

        {!isMinimal && (
          <Tooltip title="H1">
            <BaseChip
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
              sx={{
                border: "none",
                borderRadius: 0,
                color: (theme) =>
                  editor.isActive("heading")
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Editor"
                      transform="translate(-432.000000, -48.000000)"
                      fillRule="nonzero"
                    >
                      <g
                        id="Heading_1_fill"
                        transform="translate(432.000000, 48.000000)"
                      >
                        <path
                          d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                          id="MingCute"
                          fillRule="nonzero"
                        ></path>
                        <path
                          d="M13,2.5 C13.7796706,2.5 14.4204457,3.09488554 14.4931332,3.85553954 L14.5,4 L14.5,20 C14.5,20.8284 13.8284,21.5 13,21.5 C12.2203294,21.5 11.5795543,20.9050879 11.5068668,20.1444558 L11.5,20 L11.5,13.5 L5.5,13.5 L5.5,20 C5.5,20.8284 4.82843,21.5 4,21.5 C3.22030118,21.5 2.579551,20.9050879 2.50686655,20.1444558 L2.5,20 L2.5,4 C2.5,3.17157 3.17157,2.5 4,2.5 C4.77969882,2.5 5.420449,3.09488554 5.49313345,3.85553954 L5.5,4 L5.5,10.5 L11.5,10.5 L11.5,4 C11.5,3.17157 12.1716,2.5 13,2.5 Z M19.0001,13.5187 L19.0001,20 C19.0001,20.5523 18.5524,21 18.0001,21 C17.4478,21 17.0001,20.5523 17.0001,20 L17.0001,15.366 C16.5471,15.6281 15.9624,15.4962 15.6681,15.0547 C15.3617,14.5951 15.4859,13.9743 15.9454,13.6679 L17.4299,12.6783 C18.101,12.2308 19.0001,12.712 19.0001,13.5187 Z"
                          id="形状"
                          fill={theme.palette.text.secondary}
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              }
            />
          </Tooltip>
        )}

        {!isMinimal && (
          <Tooltip title="H2">
            <BaseChip
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
              sx={{
                border: "none",
                borderRadius: 0,

                color: (theme) =>
                  editor.isActive("heading", { level: 3 })
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Editor"
                      transform="translate(-480.000000, -48.000000)"
                      fillRule="nonzero"
                    >
                      <g
                        id="Heading_2_fill"
                        transform="translate(480.000000, 48.000000)"
                      >
                        <path
                          d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                          id="MingCute"
                          fillRule="nonzero"
                        ></path>
                        <path
                          d="M13,2.5 C13.7796706,2.5 14.4204457,3.09488554 14.4931332,3.85553954 L14.5,4 L14.5,20 C14.5,20.8284 13.8284,21.5 13,21.5 C12.2203294,21.5 11.5795543,20.9050879 11.5068668,20.1444558 L11.5,20 L11.5,13.5 L5.5,13.5 L5.5,20 C5.5,20.8284 4.82843,21.5 4,21.5 C3.22030118,21.5 2.579551,20.9050879 2.50686655,20.1444558 L2.5,20 L2.5,4 C2.5,3.17157 3.17157,2.5 4,2.5 C4.77969882,2.5 5.420449,3.09488554 5.49313345,3.85553954 L5.5,4 L5.5,10.5 L11.5,10.5 L11.5,4 C11.5,3.17157 12.1716,2.5 13,2.5 Z M17.6575,12.6792 C18.2901,12.521 18.9499,12.6085 19.5304,12.8987 C20.6957,13.4814 21.2873,14.8195 20.9732,16.0757 C20.8743714,16.4711857 20.6906857,16.8394878 20.4358711,17.1556055 L20.3026,17.3092 L18.7244,19.0001 L20.3542,19.0001 C20.9065,19.0001 21.3542,19.4478 21.3542,20.0001 C21.3542,20.51295 20.968173,20.9356092 20.4708239,20.9933725 L20.3542,21.0001 L16.6492,21.0001 C16.0918,21.0001 15.6399,20.5482 15.6399,19.9908 C15.6399,19.69785 15.6621031,19.4213609 15.830043,19.1827703 L15.9113,19.0829 L18.8405,15.9446 C19.313,15.4383 18.8904,14.4325 18.1425,14.6195 C17.8287222,14.6979889 17.6756556,14.9547296 17.6455145,15.2464465 L17.6399,15.3572 C17.6399,15.9095 17.1922,16.3572 16.6399,16.3572 C16.0876,16.3572 15.6399,15.9095 15.6399,15.3572 C15.6399,14.1109 16.4218,12.9881 17.6575,12.6792 Z"
                          id="形状"
                          fill={theme.palette.text.secondary}
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              }
            />
          </Tooltip>
        )}

        {!isMinimal && (
          <Tooltip title="H3">
            <BaseChip
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={
                editor.isActive("heading", { level: 5 }) ? "is-active" : ""
              }
              sx={{
                border: "none",
                borderRadius: 0,

                color: (theme) =>
                  editor.isActive("heading", { level: 5 })
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
              }}
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Editor"
                      transform="translate(-528.000000, -48.000000)"
                      fillRule="nonzero"
                    >
                      <g
                        id="Heading_3_fill"
                        transform="translate(528.000000, 48.000000)"
                      >
                        <path
                          d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                          id="MingCute"
                          fillRule="nonzero"
                        ></path>
                        <path
                          d="M13,2.5 C13.7796706,2.5 14.4204457,3.09488554 14.4931332,3.85553954 L14.5,4 L14.5,20 C14.5,20.8284 13.8284,21.5 13,21.5 C12.2203294,21.5 11.5795543,20.9050879 11.5068668,20.1444558 L11.5,20 L11.5,13.5 L5.5,13.5 L5.5,20 C5.5,20.8284 4.82843,21.5 4,21.5 C3.22030118,21.5 2.579551,20.9050879 2.50686655,20.1444558 L2.5,20 L2.5,4 C2.5,3.17157 3.17157,2.5 4,2.5 C4.77969882,2.5 5.420449,3.09488554 5.49313345,3.85553954 L5.5,4 L5.5,10.5 L11.5,10.5 L11.5,4 C11.5,3.17157 12.1716,2.5 13,2.5 Z M18.3715,12.5 C19.827,12.5 21.0001,13.6854 21.0001,15.1334 C21.0001,15.7245 20.8,16.2932 20.4418,16.7501 C20.7999,17.2069 20.9999,17.7756 20.9999,18.3666 C20.9999,19.8146 19.8268,21 18.3713,21 C17.3195,21 16.332,20.6496 15.8873,19.6016 C15.6461,19.033 15.6582,18.3518 16.3235,18.0694 C16.7955857,17.8691071 17.3354439,18.0594112 17.5829394,18.4946729 L17.6347,18.5994 C17.7727273,18.9247091 17.9135661,18.9858645 18.1765622,18.9973488 L18.3713,19 L18.3713,19 C18.7147,19 18.9999,18.7176 18.9999,18.3666 C18.9999,17.9941455 18.7151893,17.7892942 18.3855875,17.7551267 L18.2856,17.75 C17.7333,17.75 17.2856,17.3023 17.2856,16.75 C17.2856,16.23715 17.6717995,15.8144908 18.1691731,15.7567275 L18.2858,15.75 C18.6556,15.75 19.0001,15.5431 19.0001,15.1334 C19.0001,14.7824 18.7149,14.5 18.3715,14.5 L18.1767622,14.5026512 C17.9429879,14.5128595 17.8057329,14.562314 17.6811769,14.8016529 L17.6349,14.9006 C17.4192,15.409 16.8322,15.6463 16.3238,15.4306 C15.6584,15.1482 15.6463,14.467 15.8876,13.8984 C16.3323,12.8504 17.3197,12.5 18.3715,12.5 Z"
                          id="形状"
                          fill={theme.palette.text.secondary}
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              }
            />
          </Tooltip>
        )}

        {!isMinimal && (
          <Tooltip title="Undo">
            <BaseChip
              onClick={() => editor.chain().focus().undo().run()}
              disabled={disabled || !editor.can().chain().focus().undo().run()}
              sx={{
                border: "none",
                borderRadius: 0,
              }}
              label={<Undo fontSize="small" />}
            />
          </Tooltip>
        )}

        {!isMinimal && (
          <Tooltip title="Redo">
            <BaseChip
              onClick={() => editor.chain().focus().redo().run()}
              disabled={disabled || !editor.can().chain().focus().redo().run()}
              sx={{
                border: "none",
                borderRadius: 0,
              }}
              label={<Redo fontSize="small" />}
            />
          </Tooltip>
        )}

        {extraMenuItems}
      </Stack>

      <ModalWrapper
        isOpen={isOpenInsertLink}
        handleClose={() => {
          setLink("");
          setIsOpenInsertLink(false);
        }}
        dialogProps={{ maxWidth: "sm", fullWidth: true }}
        isUsingActions
        handleApply={() => {
          editor.chain().focus().setLink({ href: link }).run();
          editor.chain().focus().setColor(theme.palette.primary.main).run();
          setIsOpenInsertLink(false);
        }}
        startExtraButton={[
          {
            component: (
              <Button
                key="Unset link"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  editor.commands.unsetUnderline();
                  editor.commands.unsetColor();
                  setLink("");
                  setIsOpenInsertLink(false);
                }}
                variant="outlined"
              >
                Unset link
              </Button>
            ),
          },
        ]}
      >
        <Stack spacing={0.5}>
          <Typography variant="body2">Insert link</Typography>
          <TextField value={link} onChange={(e) => setLink(e.target.value)} />
        </Stack>
      </ModalWrapper>
    </>
  );
}
