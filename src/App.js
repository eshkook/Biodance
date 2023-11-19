import { Link, NavLink, Route, Routes, useLocation, BrowserRouter } from "react-router-dom"
import Home from "./components/Home.js"
import MoreContent from "./components_router_dom/MoreContent.js"
import Extra from "./components_router_dom/Extra.js"
import ExtraLayout from "./components_router_dom/ExtraLayout.js"
import Extra_id from "./components_router_dom/Extra_id.js"
import LayoutWrapper from "./components_router_dom/LayoutWrapper.js"
import NotFound from "./components_router_dom/NotFound.js"
import OverAllLayout from "./components_router_dom/OverAllLayout.js"
import Ultra from "./components_router_dom/Ultra.js"
import ZebraRoutes from "./components_router_dom/ZebraRoutes.js"
import Authentication from "./components_authentication/Authentication.js"
import Authentication_Cognito from "./components_authentication/Authentication_Cognito.js"
import Login from "./components_authentication/Login.js"
import Login_Cognito from "./components_authentication/Login_Cognito.js"
import SignUp from "./components_authentication/SignUp.js"
import SignUp_Cognito from "./components_authentication/SignUp_Cognito.js"
import Confirmation_Cognito from "./components_authentication/Confirmation_Cognito.js"
import You_are_logged from "./components_authentication/You_are_logged.js"
import You_are_logged_Cognito from "./components_authentication/You_are_logged_Cognito.js"
import Audio from "./components/Audio.js"
import "./styles/index.css"; // relevant for the NavLinks in this code

export default function App() {

  // console.log("rendered") // a way to make sure you don't have a bug that causes infiniite renders,
  // which can happen for example when a component has an api call that is fed to a state,
  // then that component will rerender infinately. managing these side effects is important  

  const location = useLocation()
  // console.log(location)            

  return (
    <>
      <Routes>
        <Route path="/ultra" element={<MoreContent />} />
      </Routes>

      {/* the location makes every page to be is if it if ultra: ????????????????????????????? weird */}
      {/* <Routes location="/ultra">
        <Route path="/ultra" element={<MoreContent />} />
      </Routes> */}
      <nav>
        <ul>
          <li>
            {/* Link is better than the regular 'a href' tag as it does in internally without refreshing the entire page. if you add the reloadDocument property, it becomes like href */}
            <Link to="/" replace>Home</Link> {/* replace makes it such that clicking back in this page will take you 2 pages back. good for example to keep logged in users logged in */}
          </li>
          <li>
            {/* the 'end' next line makes the css properties stick to this 'extra' url only when being exactly on it, and not also when you land on its children */}
            <NavLink end
              style={({ isActive }) => {
                return isActive ? { color: 'red' } : {}
              }}
              to="/extra">
              {({ isActive }) => {
                return isActive ? 'extra active' : 'extra'
              }}
            </NavLink>  {/* now the link will be red and say 'extra active' if we are in this extra route */}
          </li>
          <li>
            {/* the state is stored in the useLocation hook: */}
            <NavLink to="/ultra" state="Hi state">Ultra</NavLink>
          </li>
          <li>
            <Link to="/zebra">Zebra</Link>
          </li>
        </ul>
      </nav>
      {/* {location.state} it shows on screen even without tags like<p></p> */}
      <Routes>
        <Route element={<OverAllLayout />}> {/* without 'path' makes it relevant to all the paths children */}
          <Route path="/" element={<Home />} />
          <Route path="/extra" element={<ExtraLayout />}>
            <Route index element={<Extra />} />
            <Route path=":id" element={<Extra_id />} />
          </Route>
          <Route path="/ultra" element={<LayoutWrapper />}>
            <Route index element={<Ultra />} />
          </Route>
          <Route path="/zebra/*" element={<ZebraRoutes />} /> {/* routes themselves are imported */}
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/youarelogged" element={<You_are_logged />} />

          <Route path="/authentication_cognito" element={<Authentication_Cognito />} />
          <Route path="/login_cognito" element={<Login_Cognito />} />
          <Route path="/signup_cognito" element={<SignUp_Cognito />} />
          <Route path="/confirmation_cognito" element={<Confirmation_Cognito />} />
          <Route path="/youarelogged_cognito" element={<You_are_logged_Cognito />} />
          <Route path="/audio" element={<Audio />} />

          <Route path="*" element={<NotFound />} /> {/* any sub-route that is not one of the above will fall here */}
        </Route>
      </Routes>
    </>
  )
}

// App build specification for aws amplify:
// version: 1
// frontend:
//   phases:
//     preBuild:
//       commands:
//         - npm ci
//     build:
//       commands:
//         - npm run build
//   artifacts:
//     baseDirectory: build
//     files:
//       - '**/*'
//   cache:
//     paths:
//       - node_modules/**/*
