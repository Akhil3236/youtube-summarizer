import { useEffect, useState } from 'react'

function App() {


  const [summary,setsummary]=useState("");

  const submitit=()=>{

  //  here we has to take the trasnscrpit of the youtube tab and we has to send

        
  // the transcrpit id will be sended to the backend and the back end will provcess it

  
  }
  return (
    <>

     <div className='new_word'>
      <h2>YouTube Enhancer</h2>

     <button >Explain It</button>

     <textarea 
     rows="10"
        cols="35"
        value={summary}
        readOnly
        style={{ marginTop: "10px" }}
     >
     </textarea>
      
    </div>


    </>
  )
}

export default App
