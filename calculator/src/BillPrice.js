import { useState } from "react"



export default function BillPrice({price, onSetPrice}){
   

    return(
    <div>
    <span>How much was the Bill ?</span>
    <input type="text" placeholder="Entrez le prix ..." value={price} 
      onChange={(e) => onSetPrice(Number(e.target.value))}/>

      
    </div>
    
    )
}