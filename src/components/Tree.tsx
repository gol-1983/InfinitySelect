import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { updateTitle, updateAllTitles } from "../redux/slice";

const options = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
];

export const Tree = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const title = useAppSelector((state) => state.tree.title);
  const dispatch = useAppDispatch();


 

  const handleOptionChange = (
    event: {
      [x: string]: any;
      target: { value: React.SetStateAction<string> };
    },
    idx: number
  ) => {
    setSelectedOption(event.target.value);

    if (idx === title.length - 1) {
      dispatch(updateTitle({ id: idx, name: event.target.value }));
    } else {
      //update title of the current index
      const newTitle = title.map((item: any, index: number) => {
        if (index === idx) {
          return { id: idx, name: event.target.value };
        } else {
          return item;
        }
      });
      dispatch(updateAllTitles(newTitle));
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {title.map((item: any, idx, arr) => (
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            minWidth: "220px",
            margin: "20px",
            padding: "10px",
          }}
          key={idx}
        >
          <div style={{}}>
            <h4>{idx}</h4>
            <select
              style={{ minWidth: "180px", maxWidth: "200px" }}
            //   value={selectedOption}
              onChange={(event) => handleOptionChange(event, idx)}
            >
              <option value="">
                Варіант:
                {idx === 0
                  ? item.name
                  : title
                      .slice(0, idx + 1)
                      .map((item) => item.name)
                      .join("-")}
              </option>
              {options.map((o) => (
                <option key={o.id} value={o.name}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};
