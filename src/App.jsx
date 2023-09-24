import { useState, useCallback, useEffect, useRef } from "react"
// import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] =useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str+="!@#$%^&*(){}~"
    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,10)
    window.navigator.clipboard.writeText(password)},[password])

  useEffect(()=>{passwordGenerator()},[length, numberAllowed, charAllowed,passwordGenerator])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md px-4 py-3 my-8 text-orange-500 bg-gray-700 rounded-lg">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly  ref={passwordRef}></input>
        <button className="outline-none text-white px-3 shrink-0" onClick={copyPasswordToClipBoard}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gat-x-1">
          <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}/>
          <label className="">Length:{length}</label>
        </div>
        <div className="flex items-center gat-x-1">
          <input type="checkbox" defaultValue={numberAllowed} onChange={() => {setNumberAllowed((prev) => !prev)}} />
          <label htmlFor="numerInput">Numbers</label>
        </div>
        <div className="flex items-center gat-x-1">
          <input type="checkbox" defaultValue={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
