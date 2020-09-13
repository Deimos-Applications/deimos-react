import React from "react";
import { DeimosButtonVariant } from "../../../deimos-ui/components/deimos-button/DeimosButton";
import DeimosModal from "../../../deimos-ui/components/deimos-modal/DeimosModal";

interface DeimosCrudConfirmDeleteProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeimosCrudConfirmDelete: React.FC<DeimosCrudConfirmDeleteProps> = ({
  isOpen,
  onCancel,
  onDelete,
}) => {
  return (
    <DeimosModal
      isOpen={isOpen}
      handleClose={onDelete}
      handleCancel={onCancel}
      closeButtonText="Eliminar"
      closeButtonVariant={DeimosButtonVariant.Danger}
      hideCancelButton={false}
    >
      <h2>¿Estás seguro de borrar éste elemento?</h2>
    </DeimosModal>
  );
};

export default DeimosCrudConfirmDelete;
