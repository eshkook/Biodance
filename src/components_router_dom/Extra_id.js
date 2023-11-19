import { useOutletContext, useParams } from 'react-router-dom'
import Form from "../components/Form.js"
import Header from "../components/Header.js"
import Meme_3 from "../components/Meme_3.js"

export default function Extra_id() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
  // which can happen for example when a component has an api call that is fed to a state,
  // then that component will rerender infinately. managing these side effects is important                      
  const { id } = useParams()
  const context = useOutletContext()
  const a = context.a

  return (
    <div className="container">
      <p>id is {id}</p>
      <h1>value of a is {a}</h1>
      <Header />
      {/* <Meme /> */}
      {/* <Meme_2 /> */}
      <Meme_3 />
      {/* <Meme_4 /> */}
      <Form />
    </div>
  )
}