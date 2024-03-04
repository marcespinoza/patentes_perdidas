import React, { Component, useEffect, useState, useRef } from 'react';
import './style.css';
import { storage, textDB } from './Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc, getDoc, getDocs } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export function ImageUploader() {

    const [image, setImage] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showImg, setShowImg] = useState(false);
    const [celular, setCelular] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [nroPatente, setNroPatente] = React.useState('');
    const [showLoader, setShowLoader] = React.useState('');
    const formRef = useRef(null);

    async function uploadImage() {
        if (imageUpload == null) {
          
        } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        return await uploadBytes(imageRef, imageUpload).then(data => {
          getDownloadURL(data.ref).then(val =>{
            const valRef = collection(textDB, 'patentes')
            addDoc(valRef, {nro_patente:nroPatente,
                            provincia:"Formosa",
                            fecha:new Date().toLocaleString(),
                            celular:celular, 
                            correo:correo, 
                            imgUrl: val})
          })
        })
       }
      }             

      const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = formRef.current.checkValidity();    
        if (isFormValid) {
          setShowLoader(true)
          const result = uploadImage()
          setShowLoader(false)
          console.log('Form is valid! Submitting...'+result);
          setShowImg(!showImg)
          formRef.current.reset();
        } else {
          console.log('Form is not valid. Please check your inputs.');
        }
      };

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="container" style={{ height: '100vh' , width:'100%'}}>
        <div className="col-md-5 mx-auto d-flex flex-column text-center">
          <h3 className="fw-bold mb-3 h2">SUBI LA IMAGEN DE LA PATENTE</h3>
              <input
                required
                type="file"
                id='selectFile'
                accept="image/*"
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  setImageUpload(e.target.files[0]);
                  setShowImg(!showImg)
                }}
                className="form-control mt-5 mb-2"
              />
              {showImg && <img id="previewImage" src={previewImage} alt="image"/>}            
              <>
              <div className="col-md-6 mx-auto text-center">
                <input required type="text" pattern="[A-Za-z][A-Za-z]\d\d\d[A-Za-z][A-Za-z]" className="form-control text-center" onChange={(e) => { setNroPatente(e.target.value) }} placeholder="Formato XX123XX"/>
              <hr />
                <input  required type="text" 
                        name="celular" 
                        pattern="[0-9]{10}" 
                        className="form-control text-center" 
                        onChange={(e) => { setCelular(e.target.value) }} 
                        placeholder="Celular"
                        onInvalid={e => e.target.setCustomValidity('Mínimo 10 caracteres')}
                        onInput={e => e.target.setCustomValidity("")}
                  />
              <hr />
                <input required type="email" name="correo"  className="form-control text-center" onChange={(e) => { setCorreo(e.target.value) }} placeholder="Correo"  />
              </div>
              <input
                id="submit"
                type="submit"
                className="btn btn-primary mt-5"
                value="Guardar"
              />
            </>
        </div>
        </div>
       </form> 
    );
}

export default ImageUploader;