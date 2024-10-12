import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({children, onClick}){
  return <button className="button" onClick={onClick}>
    {children}</button>;
}

export default function App() {
  const [isOpen,setIsOpen] = useState(false);
  const [friends,setFriends] = useState(initialFriends);
  const  [selectedFriend, setSelectedFriend] = useState(null);



  function handleIsOpen() {
    setIsOpen(!isOpen);

  }

  function handleAddFriend(friend){

    setFriends(friends => [...friends,friend]);
    setIsOpen(false)
  }

  function handleSelection(friend){
    // setSelectedFriend(friend);
    setSelectedFriend( (cur) => cur?.id === friend.id ?
  null : friend);
  setIsOpen(false);
  }

  function handleSplitBill(value){
   setFriends(friends => friends.map( (friend) => friend.id 
  === selectedFriend.id 
  ? {...friend, balance:friend.balance + value} 
  : friend));

  setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}
        onSelection = {handleSelection} 
        selectedFriend={selectedFriend}/>


        {isOpen && <FormAddFriend onAddFriend = {handleAddFriend}/> }
        <Button onClick={handleIsOpen}>
          {isOpen ? "close" : "Add friend"}
        </Button>
      </div>

     {selectedFriend && <FormSplitBill 
     selectedFriend={selectedFriend} 
     onSplitBill = {handleSplitBill} />}
    </div>
  );
}



function FriendsList({friends,onSelection,selectedFriend}) {

  return (
    <ul>
      {friends.map((friend) => (
          <Friend 
          friend={friend}
          key={friend.id} 
          onSelection={onSelection} 
          selectedFriend={selectedFriend} />
      ))}
    </ul>
  );
}




function Friend( {friend,onSelection,selectedFriend} ) {


  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}


      {friend.balance === 0 && (
        <p>
          you and {friend.name} are even
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>{isSelected ? "close" : "select"}</Button>
    </li>
  );
}



function FormAddFriend({onAddFriend}) {
  const  [name,setName] = useState('');
  const  [image,setImage] = useState('https://i.pravatar.cc/48?u=499476');

  function handSubmit(e){
    e.preventDefault();

    if(!name || !image) return ;


    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image} ?= ${id}`,
      balance:0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48?u=499476');
  }
  return (

    <form className="form-add-friend" onSubmit={handSubmit}>
      <label>👨🏽‍🤝‍👨🏽Friend Name</label>
      <input type="text" value={name}
      onChange={ (e) => setName(e.target.value)}/>


      <label>📷Image Url</label>
      <input type="text" value={image}
      onChange={ (e) => setImage(e.target.value)}/>

      <Button>Add</Button>
    </form>

  );
}


function FormSplitBill({selectedFriend, onSplitBill}){

  const [bill,setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIspaying, setWhoIsPaying] = useState('user');



  function handSubmit(e){
    e.preventDefault();
    
    if(!bill || !paidByUser) return;

    onSplitBill(whoIspaying === 'user' ? paidByFriend : 
      -paidByUser);
  }

  return(
    <form className="form-split-bill" onSubmit={handSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input type="text" value={bill} 
      onChange={(e) => setBill(Number(e.target.value))} />

      <label>🙍‍♂️Your Expense</label>
      <input type="text"  value={paidByUser} 
      onChange={(e) => setPaidByUser(Number(e.target.value) > bill ?
      paidByUser : Number(e.target.value)
          )
        } 
      />

      <label>👨🏽‍🤝‍👨🏽{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend}/>

      <label> 🤑Who is paying the bill</label>
      <select  value={whoIspaying} 
      onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}