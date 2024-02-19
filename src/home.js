import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

import './style.css';
import { storage, textDB } from './Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc, getDoc, getDocs } from '@firebase/firestore';
import { Card, Button, Container, Row, Table, Col, InputGroup, Form } from 'react-bootstrap';

const data = [
  { image: 'user1', value: 'John' },
  { key: 'user2', value: 'Kate' },
  { key: 'user3', value: 'Peter' },
];


const Home = () => {

  const [data, setData] = useState([]);

  const getData = async () => {
    const valRef = collection(textDB, 'txtData')
    const dataDb = await getDocs(valRef)
    const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
    setData(allData)
  }

  useEffect(()=>{
    getData()
  })

  
 return (
    <div>        
      <Container >
        <div>
        <div class="row" style={{ maxWidth: "100%" }}>
        <div class="d-flex flex-column">
            <div class="input-group mx-auto w-50">
                <input class="form-control border-end-0 border rounded-pill mx-auto" type="search" value="Número de patente" id="example-search-input"/>
                <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" type="button">
                        <i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
            <Button variant="outline-info mx-auto w-50" >Cargar imagen</Button>{' '}
        </div>
        
        </div>
        </div>
          
                <Row xs={3} md={3} className="g-2" style={{marginTop:'3%'}}>    
                {data.map((image, idx) => {
                    return (
                        <Col key={idx} xs={6} md={4} lg={3} style={{ position:'relative', width:'auto', minWidth:'auto', height:'auto', minHeight: '100%' }}>

                        <Card className="border border-dark border-1" >
                        <Card.Img  variant="center" style={{ display:'inline-block', width: '200px', height:'200px', backgroundSize:'cover', backgroundPosition:'center center'}}src={image.imgUrl}/ >
                            <Card.Body>
                              <Card.Text>
                              {image.txtVal}
                              </Card.Text>
                              <Card.Text>
                              "Marcelo"
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
};

export default Home;
