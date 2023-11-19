import { useState } from "react"
import imageIcon from "../images/image-icon.png"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getImage } from "../api/posts.js";

export default function Meme_5() {

  const queryClient = useQueryClient()

  const imageQuery = useQuery({ // it is triggered when first rendering and also when queryClient.invalidateQueries("image") is
                                // triggered, which we later do when button is clicked
    queryKey: ["images"],
    queryFn: getImage,
    refetchOnWindowFocus: false,  // Add this if you don't want refetching on window focus
    onSuccess: data => {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        img: data
      }));
    }
});

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
      queryClient.invalidateQueries("image")
  }
  }
 
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



// alternative code with useRef:

// import { useRef, useState } from "react";
// import imageIcon from "../images/image-icon.png";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getImage } from "../api/posts.js";

// export default function Meme_5() {
//   const queryClient = useQueryClient();

//   const imageQuery = useQuery({
//     queryKey: ["images"],
//     queryFn: getImage,
//     refetchOnWindowFocus: false,
//     onSuccess: data => {
//       setMemeState(prevMemeState => ({
//         ...prevMemeState,
//         img: data,
//       }));
//     },
//   });

//   const [memeState, setMemeState] = useState({
//     topText: "",
//     bottomText: "",
//     img: "",
//   });

//   const topTextRef = useRef();
//   const bottomTextRef = useRef();

//   function updateMeme(event) {
//     const { name, value } = event.target

//     if (name) {
//       setMemeState(prevMemeState => ({
//         ...prevMemeState,
//         [name]: value,
//       }));
//     } else {
//       queryClient.invalidateQueries("image");
//     }
//   }

//   return (
//     <main>
//       <div className="form">
//         <div className="input-text-row">
//           <input
//             onChange={updateMeme}
//             ref={topTextRef}
//             className="top-text-bar"
//             type="text"
//             placeholder="top text"
//             name="topText"
//             value={memeState.topText}
//           ></input>
//           <input
//             onChange={updateMeme}
//             ref={bottomTextRef}
//             className="bottom-text-bar"
//             type="text"
//             placeholder="bottom text"
//             name="bottomText"
//             value={memeState.bottomText}
//           ></input>
//         </div>
//         <button onClick={updateMeme} className="get-new-image-button">
//           <p>Get a new meme image</p>
//           <img src={imageIcon} />
//         </button>
//       </div>
//       <div className="meme">
//         <img className="meme-image" src={memeState.img} />
//         <div className="text-flex">
//           <p className="top-text">{memeState.topText.toUpperCase()}</p>
//           <p className="bottom-text">{memeState.bottomText.toUpperCase()}</p>
//         </div>
//       </div>
//     </main>
//   );
// }