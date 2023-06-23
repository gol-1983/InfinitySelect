import React, { useState, ChangeEvent } from "react";
import { Form, Dropdown, Card } from "react-bootstrap";

interface Option {
  value: string;
  label: string;
}

interface SelectWithCheckboxesProps {
  options: Option[];
  label: string;
  selectedValue?: string;
  idx?: number | undefined;
  onChange: (value: string, idx: number | undefined) => void;
}
//________________________________________________
export const SelectItem: React.FC<SelectWithCheckboxesProps> = ({
  options,
  label,
  selectedValue = "",
  idx,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedValue);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOption(value);
    onChange(value, idx);
  };

  return (
    <Card className="m-2">
      <Card.Header>
        <Form.Label>{idx}</Form.Label>
      </Card.Header>
      <Card.Body>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-select" className="mw-100">
            Варіант:{label}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options.map((option) => (
              <Form.Check
                key={option.value}
                type="radio"
                label={option.label}
                name="radioGroup"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleRadioChange}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};
