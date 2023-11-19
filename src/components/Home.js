import { useState } from "react"
import Query_1 from "../components_query/Query_1.js"
import Query_2 from "../components_query/Query_2.js"
import Query_3 from "../components_query/Query_3.js"
import Form from "./Form.js"
import Authentication from "../components_authentication/Authentication.js"
import Authentication_Cognito from "../components_authentication/Authentication_Cognito.js"
import Header from "./Header.js"
import Meme from "./Meme.js"
import Audio from "./Audio.js"
import Meme_2 from "./Meme_2.js"
import Meme_3 from "./Meme_3.js"
import Meme_4 from "./Meme_4.js"
import Meme_5 from "./Meme_5.js"
import Lambda from "./Lambda.js"
import Local_Storage from "./Local_Storage.js"

export default function Home() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
  // which can happen for example when a component has an api call that is fed to a state,
  // then that component will rerender infinately. managing these side effects is important

  const [currentPage, setCurrentPage] = useState(<Meme_5 />)

  return (
    <div className="container">
      <Header />
      <br />
      <br />
      <button onClick={() => setCurrentPage(<Meme />)}> {/* not the correct way, better with Link */}
        Meme 1
      </button>
      <button onClick={() => setCurrentPage(<Meme_2 />)}>
        Meme 2
      </button>
      <button onClick={() => setCurrentPage(<Meme_3 />)}>
        Meme 3
      </button>
      <button onClick={() => setCurrentPage(<Meme_4 />)}>
        Meme 4
      </button>
      <button onClick={() => setCurrentPage(<Meme_5 />)}>
        Meme 5
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Form />)}>
        Form
      </button>
      <button onClick={() => setCurrentPage(<Authentication />)}>
        Authentication
      </button>
      <button onClick={() => setCurrentPage(<Authentication_Cognito />)}>
        Authentication Cognito
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Query_1 />)}>
        Query 1
      </button>
      <button onClick={() => setCurrentPage(<Query_2 />)}>
        Query 2
      </button>
      <button onClick={() => setCurrentPage(<Query_3 />)}>
        Query 3
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Local_Storage />)}>
        Local Storage
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Lambda />)}>
        Lambda
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Audio />)}>
        Audio
      </button>
      <br />
      {currentPage}
    </div>
  )
}