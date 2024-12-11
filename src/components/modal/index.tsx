import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Fragment, ReactNode, useState } from "react";

type DialogProp = Omit<DialogProps, "open">;

interface ExtraButton {
  title?: string;
  style?: ButtonProps;
  onClick?: any;
  component?: ReactNode;
}

interface ModalWrapperProps {
  handleOpen?: () => any;
  isUsingIconButton?: boolean;
  isUsingCustomButton?: boolean;
  buttonTitle?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  handleCancel?: () => void;
  handleApply?: any;
  dialogProps?: DialogProp;
  buttonProps?: ButtonProps;
  isUsingActions?: boolean;
  isOpen?: boolean;
  handleClose?: () => void;
  disableApplyButton?: boolean;
  startExtraButton?: ExtraButton[];
  extraButton?: ExtraButton[];
  dialogContentProps?: DialogContentProps;
  disableCloseOnConfirm?: boolean;
  isRawApply?: boolean;
}

export default function ModalWrapper(props: ModalWrapperProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    if (typeof props.isOpen !== "boolean" || !props.handleClose) {
      setOpen(true);
    }
    props?.handleOpen?.();
  };

  const handleClose = () => {
    if (typeof props.isOpen !== "boolean" || !props.handleClose) {
      setOpen(false);
      if (props.handleCancel) props.handleCancel();
    } else {
      props.handleClose();
    }
  };

  return (
    <>
      {(() => {
        if (props.buttonTitle) {
          if (props.isUsingCustomButton) {
            return <Box onClick={handleClickOpen}>{props.buttonTitle}</Box>;
          }

          if (props.isUsingIconButton) {
            return (
              <IconButton onClick={handleClickOpen} {...props.buttonProps}>
                {props.buttonTitle}
              </IconButton>
            );
          }

          return (
            <Button
              onClick={handleClickOpen}
              {...props.buttonProps}
              disableRipple
            >
              {props.buttonTitle}
            </Button>
          );
        }
      })()}

      <Dialog
        open={typeof props.isOpen !== "boolean" ? open : props.isOpen}
        onClose={handleClose}
        {...props.dialogProps}
      >
        {props.title && (
          <DialogTitle>
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {props.title}
              <IconButton onClick={handleClose}>
                <Close color="primary" />
              </IconButton>
            </Stack>
          </DialogTitle>
        )}

        <Divider />
        <DialogContent {...props.dialogContentProps}>
          {props.children}
        </DialogContent>
        {props.isUsingActions && (
          <DialogActions sx={{ px: 2.5, pb: 2 }}>
            {props?.startExtraButton?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item?.component ?? (
                    <Button
                      key={item.title}
                      {...item.style}
                      disabled={isLoading}
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          await item?.onClick();
                        } catch (error) {
                          console.log(error);
                        }
                        setIsLoading(false);
                        setOpen(false);
                        //handleClose();
                      }}
                    >
                      {item.title}
                    </Button>
                  )}
                </Fragment>
              );
            })}

            <Button variant="outlined" onClick={handleClose}>
              Discard
            </Button>
            <Button
              variant="contained"
              onClick={async () => {
                setIsLoading(true);
                if (props.handleApply) {
                  try {
                    await props.handleApply();
                  } catch (error) {
                    console.log(error);
                  }
                }
                setIsLoading(false);
                if (!props.disableCloseOnConfirm) {
                  if (props.isRawApply) setOpen(false);
                  else handleClose();
                }
              }}
              disabled={isLoading || props.disableApplyButton}
            >
              {isLoading ? <CircularProgress size={24} /> : "Confirm"}
            </Button>
            {props?.extraButton?.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item?.component ?? (
                    <Button
                      key={item.title}
                      {...item.style}
                      disabled={isLoading}
                      onClick={async () => {
                        setIsLoading(true);
                        try {
                          await item?.onClick();
                        } catch (error) {
                          console.log(error);
                        }
                        setIsLoading(false);
                        setOpen(false);
                        //handleClose();
                      }}
                    >
                      {item.title}
                    </Button>
                  )}
                </Fragment>
              );
            })}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
