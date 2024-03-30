import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { FaCopy } from "react-icons/fa6";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

function App() {
     const [length, setLength] = useState(5)
     const [password, setPassword] = useState("")
     const [number, setNumber] = useState(false)
     const [special, setSpecial] = useState(false)
     const [capital, setCapital] = useState(false)
     const [small, setSmall] = useState(false)

     const [isChecked, setIsChecked] = useState({
          capital: false,
          small: false,
          number: false,
          special: false
     })

     const passwordGenerator = useCallback(() => {
          let pass = ""
          let string = ""
          if (number) string += "0123456789"
          if (special) string += "~!@#$%^&*(){}-+"
          if (capital) string += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          if (small) string += "abcdefghijklmnopqrstuvwxyz"

          for (let i = 0; i < length; i++) {
               let value = Math.floor(Math.random() * string.length)
               pass += string.charAt(value)
          }
          setPassword(pass)

     }, [length, small, capital, special, number])

     useEffect(() => {
          passwordGenerator()
     }, [length, small, number, special, capital])


     const passwordRefer = useRef(null)

     const HandleCopy = useCallback(() => {
          passwordRefer.current?.select()
          window.navigator.clipboard.writeText(password)
     }, [password])

     const HandleReverse = ()=>{
          passwordGenerator()
     }

     return (
          <>
               <div className="main-container">
                    <div className="heading">
                         <h1>Password Generator</h1>
                    </div>
                    <div className="input-field">
                         <input
                              type="text"
                              value={password}
                              placeholder='Select any one checkbox to generate password'
                              className='input'
                              readOnly
                              ref={passwordRefer}
                         />
                         <HiMiniArrowPathRoundedSquare className='reverse-icon' size={20} style={{ fill: 'rgb(173, 19, 161)' }} onClick={HandleReverse} />
                    </div>
                    <div className="copy-text">
                         <div className="text-bar">
                              <input
                                   type="range"
                                   min={5}
                                   max={50}
                                   value={length}
                                   id="range"
                                   onChange={(e) => setLength(e.target.value)}
                              />
                              {/* <HiMiniArrowPathRoundedSquare /> */}
                              <h3>password length : {length} </h3>


                         </div>
                         <button
                              className='copy-button'
                              onClick={HandleCopy}
                         >
                              <FaCopy size={20} style={{ fill: 'whitesmoke' }} />
                              <p>Copy</p>
                         </button>
                    </div>
                    <div className="options">
                         <div id="capital">
                              <input
                                   type="checkbox"
                                   id="capital"
                                   checked={isChecked.capital}
                                   onClick={() => setCapital((previous) => !previous)}
                                   onChange={() => setIsChecked({ ...isChecked, capital: !isChecked.capital })} />
                              <label
                                   htmlFor="capital"
                                   className={isChecked.capital ? "checked" : ""}>
                                   A-Z
                              </label>
                         </div>
                         <div id="small">
                              <input
                                   type="checkbox"
                                   id='small'
                                   onClick={() => setSmall((previous) => !previous)}
                                   checked={isChecked.small}
                                   onChange={() => setIsChecked({ ...isChecked, small: !isChecked.small })} />
                              <label
                                   htmlFor="small"
                                   className={isChecked.small ? "checked" : ""}>
                                   a-z
                              </label>
                         </div>
                         <div id="number">
                              <input
                                   type="checkbox"
                                   id='number'
                                   onClick={() => setNumber((prev) => !prev)}
                                   checked={isChecked.number}
                                   onChange={() => setIsChecked({ ...isChecked, number: !isChecked.number })} />
                              <label
                                   htmlFor="number"
                                   className={isChecked.number ? "checked" : ""}>
                                   0-9
                              </label>
                         </div>
                         <div id="special">
                              <input
                                   type="checkbox"
                                   id="special"
                                   checked={isChecked.special}
                                   onClick={() => setSpecial(previous => !previous)}
                                   onChange={() => setIsChecked({ ...isChecked, special: !isChecked.special })} />
                              <label
                                   htmlFor="special"
                                   className={isChecked.special ? "checked" : ""}>
                                   !@#$
                              </label>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default App
