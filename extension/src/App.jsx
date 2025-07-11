import { useEffect, useState } from 'react'
import axios from "axios";
import { data } from 'react-router-dom';



function App() {


  const [summary,setsummary]=useState("");
  const [loading, setLoading] = useState(false);

  const submitit=async()=>{

  setLoading(true);
   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  



  if (!tab || !tab.id) {
        setsummary("No active YouTube tab found");
        return;
      }
  
   chrome.scripting.executeScript(
    {
      
      target:{tabId:tab.id},
      func: () => {
      const elements = document.querySelectorAll('ytd-transcript-segment-renderer');
      
      let text = "";
      elements.forEach(el => text += el.textContent + " ");
      return text;
    },

    },
    async (results)=>{

      const transcript=results[0].result;

      
     
      

      try{

        const newdata=await axios.post("http://localhost:2000/summerize",{transcript,});
  
        setsummary(newdata.data.summary);

        setLoading(false);
      }

      catch(err){

        console.log("The summary is not found");
        
      }

      
    }
   );


   

  
  }
  return (
    <>

     <div className='new_word'>
      <h2>YouTube Enhancer</h2>

     <button onClick={submitit} >Explain It</button>

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
