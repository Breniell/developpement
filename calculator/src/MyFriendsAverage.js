import { Children, useState } from 'react';

export default function MyFriendsAverage({percentage2, onSelect2}){


    return(

        <div>
         <span>How did your friend like the service ?</span>

        <select value={percentage2} onChange={e => onSelect2(Number(e.target.value))}>
          <option value='0'>
            Dissatisfied(0%)
          </option>
          <option value='5'>
            It was okay (5%)
          </option>
          <option value='10'>
           It was good (10%)
          </option>
          <option value='20'>
           Absolutely amazing! (20%)
          </option>
        </select>


        </div>
    )
}