import { useRef, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function CardChart(props) {
  const data = {
    labels: ['Не трудоустроиться', 'Трудоустроиться'],
    datasets: [
      {
        label: '# вероятность',
        data: props.probability,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const code = props.code;
  const prediction = props.prediction;
  const profiler = JSON.parse(localStorage.getItem('saveApi')).profession_codes;
  const prof_code = profiler.filter((item) => {
    if (item['id'] === parseInt(code)) {
      return item;
    }
  })[0];

  const body_text = `Обратите внимание, что по тем же параметрам, но по направлению ${
    prof_code['name_profession_code']
  } трудоустроиться: ${prediction === 1 ? 'Вероятнее' : 'Слабовероятнее'}`;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>
        <Card.Title as='h5'>Вероятность трудоустройства</Card.Title>
        <Pie data={data} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{prof_code['name_profession_code']}</Card.Title>
        <Card.Text>{body_text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

CardChart.propsTypes = {
  probability: PropTypes.array,
  code: PropTypes.number,
  prediction: PropTypes.number,
};

export default CardChart;
