
import { useState } from 'react';

import BillPrice from './BillPrice';
import MyAverage from './MyAverage';
import MyFriendsAverage from './MyFriendsAverage';
import Total from './Total';
import Reset from './reset';

export default function App() {

  const [price,setPrice] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = price * ((percentage1 + percentage2)/2 /100);

  function handleReset(){
    setPrice("")
    setPercentage1(0)
    setPercentage2(0)
  }
  return (
    <div className="App">
      <BillPrice price = {price} onSetPrice={setPrice}/>
      <MyAverage percentage1 = {percentage1} onSelect1={setPercentage1} />
      <MyFriendsAverage percentage2 = {percentage2} onSelect2={setPercentage2}/>

      { price > 0 && (
      <>
      <Total price = {price} tip={tip}/> 
      <Reset onReset = {handleReset}/>
      </>
      )
     }
  
    </div>
  );
}