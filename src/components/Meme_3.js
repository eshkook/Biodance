import { useState, useEffect } from "react"
import imageIcon from "../images/image-icon.png"

export default function Meme_3() {
  const [memeState, setMemeState] = useState({ // why not initiating it inside the useEffect directly with the fetch value?
                                               // (and then not have setMemeState in the useEffect)
                                               // answer: it is not a good practice, ask gpt for more details
    topText: '',
    bottomText: '',
    img: ''
  })

  function updateMeme(event) {
    const { name, value } = event.target

    if (name) {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        [name]: value
      }))
    } else {
        getImage()
  }
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
    getImage()
  }, [])

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
    </main>
  )
}