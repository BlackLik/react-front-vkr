import { useDispatch, useSelector } from 'react-redux';
import { Col, ProgressBar, Row, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getApiDataWithParams } from '../../axios';
import { setUpdate } from '../../redux/ParamsToPredictSlice';
import CardChart from './CardChart';

async function getRecomendatiom(params) {
  const main_data = await getApiDataWithParams('predict', {
    ...params,
  });
  let other_data = [];
  for (let i = 0; i < 3; i++) {
    const new_params = {
      ...params,
      profession_code:
        params.profession_code > 3
          ? params.profession_code - i
          : params.profession_code + i,
    };

    let result = await getApiDataWithParams('predict', {
      ...new_params,
    });

    other_data = [
      ...other_data,
      { result: result.message, params: { ...new_params } },
    ];
  }

  return {
    main_data: main_data,
    other_data: other_data,
  };
}

function Dashboard() {
  const dispatch = useDispatch();
  const paramsPredict = useSelector((state) => state.paramsPredict.data);
  const update_params = useSelector((state) => state.paramsPredict.update);
  const [dataPredict, setDataPredict] = useState({});
  const [dataRecommendation, setDataRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  const have_null = Object.keys(paramsPredict).reduce((acc, key) => {
    if (paramsPredict[key] === null) {
      acc[key] = paramsPredict[key];
    }
    return acc;
  }, {});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dataPredict'));

    if (data && !update_params) {
      setDataPredict(data);
      setLoading(false);
    } else {
      getRecomendatiom(paramsPredict).then((res) => {
        setDataPredict(res.main_data.message);
        localStorage.setItem(
          'dataPredict',
          JSON.stringify(res.main_data.message),
        );
        setDataRecommendation((prev) => [...res.other_data, ...prev]);
        setLoading(false);
        dispatch(setUpdate(false));
      });
    }
  }, [paramsPredict]);

  if (Object.keys(have_null).length > 0) {
    return <></>;
  }

  if (loading) {
    return <ProgressBar now={100} animated />;
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Вероятность трудоустройства равняется {dataPredict.probability[1]}</h1>
          {/* <p>
            CatBoost считает, что трудоустройство из образовательной организации{' '}
            {paramsPredict.educational_organization} для{' '}
            {paramsPredict.gender ? 'девушек' : 'юношей'}{' '}
            {paramsPredict.year_of_birth} года рождения по данному направлению и
            трудоустроиться по профилю {paramsPredict.qualification}{' '}
            {dataPredict.prediction === 0 ? 'Нельзя' : 'Возможно'}.
          </p> */}
        </Col>
      </Row>

      <Container fluid>
        <h3 className='mb-3 d-flex justify-content-center'>
          Обратите внимание
        </h3>
        <Row xs={1} md={2} lg={3}>
          {dataRecommendation.length > 0 ? (
            dataRecommendation.map((e, i) => (
              <Col key={i} className='d-flex justify-content-center mb-3'>
                <CardChart
                  probability={e.result.probability}
                  code={e.params.profession_code}
                  prediction={e.result.prediction}
                />
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
