import { useState, useEffect } from "react"
 
export default function Local_Storage() {
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const data = window.localStorage.getItem('is_showing')
    if (data !== null) {setShowBanner(JSON.parse(data))}
  }, [])

  useEffect(() => {
    window.localStorage.setItem('is_showing', JSON.stringify(showBanner)) // the JSON.stringify is mainly for objects
  }, [showBanner])
   
  return (
    <>
      <br />
      <br />
      {showBanner && (
      <>
        <h1>KUGKHGCVKHGCK</h1>
        <button onClick={() => setShowBanner(false)}>
            Hide it
        </button>
      </>
      )}
      {!showBanner && (
      <button onClick={() => setShowBanner(true)}>
        Show it
      </button>
      )}
    </>
  )
}