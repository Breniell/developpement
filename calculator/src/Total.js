



export default function Total({price, tip}) {

    // const total = price + average;
    // const average = 5 ;
    // const price = 62;

    return(
        <h3> 
        You pay $ {price + tip} ( ${price} + ${tip} tip)
        </h3>
    );

}