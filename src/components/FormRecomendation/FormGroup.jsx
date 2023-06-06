import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';

function FormGroup(props) {
  const items = props.items;
  const name_form = props.name_form;
  const label_form = props.label_form;
  const description_form = props.description_form;
  const key_items = {
    id: props.namespace_id,
    name: props.namespace_name,
  };
  const defaultValue = props.defaultValue ? props.defaultValue : 'DEFAULT';

  const [values, setValues] = useState(defaultValue);

  return (
    <Form.Group controlId={name_form}>
      <Form.Label>{label_form}</Form.Label>
      <Form.Select
        name={name_form}
        placeholder={description_form}
        value={values}
        onChange={(e) => setValues(e.target.value)}
        required
      >
        <option disabled value='DEFAULT'>
          {description_form}
        </option>
        {items.map((item) => (
          <option
            key={item[key_items['id']]}
            value={item[key_items['id']].toString()}
          >
            {item[key_items['name']]}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

FormGroup.propTypes = {
  items: PropTypes.array.isRequired,
  name_form: PropTypes.string.isRequired,
  description_form: PropTypes.string.isRequired,
  namespace_id: PropTypes.string.isRequired,
  namespace_name: PropTypes.string.isRequired,
  label_form: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

export default FormGroup;
