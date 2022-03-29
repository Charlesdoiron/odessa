// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import API from "services/api";
import { InputDropDown } from "../search-dropdown";

interface Props {
  type: string;
  label: string;
  placeholder: string;
  id: string;
  autoComplete: string;
  register: any;
  error?: any;
  onSelect?: any;
}

// https://headlessui.dev/react/combobox
export const InputLocation: React.FC<Props> = ({
  id,
  label,
  placeholder,
  name,
  geometry,
  onChange,
  onChangeGeometry,
}) => {
  const [expression, setExpression] = useState("");
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState({ name, geometry });

  const timeout = useRef<ReturnType<typeof setTimeout>>(null);
  const canFetchChoices = useRef<boolean>(null);

  const debounceGetChoices = useCallback(() => {
    const getChoices = async () => {
      if (!canFetchChoices.current) return;
      if (!expression) return;
      const response = await API.post({
        path: "/location/list",
        body: {
          expression,
          coordinates: null, //{ longitude, latitude }
        },
      });
      if (!response.ok) return;
      setChoices(response.data);
    };
    clearTimeout(timeout.current);
    timeout.current = setTimeout(getChoices, 150);
  }, [expression]);

  const onSelectChoice = (choice) => {
    setSelected(choice);
    setChoices([]);
    onChangeGeometry(choice.geometry);
    onChange(choice.name);
    setExpression(choice.name);
    canFetchChoices.current = false;
  };

  const setExpressionManually = (newExpression: string) => {
    canFetchChoices.current = true;
    setExpression(newExpression);
  };

  useEffect(() => {
    debounceGetChoices();
  }, [debounceGetChoices, expression]);

  return (
    <InputDropDown
      id={id}
      type="text"
      autoComplete="off" // because it clashes with dropdown
      label={label}
      placeholder={placeholder}
      choices={choices}
      setSelected={onSelectChoice}
      setQuery={setExpressionManually}
      query={expression}
      selected={selected}
      onChange={setExpressionManually}
    />
  );
};
