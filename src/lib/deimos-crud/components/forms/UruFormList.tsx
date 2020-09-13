import React from "react";

import "./UruFormList.scss";
import { useState } from "react";
import { useInput } from "../../../../hooks/useInput";

const UruFormList: React.FC<any> = ({
  name,
  items = [],
  activeItem = null,
  onChange = (newItems: any) => {},

  title,
  placeholder,
}) => {
  const [localItems, setLocalItems] = useState<any>(
    items.map((item: any) => ({ tag: item }))
  );
  const { value: tempTag, bind, setValue } = useInput("");

  return (
    <div className="uru-form-list">
      <ul>
        {title && (
          <li className="mb-1">
            <strong>{title}</strong>
          </li>
        )}
        {localItems.map(({ tag }: any, i: number) => (
          <li key={`${name}-${i}`} className="flex flex-row">
            <span>{tag}</span>
            <div className="ml-auto uru-form-list--actions">
              <i
                className="fas fa-trash manita"
                onClick={() => {
                  const newItems = [
                    ...localItems.filter((_: any, ii: any) => ii !== i),
                  ];
                  setLocalItems(newItems);
                  onChange(newItems.map((item) => item.tag));
                }}
              ></i>
            </div>
          </li>
        ))}
      </ul>

      <div className="form-group">
        <label htmlFor="">Agregar elemento</label>
        <input
          type="text"
          className="form-control"
          {...bind}
          placeholder={placeholder}
        />
      </div>

      <button
        className="btn btn-info mb-3"
        type="button"
        onClick={() => {
          const newItems = [...localItems, { tag: tempTag }];
          setLocalItems(newItems);
          setValue("");
          onChange(newItems.map((item) => item.tag));
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default UruFormList;
