import React, { useState, useEffect } from "react";
import DropzoneComponent from 'react-dropzone-component'
import API from './Api'
import "./App.css";


/**
 *
 * @returns {Function} - App function
 */
const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [ignore, setIgnore] = useState(false); // flag use to enforce single exec of setData
  const [picId, setPicId] = useState(Math.floor(Math.random() * 20) + 1); // generate random number 
  const [memoizedGetImage, setMemoizedGetImage] = useState(() => { }); // store function

  // create new API instance
  const api = new API({ url: '' })
  // create route
  api.createRoute({ name: 'images' })


  /**
   * get all images
   */
  const getImages = async () => {
    const response = await api.endpoints.images.getAll();
    if (response) {
      setData([]);
      setData(response.data);
    } else {
      setError(api.getErrorMsg().message);
    }
  };

  useEffect(() => {
    /**
     *get image from server by id
     * @param {Number} picId
     */
    const getImage = async (picId) => {
      try {
        const response = await api.endpoints.images.getOne({ id: picId })
        if (ignore) return
        if (response) {
          setData(response.data);
        } else {
          setError(api.getErrorMsg().message);
        }
      } catch (error) {
        setError(error);
      }
    }
    getImage(picId);
    setIgnore(true)
    setMemoizedGetImage(() => getImage)
  }, []);

  /**
   * get base64 image sources
   * @returns {Object} imageSrcs - image sources
   */
  const getImageSources = () => {
    let imageSrcs = [];
    if (data.length) {
      imageSrcs = data.map(img => {
        if (!img.image) return false;
        const buf = img.image.data;
        return [...imageSrcs, `data:image/png;base64,${arrayBufferToBase64(buf)}`];
      });
    }
    return imageSrcs;
  };

  /**
   * Convert buffer array to string
   * @param {String} buf
   * @returns {String} base-64 encoded ASCII string
   */
  const arrayBufferToBase64 = buf => {
    let binary = "";
    const bytes = new Uint8Array(buf);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const imgSources = getImageSources();
  let images
  if (imgSources.length) {
    images = imgSources.map((src, ix) => {
      return (
        <React.Fragment key={ix}>
          <img width={400} height={400} src={src} alt="thumbnail" />
          <hr />
        </React.Fragment>
      );
    });
  }

  const componentConfig = {
    iconFiletypes: ['.jpg', '.jpeg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'no-url'
  };

  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpg,image/jpeg,image/png,image/gif",
    autoProcessQueue: false
  };

  const handleFileAdded = acceptedFile => {
    // Do something with the files
    console.log("file added", acceptedFile)
    const formData = new FormData()
    // const file = acceptedFiles[0]
    formData.append('image', acceptedFile, acceptedFile.name)
    api.endpoints.images.upload({ formData })
  }

  // const callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
  // const callback = () => console.log('Hello!');
  // const success = file => console.log('uploaded', file);
  const removedfile = file => console.log('removing...', file);
  // const eventHandlers = { addedfile: (file) => console.log(file) }
  // let dropzone = null;
  const eventHandlers = {
    addedfile: handleFileAdded,
    removedfile
  }
  return (
    <div className="App" style={{ backgroundColor: "#b9ccef" }}>
      <div>
        <button onClick={() => memoizedGetImage(picId)}>Get single picture</button>
        <input
          id="number"
          type="number"
          max={1000}
          min={1}
          value={picId}
          onChange={e => setPicId(e.target.value)}
          placeholder="input id"
        />
      </div>
      <div>
        <button onClick={getImages}>Get all pictures</button>
      </div>
      <DropzoneComponent className='drop-zone' config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig} />
      <h1>Curtis, fetched data shown in console</h1>
      {images}
      {error ? <span>{error}</span> : ""}
    </div>
  );
};

export default App;
