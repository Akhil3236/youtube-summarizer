import { useState } from 'react'
import axios from "axios";

import { jsPDF } from "jspdf";



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

};


const handleDownload = (format) => {
  if (format === "txt") downloadSummary();
  if (format === "pdf") downloadAsPDF();
};


const downloadSummary = () => {
  const element = document.createElement("a");
  const file = new Blob([summary], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "YouTube_Summary.txt";
  document.body.appendChild(element);
  element.click();
};



const downloadAsPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(summary, 180);
  doc.text(lines, 10, 10);
  doc.save("YouTube_Summary.pdf");
};  
  return (
    <>

     <div className='new_word'>
      <h2>YouTube Enhancer</h2>

     <button onClick={submitit} >Explain It</button>

     <select onChange={(e) => handleDownload(e.target.value)}>
          <option value="">Download as...</option>
          <option value="txt">Text</option>
          <option value="pdf">PDF</option>
     </select>

     

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
