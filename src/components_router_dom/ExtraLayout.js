import { useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom"

export default function ExtraLayout() {     
    // const [number, setNumber] = useState(4) 
    const [searchParams, setSearchParams] = useSearchParams({ n: 4 })  // similar to a state, but will also add this data to the url, 
                                                        // but only once it is changed for the first time. why doesn't is add the default?  
    const number = searchParams.get("n")    
    
    return (
      <>
        <h1>extras list:</h1>
        <nav>
          <ul>
            <li>
                <Link to="/extra/1">Extra 1</Link> 
            </li>
            <li>
                <Link to="/extra/2">Extra 2</Link>
            </li>
            <li>
                <Link to="/extra/3">Extra 3</Link> 
            </li>
            <li>
                <Link to={`/extra/${number}`}>Extra {number}</Link> 
            </li>
          </ul>
        </nav>
        <Outlet context={{a: 1, b:2}} />  {/* This line is important for rendering nested routes */}
        <input 
          type="number" 
          value={number || 4} // single source of truth
          // onChange={e => setNumber(e.target.value)} 
          onChange={e => setSearchParams({n: e.target.value})} 
        />

      </>      
    )
  }