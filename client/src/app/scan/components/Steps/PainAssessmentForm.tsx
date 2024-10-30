import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

type QuestionKey =
  | "painDescription"
  | "painDuration"
  | "painTrigger"
  | "painLocation"
  | "additionalSymptoms";

interface FormData {
  painDescription: string[];
  painDuration: string[];
  painTrigger: string[];
  painLocation: string[];
  additionalSymptoms: string[];
}

const PainAssessmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    painDescription: [],
    painDuration: [],
    painTrigger: [],
    painLocation: [],
    additionalSymptoms: [],
  });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: QuestionKey,
  ) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedQuestion = checked
        ? [...prevData[question], value]
        : prevData[question].filter((item) => item !== value);

      return { ...prevData, [question]: updatedQuestion };
    });
  };

  // @ts-ignore
  return (
    <Form>
      <h2>Pain Assessment Form</h2>

      <Form.Group controlId="painDescription">
        <Form.Label>1. Can you describe the pain?</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Sharp pain"
            value="Sharp"
            onChange={(e) => handleCheckboxChange(e, "painDescription")}
          />
          <Form.Control readOnly placeholder="Sharp" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Dull pain"
            value="Dull"
            onChange={(e) => handleCheckboxChange(e, "painDescription")}
          />
          <Form.Control readOnly placeholder="Dull" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Throbbing pain"
            value="Throbbing"
            onChange={(e) => handleCheckboxChange(e, "painDescription")}
          />
          <Form.Control readOnly placeholder="Throbbing" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Constant pain"
            value="Constant"
            onChange={(e) => handleCheckboxChange(e, "painDescription")}
          />
          <Form.Control readOnly placeholder="Constant" />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="painDuration">
        <Form.Label>2. When did the pain start?</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Sudden pain"
            value="Sudden"
            onChange={(e) => handleCheckboxChange(e, "painDuration")}
          />
          <Form.Control readOnly placeholder="Sudden" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Gradual pain"
            value="Gradual"
            onChange={(e) => handleCheckboxChange(e, "painDuration")}
          />
          <Form.Control readOnly placeholder="Gradual" />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="painTrigger">
        <Form.Label>3. Does anything make it worse or better?</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Hot food"
            value="Hot food"
            onChange={(e) => handleCheckboxChange(e, "painTrigger")}
          />
          <Form.Control readOnly placeholder="Hot food" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Cold food"
            value="Cold food"
            onChange={(e) => handleCheckboxChange(e, "painTrigger")}
          />
          <Form.Control readOnly placeholder="Cold food" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Sweet food"
            value="Sweet food"
            onChange={(e) => handleCheckboxChange(e, "painTrigger")}
          />
          <Form.Control readOnly placeholder="Sweet food" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Biting down"
            value="Biting down"
            onChange={(e) => handleCheckboxChange(e, "painTrigger")}
          />
          <Form.Control readOnly placeholder="Biting down" />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="painLocation">
        <Form.Label>4. Is the pain localized or does it radiate?</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="One tooth"
            value="One tooth"
            onChange={(e) => handleCheckboxChange(e, "painLocation")}
          />
          <Form.Control readOnly placeholder="One tooth" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Radiates elsewhere"
            value="Radiates elsewhere"
            onChange={(e) => handleCheckboxChange(e, "painLocation")}
          />
          <Form.Control readOnly placeholder="Radiates elsewhere" />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="additionalSymptoms">
        <Form.Label>5. Do you have any additional symptoms?</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Swelling"
            value="Swelling"
            onChange={(e) => handleCheckboxChange(e, "additionalSymptoms")}
          />
          <Form.Control readOnly placeholder="Swelling" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Redness"
            value="Redness"
            onChange={(e) => handleCheckboxChange(e, "additionalSymptoms")}
          />
          <Form.Control readOnly placeholder="Redness" />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox
            aria-label="Fever"
            value="Fever"
            onChange={(e) => handleCheckboxChange(e, "additionalSymptoms")}
          />
          <Form.Control readOnly placeholder="Fever" />
        </InputGroup>
      </Form.Group>

      <button variant="primary" type="submit">
        Submit
      </button>
    </Form>
  );
};

export default PainAssessmentForm;
