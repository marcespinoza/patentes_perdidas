import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import { Card, Button, Container, Row, Table, Col } from 'react-bootstrap';

export function ImageGrid(props) {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div >
            <Container >
                <Row xs={3} md={3} className="g-2">    
                {props.images.map((image, idx) => {
                    return (
                        <Col key={idx} xs={6} md={4} lg={3}>

                        <Card className="border border-dark border-1">
                        <Card.Img style={{ width: '10rem', height:'10rem' }} variant="top" src={image.imgUrl}/ >
                            <Card.Body>
                              <Card.Text>
                              {image.txtVal}
                              </Card.Text>
                            </Card.Body>
                            </Card>
                            </Col>
                    )
                })}
                </Row>

            </Container>
        </div>
    );
}