import { ReactComponent as RussianMapSvg } from '../../assets/russian_map.svg';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setRegion } from '../../redux/RegionSlice';
import styles from './index.module.css';
import { Alert, Container, Button } from 'react-bootstrap';

function RussianMap() {
  const dispatch = useDispatch();
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [drag, setDrag] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [name_alert, setNameAlert] = useState('');

  useEffect(() => {
    if (name_alert !== '') {
      setVisible(true);
    }
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 5000 ms = 5 s

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [name_alert]);

  useEffect(() => {
    const allRegions = document.querySelectorAll('svg#svg2 path');
    allRegions.forEach((region) => {
      region.addEventListener('click', () => {
        let id = parseInt(region.dataset['id']);
        let iso = region.getAttribute('id');
        let name_region = region.getAttribute('name');
        let r = /\\u([\d\w]{4})/gi;
        name_region = name_region.replace(r, (_, grp) => {
          return String.fromCharCode(parseInt(grp, 16));
        });
        name_region = decodeURIComponent(name_region);
        setNameAlert(name_region);
        dispatch(
          setRegion({
            id: id,
            iso: iso,
            name: name_region,
          }),
        );
      });
    });
  }, [dispatch]);

  const handleZoomIn = () => {
    setTransform((t) => ({ ...t, scale: t.scale * 1.1 }));
  };

  const handleZoomOut = () => {
    setTransform((t) => ({ ...t, scale: t.scale / 1.1 }));
  };

  const handleDragStart = (e) => {
    if (drag) return;
    setStartPoint({ x: e.clientX, y: e.clientY });
    setDrag(true);
  };

  const handleDrag = (e) => {
    if (!drag) return;
    setTransform((t) => ({
      ...t,
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y,
    }));
  };

  const handleDragEnd = () => {
    if (!drag) return;
    setStartPoint({ x: 0, y: 0 });
    setDrag(false);
  };

  const touchDragStart = (e) => {
    if (drag) return;
    setStartPoint({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setDrag(true);
  };

  const touchDrag = (e) => {
    if (!drag) return;
    setTransform((t) => ({
      ...t,
      x: t.x + (e.touches[0].clientX - startPoint.x),
      y: t.y + (e.touches[0].clientY - startPoint.y),
    }));
    setStartPoint((t) => ({
      ...t,
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }));
  };

  const touchDragEnd = () => {
    if (!drag) return;
    setDrag(false);
  };

  let viewBox = `${0 - transform.x} ${0 - transform.y} ${1015 /
    transform.scale} ${610 / transform.scale}`;

  return (
    <div className={styles.map}>
      {visible && (
        <Container className='mb-2 mt-2'>
          <Alert variant='secondary'>Вы выбрали субъект: {name_alert}</Alert>
        </Container>
      )}
      <div className={styles.buttonGroup}>
        <Button variant='outline-secondary' onClick={handleZoomIn}>
          Приблизить
        </Button>
        <Button variant='outline-secondary' onClick={handleZoomOut}>
          Отдалить
        </Button>
      </div>

      <RussianMapSvg
        id='svg2'
        className={styles.svg}
        viewBox={viewBox}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={touchDragStart}
        onTouchMove={touchDrag}
        onTouchEnd={touchDragEnd}
      />
    </div>
  );
}

export default RussianMap;
