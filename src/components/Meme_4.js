import { useState, useEffect, useRef } from "react";
import imageIcon from "../images/image-icon.png";
import axios from 'axios';

export default function Meme_4() {
  const [memeState, setMemeState] = useState({
    topText: '',
    bottomText: '',
    img: ''
  });

  const canvasRef = useRef(null);

  function updateMeme(event) {
    const { name, value } = event.target;
    if (name) {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        [name]: value
      }));
    } else {
      getImage();
    }
  }

  function downloadMeme() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";  // This line attempts to address cross-origin issues
    img.src = memeState.img;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(memeState.topText.toUpperCase(), canvas.width / 2, 30);
      ctx.fillText(memeState.bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'meme.png';
      link.click();
    };
  }

  function getImage() {
    axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/image/', { timeout: 5000 })
    .then(response => {
    if (response.status === 200) {
    setMemeState(prevMemeState => ({
    ...prevMemeState,
    img: response.data
    }));
    } else {
    // Handle non-200 responses
    console.error(`Error: Received status code ${response.status}`)
    }
    })
    .catch(error => {
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data)
    console.error(error.response.status)
    console.error(error.response.headers)
    } else if (error.request) {
    // The request was made but no response was received
    console.error(error.request)
    } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message)
    }
    console.error(error.config)
    })
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <main>
      <div className="form">
            <div className="input-text-row">
            <input
                onChange={updateMeme}
                className="top-text-bar"
                type="text"
                placeholder="top text"
                name="topText"
                value={memeState.topText}>
            </input>
            <input
                onChange={updateMeme}
                className="bottom-text-bar"
                type="text"
                placeholder="bottom text"
                name="bottomText"
                value={memeState.bottomText}>
            </input>
            </div>
            <button onClick={updateMeme} className="get-new-image-button">
            <p>Get a new meme image</p>
            <img src={imageIcon} />
            </button>
        </div>
        <div className="meme">
            <img className="meme-image" src={memeState.img} />
            <div className="text-flex">
            <p className="top-text">{memeState.topText.toUpperCase()}</p>
            <p className="bottom-text">{memeState.bottomText.toUpperCase()}</p>
            </div>
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        <button onClick={downloadMeme} className="download-button">Download Meme</button>
    </main>
  );
}