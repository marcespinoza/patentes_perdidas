import React from 'react';
import ReactDOM from 'react-dom';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './home';
import ImageUploader from './imageUploader';


ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/uploader" exact element={<ImageUploader/>}></Route>
        </Routes>
    </Router>,
    document.getElementById('root')
  );
