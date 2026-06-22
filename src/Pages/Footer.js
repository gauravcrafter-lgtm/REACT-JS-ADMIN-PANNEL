

import React from 'react'

export default function Footer() {
  return (
  
    <div style={{
      width: "100%",
      backgroundColor: "#1e2a33",
      color: "white",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "14px",
      
      bottom: "0",
      left: "0"
    
    }}>

      {/* Left Side */}
      <div style={{
  position: "relative", 
  top: "-7px"  ,
  color: "grey"     
}}>
  © 2025 - 2026 Naman Technolab
</div>

      {/* Right Side */}
  <div style={{ marginRight: "30px", whiteSpace: "nowrap",height:"30px",color: "grey"}}>
  Powered By:
  <a 
    href="https://namantechnolab.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontWeight: "bold",
      color: "grey",
      textDecoration: "none",
      marginLeft: "14px",
      marginTop: "30px"
      
   
     
    }}
  >
    Naman Technolab
  </a>
</div>

    </div>
  
  )
}