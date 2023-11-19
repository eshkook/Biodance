import { useState } from "react"
import imageIcon from "../images/image-icon.png"
import memes_data from "../data/memes_data.json"

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

export default function Meme() {
  
  const [memeData, setMemeData] = useState(memes_data) 
  const [memeId, setMemeId] = useState(getRandomElement(memeData).id)
  const [memeInfo, setMemeInfo] = useState({
    img: memeData[memeId].img,
    backgroundColor: memeData[memeId].backgroundColor, 
  })
  
  function updateMeme() { 
    setMemeId(getRandomElement(memeData).id)
    setMemeInfo(prevMemeInfo => ({
      ...prevMemeInfo,
      img: memeData[memeId].img,
      backgroundColor: memeData[memeId].backgroundColor, 
      }))

    // if we wanted to use the old value of a state variable when setting it, best practice is to use a callback function:
    // setImg(prevImg => prevImg + 'blabla')

    // if you have a dict and you want to update some of its properties (like adding it 1):
    // const [ourDict, setDict] = useState({a:1, b:2})
    // setDict(prevDict => ({...prevDict, b: prevDict.b + 1})) // the '()' in the last phrase are important

    // if you have an array and you want to update some of its properties (like adding 1 to the k-th element):
    // const [ourDict, setOurDict] = useState([1,2,3,4,5])
    // setArray(prevArray => ([...prevArray[:k], prevArray[k]+1, ...prevArray[k+1:]])) // the '()' in the last phrase are important
    
    // another way:
    // setArray(prevArray => {
    //  return prevArray.map((element) => {
    //   return (element === k ? element+1 : element)
    //})
    //}
  }

  const [textState, setTextState] = useState({
    topText: '',
    bottomText: '',
  })

  function updateText(event) { 
    const {name, value} = event.target
    setTextState(prevTextState => ({
      ...prevTextState, 
      [name]: value
    }))
  }

  // function updateTopText(event) { 
  //   setMemeInfo(prevMemeInfo => ({...prevMemeInfo, topText: event.target.value}))
  // }

  // function updateBottomText(event) { 
  //   setMemeInfo(prevMemeInfo => ({...prevMemeInfo, bottomText: event.target.value}))
  // }

  const styles = { // it can be state if we need live changes. in fact it works even if it is not a state but is dependent on state... why???????????????????????????????
    backgroundColor: memeInfo.backgroundColor // note that backgroundColor is the javascript equivalent for the css 'background-color'
  }

  return (
    <main>
      <div className="form">
        <div className="input-text-row">
          <input 
            onChange={updateText} 
            className="top-text-bar" 
            type="text" 
            placeholder="top text" 
            name="topText"
            value={textState.topText}>
          </input>  
          <input 
            onChange={updateText} 
            className="bottom-text-bar" 
            type="text" 
            placeholder="bottom text" 
            name="bottomText"
            value={textState.bottomText}>
          </input>  
        </div>
        <button onClick={updateMeme} className="get-new-image-button">
          <p>Get a new meme image</p>
          <img src={imageIcon} />  
        </button>
      </div>
      <div className="meme">
        <img style={styles} className="meme-image" src={require(`../images/${memeInfo.img}`)} /> {/* note the conditional styling. in this case it is determined by prop but could also be dependent on state */}
        <div className="text-flex">
          <p className="top-text">{textState.topText}</p>
          <p className="bottom-text">{textState.bottomText}</p> 
        </div>  
      </div>
    </main>
      
    
  )
}