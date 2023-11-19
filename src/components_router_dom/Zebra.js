import Header from "../components/Header.js"
import Meme_4 from "../components/Meme_4.js"

export default function Zebra() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
  // which can happen for example when a component has an api call that is fed to a state,
  // then that component will rerender infinately. managing these side effects is important                      

  return (
    <div className="container">
      <Header />
      {/* <Meme /> */}
      {/* <Meme_2 /> */}
      {/* <Meme_3 /> */}
      <Meme_4 />
      {/* <Form /> */}
    </div>
  )
}