import { useState, useEffect } from "react"

export default function Form() {

  const [formState, setFormState] = useState({
    topText: '',
    bottomText: '',
    comments: '',
    isFriendly: true,
    employment: "",
    favCol: ''
  })

  function updateFormState(event) { 
    const {name, value, type, checked} = event.target
    setFormState(prevFormState => ({
      ...prevFormState, 
      [name]: type === "checkbox" ? checked : value
    }))
  }

  function handleSubmit(event) { 
    event.preventDefault() // preventing re-rendering the page 
    console.log(formState)
    // api send the data submitted
  }

  const [starWarsData, setStarWarsData] = useState({})
  useEffect(() => {
  fetch("http://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setStarWarsData(data))
  }, [formState]) // without the dependancies array, the function inside the use state will be run at the end of each rendering and will cause an infinite loop.
                  // the dependancies array causes this function to be run at the end of a render only if one of its elements has been changed  since last render.
                  // obviously this function will be run after the first render of the website.
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  function watchWidth() {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", watchWidth)

    return function() {
      window.removeEventListener("resize", watchWidth)
    } 
  }, [])

  return (
    <div className="form-practice">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-text-row">
          <input onChange={updateFormState} 
                 className="top-text-bar" 
                 type="text" 
                 placeholder="top text" 
                 name="topText"
                 value={formState.topText}/> {/* this make us have a single source of truth rather than thae state and the value being a duplicate of information. makes our code faster */}
        </div>
        <div className="input-text-row">
          <input onChange={updateFormState} 
                 className="bottom-text-bar" 
                 type="text" 
                 placeholder="bottom text" 
                 name="bottomText"
                 value={formState.bottomText}/>
        </div>  
        <div className="input-text-row">
          {/* text area" */}
          <textarea onChange={updateFormState} 
                      placeholder="comments" 
                      name="comments"
                      value={formState.comments}/>   
        </div>     
        <div className="input-text-row">
          {/* checkbox. it is tied to the checkbox above because we write htmlFor="isFriendly" */}
          <input type="checkbox"
                 onChange={updateFormState} 
                 name="isFriendly"
                 checked={formState.isFriendly}/> 
          <label htmlFor="isFriendly">Are you friendly</label>         
        </div>
        <div className="input-text-row">
          {/* radio button */}
          <fieldset>
            <legend>Current Employment Status</legend>
            <input type="radio"
                 id="unemployed"
                 name="employment"
                 value="unemployed"
                 checked={formState.employment === "unemployed"} // single source of truth 
                 onChange={updateFormState}
                 /> 
            <label htmlFor="unemployed">Unemployed</label>
            <br />
            <input type="radio"
                 id="part-time"
                 name="employment"
                 value="part-time"
                 checked={formState.employment === "part-time"}
                 onChange={updateFormState}
                 /> 
            <label htmlFor="part-time">Part-time</label>
            <br />      
            <input type="radio"
                 id="full-time"
                 name="employment"
                 value="full-time"
                 checked={formState.employment === "full-time"}
                 onChange={updateFormState}
                 /> 
            <label htmlFor="full-time">Full-time</label>
            <br />  
          </fieldset>
        </div>  
        <div className="input-text-row">
          {/* checkbox. it is tied to the checkbox above because we write htmlFor="isFriendly" */}
          <select 
                 onChange={updateFormState} 
                 id="favCol"
                 name="favCol"
                 value={formState.favCol}>
            <option value="">---Choose---</option>      
            <option value="red">Red</option>
            <option value="blue">Blue</option>  
            <option value="green">Green</option>
          </select>     
          <label htmlFor="favCol">Your favorite color</label>         
        </div>
        <button className="get-new-image-button">  {/* a button inside a form is automatically of type 'submit */}
          <p>Submit</p>
        </button>                                    
      </form>
      <h1>
        Window width: {windowWidth}
        {/* Window width: {window.innerWidth} will not work because it will just read the initial value and not track changes unless it is a state */} 
      </h1>
      {/* <pre>
        {JSON.stringify(starWarsData, null, 2)}
      </pre> */}
    </div>
  )
}