import { Typography } from "@mui/material";
import ModalWrapper from "./modal";

interface IProps {
  isOpen: boolean;
  onApply: () => any;
  onClose: () => any;
}

export default function (props: IProps) {
  const { isOpen, onApply, onClose } = props;

  return (
    <ModalWrapper
      isOpen={isOpen}
      usingActions
      onApply={async () => {
        await onApply();
      }}
      onClose={onClose}
    >
      <Typography>Are you sure you want to delete&nbsp; ?</Typography>
    </ModalWrapper>
  );
}
