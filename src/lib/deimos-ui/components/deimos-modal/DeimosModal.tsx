import React from "react";
import Modal from "react-modal";
import DeimosButton, {
  DeimosButtonVariant,
} from "../deimos-button/DeimosButton";

// TODO: Replace with a constant
Modal.setAppElement(`#root`);

interface DeimosReactProps {
  isOpen: boolean;
  handleClose?: () => void;
  handleCancel?: () => void;

  hideCloseButton?: boolean;
  closeButtonText?: string;
  closeButtonVariant?: DeimosButtonVariant;

  hideCancelButton?: boolean;
  cancelButtonText?: string;
}

const DeimosModal: React.FC<DeimosReactProps> = ({
  isOpen = false,
  handleClose = () => {},
  handleCancel = () => {},
  children,

  hideCloseButton = false,
  closeButtonText = "Cerrar",
  closeButtonVariant,

  hideCancelButton = true,
  cancelButtonText = "Cancelar",
}) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col">
        {children}
        <div className="actions flex flex-row">
          {!hideCloseButton && (
            <DeimosButton
              variant={closeButtonVariant}
              onClick={() => handleClose()}
              className="mr-2"
            >
              {closeButtonText}
            </DeimosButton>
          )}

          {!hideCancelButton && (
            <DeimosButton
              variant={DeimosButtonVariant.Light}
              onClick={() => handleCancel()}
            >
              {cancelButtonText}
            </DeimosButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeimosModal;
