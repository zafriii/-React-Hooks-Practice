import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'


function App() {

  const [length, setLength] = useState(6);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState("");

   const passRef = useRef(null);

   const passGenerator = useCallback(() => {

      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%^&*-_+=[]{}~`";

      for (let i=1;i<=length;i++) {

        let char = Math.floor (Math.random () * str.length + 1);
        pass += str.charAt(char) ;
      }

      setPassword(pass);

      },[length, numberAllowed, charAllowed]);

      useEffect ( () => {

        passGenerator()

      },[length, numberAllowed, charAllowed, passGenerator]);

    
   const copyPass = useCallback(() => {

    passRef.current.select();
    window.navigator.clipboard.writeText(password);

   }, [password]);


  return (
    <>
    
     <div className="container">
     <h4>Password Generator</h4>
     <div className="pass-field">
      <input type="text" 
       value={password}
       className='pass'
       placeholder='password'
       readOnly
       ref={passRef}
      />
      <button onClick={copyPass}>Copy</button>
      </div>

       <div className="fields">
         
         <div className="length">
          <input type="range" 
           min = {6}
           max = {10}
           value={length}
           onChange={(e)=>{setLength(e.target.value)}}
           />
          <label>Length : {length}</label>
          </div>

          <div className="number">

            <input type="checkbox" 
             defaultChecked = {numberAllowed}
             id = 'numberInput'
             onChange={() => {
              setNumber((prev)=> !prev)
             }}
            />
             <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className="char">

            <input type="checkbox" 
             defaultChecked = {charAllowed}
             id = 'charInput'
             onChange={() => {
              setChar((prev)=> !prev)
             }}
            />
             <label htmlFor='charInput'>Characters</label>
          </div>
         </div>
        
       </div> 

     

    </>
  )
}

export default App
