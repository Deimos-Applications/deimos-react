import React from "react";
import DeimosIconButton from "../../../deimos-ui/components/deimos-button/DeimosIconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const DeimosCrudTableActions: React.FC<any> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex flex-row">
      <DeimosIconButton onClick={onEdit} className="mr-2">
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </DeimosIconButton>
      <DeimosIconButton onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </DeimosIconButton>
    </div>
  );
};

export default DeimosCrudTableActions;
