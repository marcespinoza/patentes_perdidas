import React, { Component, useEffect, useState } from 'react';
import './style.css';
import { storage, textDB } from './Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc, getDoc, getDocs } from '@firebase/firestore';

export function ImageUploader() {

    const [image, setImage] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [imgSrc, setImgSrc] = useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [showImg, setShowImg] = useState(false);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
      setFields({
        ...fields,
        [field]: value
      })
    }

    const uploadImage = () => {
        if (imageUpload == null) {
          
        } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(data => {
          getDownloadURL(data.ref).then(val =>{
            const valRef = collection(textDB, 'patentes')
            addDoc(valRef, {nro_patente:'PROBANDO', celular:'celu', correo:'correo', imgUrl: val})
          })
        })
       }
      }
        
      const handleSubmit = () => {
        setIsLoading(true);
        Tesseract.recognize(image, 'eng', {
          logger: (m) => {
            console.log(m);
            if (m.status === 'recognizing text') {
              setProgress(parseInt(m.progress * 100));
            } else {
              console.log(m);
            }
          },
        })
          .catch((err) => {
            console.error(err);
          })
          .then((result) => {
            console.log(result.data);
            setText(result.data.text);
            setIsLoading(false);
          });
      };

      const handleValidation = () => {
        const formFields = {...fields};
        const formErrors = {};
        let formIsValid = true;
    
        //Name
        if(!formFields["celular"]){
          formIsValid = false;
          formErrors["celular"] = "Cannot be empty";
        }
    
        if(typeof formFields["celular"] !== "undefined"){
          if(!formFields["celular"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            formErrors["celular"] = "Only letters";
          }       
        }
    
        //Email
        if(!formFields["correo"]){
          formIsValid = false;
          formErrors["correo"] = "Cannot be empty";
        }
    
        if(typeof formFields["correo"] !== "undefined"){
          let lastAtPos = formFields["correo"].lastIndexOf('@');
          let lastDotPos = formFields["correo"].lastIndexOf('.');
    
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            formFields["correo"] = "Email is not valid";
          }
        }     
  
        setErrors(formErrors)
        return formIsValid;
      }

      const formSubmit = (e) => {
        e.preventDefault();
        if(handleValidation()){
          alert("Form submitted");
        }else{
          alert("Form has errors.")
        }
      }

    return (
      <form onSubmit={e => formSubmit(e)}>

        <div className="container" style={{ height: '100vh' , width:'100%'}}>
        <div className="col-md-5 mx-auto d-flex flex-column text-center">
          {(
            <h3 className="fw-bold mb-3 h2">SUBI LA IMAGEN DE LA PATENTE</h3>
          )}
          { isLoading &&(
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {(
            <>
              <input
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
              <input
                type="button"
                hidden={true}
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Escanear imagen"
              />
            </>
          )}
          {(
            <>
            <div className="col-md-6 mx-auto text-center">
                <input type="text" className="form-control text-center"  placeholder="Numero patente"/>
              <hr />
                <input type="text" name="celular"  className="form-control text-center" placeholder="Celular" onChange={e => handleChange('celular', e.target.value)} value={fields["celular"] || ''}/>
                <span className="error">{errors["celular"]}</span>
              <hr />
                <input type="email" name="correo"  className="form-control text-center" placeholder="Correo" onChange={e => handleChange('correo', e.target.value)} value={fields["correo"] || ''} />
                <span className="error">{errors["correo"]}</span>
              </div>
              <input
              id="submit"
                type="button"
                onClick={uploadImage}
                className="btn btn-primary mt-5"
                value="Guardar"
              />
            </>
          )}
        </div>
        </div>
       </form> 
    );
}

export default ImageUploader;