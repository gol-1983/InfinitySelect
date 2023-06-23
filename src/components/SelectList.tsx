import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
// import { Option } from "../types";
import { SelectItem } from "./SelectItem";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { updateTitle, updateAllTitles } from "../redux/slice";

const checkboxOptions = [
  { value: "1", label: "Варіант 1" },
  { value: "2", label: "Варіант 2" },
  { value: "3", label: "Варіант 3" },
  { value: "4", label: "Варіант 4" },
  { value: "5", label: "Варіант 5" },
  { value: "6", label: "Варіант 6" },
];

export const SelectList = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const title = useAppSelector((state) => state.tree.title);
  const dispatch = useAppDispatch();

  const handleSelectChange = (value: string, idx: number | undefined) => {
    console.log("selectedValue", value);

    setSelectedOption(value);

    if (idx === title.length - 1) {
      dispatch(updateTitle({ id: idx, name: value }));
    } else {
      //update title of the current index
      const newTitle = title.map((item: any, index: number) => {
        if (index === idx) {
          return { id: idx, name: value };
        } else {
          return item;
        }
      });
      dispatch(updateAllTitles(newTitle));
    }
  };

  return (
    <div className="d-flex flex-column mb-3">
      <div>
        <h1>Infinity Select</h1>
      </div>
      <ListGroup horizontal>
        {title.map((item, idx) => (
          <ListGroup.Item key={idx}>
            <SelectItem
              options={checkboxOptions}
              label={title
                    .slice(0, idx + 1)
                    .map((item) => item.name)
                    .join("-")}
              idx={idx}
              selectedValue={item.name}
              onChange={handleSelectChange}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
