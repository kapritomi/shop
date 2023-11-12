import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { article, delay } from './App';

export function Articles() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => prevIndex === article.length - 1 ? 0 : prevIndex + 1
      ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <Container>
      <Row>
        <Col xs="8">
          <div className='article_style'>
            <div className="slideshow">
              <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {article.map((item, index) => (
                  <div className="slide" key={index}><Image className='product_image' src={require("./" + item.image)} alt={item.name} fluid></Image></div>
                ))}
              </div>

              <div className="slideshowDots">
                {article.map((_, idx) => (
                  <div
                    key={idx}
                    className={`slideshowDot${index === idx ? " active" : ""}`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <p className='article_text'>{article[0].text}</p>
          </div>
        </Col>
        <Col xs="2"></Col>
      </Row>
      <div id="course" className='jumpSpace'></div>
    </Container>


  );
}
