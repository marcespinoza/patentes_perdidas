import React, { Component, useEffect, useState } from 'react';
import './style.css';
import { storage, textDB } from './Firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc, getDoc, getDocs } from '@firebase/firestore';

export function ImageUploader() {

    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [imgSrc, setImgSrc] = useState('')
    const [isLoading, setIsLoading] = React.useState(false);


    const uploadImage = () => {
        if (imageUpload == null) {
          
        } else {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(data => {
          getDownloadURL(data.ref).then(val =>{
            const valRef = collection(textDB, 'txtData')
            addDoc(valRef, {txtVal:'PROBANDO', imgUrl: val})
          })
        })
       }
      }
    
      function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          setCrop(undefined) // Makes crop preview update between images.
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            setImgSrc(reader.result?.toString() || ''),
          )
          reader.readAsDataURL(e.target.files[0])
        }
      }
    
      const getData = async () => {
        const valRef = collection(textDB, 'txtData')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
        setData(allData)
      }
    
      useEffect(()=>{
        //getData()
      })
    
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

    return (
        <div className="container" style={{ height: '100vh' , width:'100%'}}>
        <div className="col-md-5 mx-auto d-flex flex-column">
          {(
            <h3 className="fw-bold mb-3 h2">Subí la imagen de la patente.</h3>
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
                }}
                className="form-control mt-5 mb-2"
              />
              <img id="previewImage"  src={previewImage} alt="image"/>
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Escanear imagen"
              />
            </>
          )}
          {(
            <>
              <textarea
                className="form-control" 
                style={{height: '100%'  }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <input
                type="button"
                onClick={uploadImage}
                className="btn btn-primary mt-5"
                value="Guardar"
              />
            </>
          )}
        </div>
        </div>
    );
}

export default ImageUploader;