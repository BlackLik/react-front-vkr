import {
  Form,
  ProgressBar,
  Button,
  Row,
  Col,
  ButtonGroup,
  Container,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getIp, getApiData } from '../../axios';
import FormGroup from './FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  setParamsToPredict,
  setUpdate,
} from '../../redux/ParamsToPredictSlice';
import { LinkContainer } from 'react-router-bootstrap';

function FormRecomendation() {
  const dispatch = useDispatch();

  const last_form = useSelector((state) => state.paramsPredict.data);
  const gender = useSelector((state) => state.gender.data);
  const region = useSelector((state) => state.region.data);

  const [ip, setIp] = useState(null);
  const [citizenships, setCitizenships] = useState([]);
  const [professionCodes, setProfessionCodes] = useState([]);
  const [formOfEducations, setFormOfEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);
  const [dateBirth, setDateOfBirth] = useState(2001);

  const [rangeEducation, setRangeEducation] = useState(48);
  const [rangeDisability, setRangeDisability] = useState(0);

  useEffect(() => {
    getIp().then((response) => {
      setIp(response);
    });

    const need_fetch = JSON.parse(localStorage.getItem('saveApi'));
    const now_time = new Date().getTime();

    if (!need_fetch || now_time - need_fetch.datetime > 1000 * 60 * 60) {
      getApiData('citizenships').then((response) => {
        setCitizenships(response.citizenships);
        setProgress((prev) => [...prev, true]);
      });

      getApiData('profession_codes').then((response) => {
        setProfessionCodes(response.profession_codes);
        setProgress((prev) => [...prev, true]);
      });

      getApiData('form_of_educations').then((response) => {
        setFormOfEducations(response.form_of_educations);
        setProgress((prev) => [...prev, true]);
      });
    }

    if (last_form.duration_of_education !== null) {
      setRangeEducation(last_form.duration_of_education);
      setRangeDisability(last_form.disability);
    }

    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip]);

  useEffect(() => {
    const need_fetch = JSON.parse(localStorage.getItem('saveApi'));
    const now_time = new Date().getTime();

    if (!need_fetch) {
      if (progress.length >= 3) {
        let new_saveApi = {
          form_of_educations: formOfEducations,
          citizenships: citizenships,
          profession_codes: professionCodes,
          datetime: now_time,
        };
        localStorage.setItem('saveApi', JSON.stringify(new_saveApi));
      }
    } else {
      setCitizenships(need_fetch.citizenships);
      setProfessionCodes(need_fetch.profession_codes);
      setFormOfEducations(need_fetch.form_of_educations);
    }
  }, [progress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (
      formData.get('qualificationId') !== '' &&
      formData.get('educational_organizationId') !== '' &&
      formData.get('citizenshipId') !== 'DEFAULT' &&
      formData.get('citizenshipId') &&
      formData.get('form_of_educationId') !== 'DEFAULT' &&
      formData.get('form_of_educationId') &&
      formData.get('profession_codeId') !== 'DEFAULT' &&
      formData.get('profession_codeId') &&
      gender !== null &&
      region !== null
    ) {
      const paramsToPredict = {
        ip: ip,
        region: region.id,
        gender: gender.id,
        qualification: formData.get('qualificationId'),
        educational_organization: formData.get('educational_organizationId'),
        form_of_education: parseInt(formData.get('form_of_educationId')),
        profession_code: parseInt(formData.get('profession_codeId')),
        duration_of_education: parseInt(
          formData.get('duration_of_educationId'),
        ),
        year_of_enrollment: parseInt(formData.get('year_of_enrollmentId')),
        citizenship: parseInt(formData.get('citizenshipId')),
        year_of_birth: parseInt(formData.get('year_of_birthId')),
        disability: parseInt(formData.get('disabilityId')),
        pension_for_childs_behalf:
          formData.get('pension_for_childs_behalfId') === 'on' ? true : false,
        pension_for_childs:
          formData.get('pension_for_childsId') === 'on' ? true : false,
      };

      dispatch(setParamsToPredict({ ...paramsToPredict }));
      dispatch(setUpdate(true));
    }
  };

  return (
    <>
      {loading ? (
        <ProgressBar now={100} animated />
      ) : (
        <Form onSubmit={handleSubmit} className='mb-4'>
          <Row xs={1} md={2}>
            <Col className='mb-4'>
              <Form.Group controlId='qualificationId'>
                <Form.Label>Специальность</Form.Label>
                <Form.Control
                  type='text'
                  name='qualificationId'
                  placeholder='Техник-программист'
                  defaultValue={last_form.qualification}
                  required
                />
              </Form.Group>
            </Col>
            <Col className='mb-4'>
              <Form.Group controlId='educational_organizationId'>
                <Form.Label>Образовательная организация</Form.Label>
                <Form.Control
                  type='text'
                  name='educational_organizationId'
                  placeholder='Государственное Бюджетное Профессиональное Образовательное Учреждение'
                  defaultValue={last_form.educational_organization}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row xs={1} md={2}>
            <Col className='mb-4'>
              <Form.Group controlId='year_of_enrollmentId'>
                <Form.Label>Год поступления</Form.Label>
                <Form.Control
                  type='number'
                  min={dateBirth ? dateBirth + 14: 1900}
                  placeholder={dateBirth ? dateBirth + 16: 1900}
                  required
                  name='year_of_enrollmentId'
                  defaultValue={last_form.year_of_enrollment}
                />
              </Form.Group>
            </Col>
            <Col className='mb-4'>
              <Form.Group controlId='year_of_birthId'>
                <Form.Label>Год рождения</Form.Label>
                <Form.Control
                  type='number'
                  min={1900}
                  max={2100}
                  placeholder='2001'
                  required
                  name='year_of_birthId'
                  value={dateBirth}
                  onChange={(e) => setDateOfBirth(parseInt(e.target.value))}
                  defaultValue={last_form.year_of_birth}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row xs={1} md={3}>
            <Col className='mb-4'>
              <FormGroup
                items={citizenships}
                name_form='citizenshipId'
                label_form='Страна'
                description_form='Введите страну'
                namespace_id='id'
                namespace_name='name_citizenship'
                defaultValue={
                  last_form.citizenship
                    ? last_form.citizenship.toString()
                    : null
                }
              />
            </Col>
            <Col className='mb-4'>
              <FormGroup
                items={professionCodes}
                name_form='profession_codeId'
                label_form='Профессиональный код'
                description_form='Введите профессиональный код'
                namespace_id='id'
                namespace_name='name_profession_code'
                defaultValue={
                  last_form.profession_code
                    ? last_form.profession_code.toString()
                    : null
                }
              />
            </Col>
            <Col className='mb-4'>
              <FormGroup
                items={formOfEducations}
                name_form='form_of_educationId'
                label_form='Форма обучения'
                description_form='Введите форма обучения'
                namespace_id='id'
                namespace_name='name_form_of_education'
                defaultValue={
                  last_form.form_of_education
                    ? last_form.form_of_education.toString()
                    : null
                }
              />
            </Col>
          </Row>
          <Row xs={1} md={3}>
            <Col className='mb-4'>
              <Form.Group controlId='duration_of_educationId'>
                <Form.Label>
                  Длительность обучения{' '}
                  {rangeEducation !== null && rangeEducation} месяцев
                </Form.Label>
                <Form.Range
                  max={5 * 12}
                  min={0}
                  step={1}
                  value={rangeEducation}
                  required
                  onChange={(e) => setRangeEducation(e.target.value)}
                  name='duration_of_educationId'
                />
              </Form.Group>
            </Col>
            <Col className='mb-4'>
              <Form.Group controlId='disabilityId'>
                <Form.Label>
                  Инвалидность:{' '}
                  {rangeDisability !== 0 ? rangeDisability + ' степени' : 'Нет'}
                </Form.Label>
                <Form.Range
                  max={3}
                  min={0}
                  step={1}
                  value={rangeDisability}
                  required
                  onChange={(e) => setRangeDisability(parseInt(e.target.value))}
                  name='disabilityId'
                />
              </Form.Group>
            </Col>
            <Col className='mb-4'>
              <Row xs={2}>
                <Col>
                  <Form.Check // prettier-ignore
                    type='switch'
                    id='pension_for_childs_behalfId'
                    name='pension_for_childs_behalfId'
                    label='Пенсия по потери комильца'
                    defaultChecked={
                      last_form.pension_for_childs_behalf
                        ? last_form.pension_for_childs_behalf
                        : false
                    }
                  />
                </Col>
                <Col>
                  <Form.Check // prettier-ignore
                    type='switch'
                    id='pension_for_childsId'
                    name='pension_for_childsId'
                    label='Пенсия за ребёнка'
                    defaultChecked={
                      last_form.pension_for_childs
                        ? last_form.pension_for_childs
                        : false
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Container>
            <Row>
              <Col sm={8}>
                <ButtonGroup className='mb-4 mb-sm-0'>
                  <LinkContainer to='/region'>
                    <Button variant='outline-primary'>{region.name}</Button>
                  </LinkContainer>
                  <LinkContainer to='/gender'>
                    <Button variant='outline-primary'>{gender.name_gender}</Button>
                  </LinkContainer>
                </ButtonGroup>
              </Col>
              <Col sm={4}>
                <Button
                  variant='outline-success'
                  type='submit'
                  className='justify-content-end'
                  disabled={region === null || gender === null}
                >
                  Отправить
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </>
  );
}

export default FormRecomendation;
