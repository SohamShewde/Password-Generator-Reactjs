import { useCallback, useEffect, useState , useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$^*!";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()   // ? is used if value is 0 

   // passwordRef.current?.setSelectionRange(0 , 5)  this is used to select range to copy
   
    window.navigator.clipboard.writeText(password)
  }, [password])

  //below function is used to run the passwordGenerator function
  useEffect(() => {
    passwordGenerator()
  } ,[length, numAllowed, charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-auto mx-auto   shadow-md rounded-lg px-10 my-10 text-orange-500 bg-gray-700 grid place-content-center h-screen'>
        <h1 className="text-center text-white  my-3">Password Generator</h1>


        <div className='flex shadow rounded-lg overflow-hidden mb-10'>

          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='password'
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} // this to inc or dec value of length
            />
            <label>Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numerInput'
              onChange={() =>
                setNumAllowed((prev) => !prev)
              }
            />
            <label>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() =>
                setCharAllowed((prev) => !prev)
              }
            />
            <label>Character</label>
          </div>


        </div>
      </div>

    </>
  )
}

export default App
