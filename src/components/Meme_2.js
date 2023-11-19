import { useState, useEffect } from "react"
import imageIcon from "../images/image-icon.png"

export default function Meme_2() {
  // const [State, setState] = useState(1)
  // function updateState() {
  //   setState(prevState => prevState+1)
  // }

  const [memeState, setMemeState] = useState({ // why not initiating it inside the useEffect directly with the fetch value?
                                               // (and then not have setMemeState in the useEffect)
                                               // answer: it is not a good practice, ask gpt for more details
    topText: '',
    bottomText: '',
    img: ""
  })

  const [imagesState, setImagesState] = useState([])

  function updateMeme(event) {
    const { name, value } = event.target

    if (name) {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        [name]: value
      }))
    } else {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        img: imagesState[Math.floor(Math.random()*imagesState.length)].url
    }))
  }
  }

  function getMemes() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json()) // note that '.json()' is an ansynchronous function 
      .then(data => {  // to use async instead the 'then's look at the comment below
        const mappedMemes = data.data.memes.map(meme => ({id: meme.id, url: meme.url})) // this command will not be skipped until finished, 
                                                                  // unlike setting states which is asynchronous
        setImagesState(mappedMemes) // this line and the next one could be in separated 'then's sequentally instead of
                            // this trick but this trick gives faster performance as this 2 lines are not really dependent of each other
                            // and it is better to execute them in paralel, which is possible as satting a state is asynchronous
        setMemeState(prevMemeState => ({
          ...prevMemeState,
          img: mappedMemes[Math.floor(Math.random()*mappedMemes.length)].url
        }))
      })
  }

  // // with async:
  // async function getMemes() {
  //   const res = await fetch("https://api.imgflip.com/get_memes")
  //   const data = await res.json()
  //   const mappedMemes = data.data.memes.map(meme => meme.url)
  //   setImagesState(mappedMemes)
  //   setMemeState(prevMemeState => ({
  //     ...prevMemeState,
  //     img: mappedMemes[Math.floor(Math.random()*mappedMemes.length)]
  //   }))
  // }

  useEffect(() => {
    getMemes()
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