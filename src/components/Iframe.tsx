import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { memo, useState } from "react";
import ModalWrapper from "./modal";

interface IframeProps {
  src: string;
  height?: number | string;
  width?: number | string;
  style?: any;
  onRemove?: () => Promise<void>;
}

const Iframe = memo(
  ({ src, width = 200, height = 120, style = {}, onRemove }: IframeProps) => {
    const [isConfirm, setIsConfirm] = useState(false);

    return (
      <Box
        width={width}
        height={height}
        sx={{
          position: "relative",
          "& .div[role='button']": {
            display: "none !important",
          },
        }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ borderRadius: 8, border: "none", ...style }}
          allow="autoplay"
        />
        <Box
          onClick={() =>
            window.open(
              src.replace("/preview", ""),
              "_blank",
              "noopener,noreferrer"
            )
          }
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            zIndex: 1,
          }}
        />

        {onRemove && (
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
            onClick={() => setIsConfirm(true)}
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        )}

        {onRemove && (
          <ModalWrapper
            isOpen={isConfirm}
            handleClose={() => setIsConfirm(false)}
            handleApply={() => onRemove?.()}
            isUsingActions
          >
            Are you sure you want to delete this file?
          </ModalWrapper>
        )}
      </Box>
    );
  }
);

Iframe.displayName = "Iframe";

export default Iframe;
