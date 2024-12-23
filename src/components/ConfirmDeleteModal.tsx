import { ReactNode } from "react";
import ModalWrapper from "./modal";

interface IProps {
  title: string;
  isOpen: boolean;
  onApply: () => any;
  onClose: () => any;
  children: ReactNode;
}

export default function ConfirmDeleteModal(props: IProps) {
  const { title, isOpen, onApply, onClose, children } = props;

  return (
    <ModalWrapper
      title={title}
      isOpen={isOpen}
      usingActions
      onApply={async () => {
        await onApply();
      }}
      onClose={onClose}
      applyButtonProps={{
        color: "error",
      }}
      disableCloseOnApply
    >
      {children}
    </ModalWrapper>
  );
}
