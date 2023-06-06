import { getApiAllGender } from '../axios';
import { useEffect, useState } from 'react';
import { Form, ProgressBar, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setGender } from '../redux/GenderSlice';
import { setParamsToPredict } from '../redux/ParamsToPredictSlice';


function Gender() {
  const dispatch = useDispatch();
  const [genders, setGenders] = useState([]);
  const [alerGender, setAlerGender] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('genders');
    if (data) {
      setGenders(JSON.parse(data));
      setLoading(false);
    } else {
      getApiAllGender().then((res) => {
        setGenders(res.genders);
        localStorage.setItem('genders', JSON.stringify(res.genders));
        setLoading(false);
      });
    }
     
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const vote_gender = genders.filter((item) => {
      return item.id === parseInt(formData.get('radion_gender'));
    });

    if (vote_gender.length > 0) {
      dispatch(setGender(vote_gender[0]));

      dispatch(setParamsToPredict({
        gender: vote_gender[0].id,
      }));

      setAlerGender(vote_gender[0].name_gender);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerGender('');
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [alerGender]);

  return (
    <>
      {loading ? (
        <ProgressBar now={100} animated />
      ) : (
        <>
          {alerGender !== '' && (
            <Alert variant='secondary'>Указан пол: {alerGender}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='radion_gender' className='mb-3'>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as='select'
                name='radion_gender'
                defaultValue='DEFAULT'
                required
              >
                <option value='DEFAULT' disabled>
                  Select Gender
                </option>
                {genders.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_gender}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Button variant='success' type='submit'>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </>
      )}
    </>
  );
}

export default Gender;
