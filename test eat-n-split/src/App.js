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


function Button({children,onClick}){

  return(
    <button className="button" onClick={onClick}>{children}</button>
  )
}


export default function App() {
const [ouvert,setOuvert] = useState(false);
const [friends,setFriends] = useState(initialFriends);
const [amiChoisi,setAmiChoisi] = useState(null);

function ouvrirFormulaireDajoutAmi(){
  setOuvert(!ouvert);
};

function ajouterNouvelAmi(friend){

  setFriends([...friends, friend]);
  setOuvert(false)
}
function selectionerAmi(friend){
  setAmiChoisi(choisi =>  choisi?.id === friend.id ? null : friend);
  setOuvert(false)
}
function handleDiviserFacture(value){
  setFriends( friends => friends.map(friend =>
    friend.id === amiChoisi.id ?
    {...friend, balance:friend.balance + value} : friend
  ));
  setAmiChoisi(null);
}

  return (

    <div className="app">
      <div className="sidebar">
     <Friendslist friends = {friends}
                  selectionerAmi={selectionerAmi}
                  amiChoisi = {amiChoisi}/>

     {ouvert ? <FormulaireDajoutAmi friends = {friends} 
     ajouterNouvelAmi= {ajouterNouvelAmi}/> : null}


     <Button onClick={ouvrirFormulaireDajoutAmi}>{ouvert ? "close" : "Add friend"}</Button>
      </div>

      {amiChoisi ? <DiviserFacture amiChoisi = {amiChoisi}
       onDiviserFacture= {handleDiviserFacture}/> : null}
    </div>
  )
}

function Friendslist({friends, selectionerAmi,amiChoisi}){

 
  return(
    <ul>
      {friends.map((friend) => <Friend friend={friend} key={friend.id} 
      selectionerAmi={selectionerAmi} amiChoisi = {amiChoisi}/>)}
    </ul>
  )
}

function Friend({friend,selectionerAmi,amiChoisi}){
const estchoisi = amiChoisi?.id === friend.id;

  return(
  <li className={estchoisi ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    <p className={friend.balance < 0 ? "red" : 
                  friend.balance > 0 ? "green" :
                  ""}>
      {friend.balance < 0 ? `you owe ${friend.name} ${-friend.balance}$` :
      friend.balance > 0 ? `${friend.name} owes you ${friend.balance}$` :
      `You and ${friend.name} are even`}
    </p>
    <Button onClick={() => selectionerAmi(friend)}>
      {estchoisi ? "close": "select"}</Button>
  </li>
  );
}


function FormulaireDajoutAmi({friends,ajouterNouvelAmi}) {

  const [name,setName] = useState("");
  const [image,setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handlesoumission(e){
    e.preventDefault();

    if( !name || !image) return ;

    const id = crypto.randomUUID;

    const NouvelAmi = {
      id,
      name,
      image: `${image} ?= ${id}`,
      balance: 0
    }

    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
    ajouterNouvelAmi(NouvelAmi);
    

  }
  return(

  <form className="form-add-friend" onSubmit={handlesoumission}>
    <label>👨🏽‍🤝‍👨🏽 Nom Ami</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>


    <label>📷 Url Image</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
    <Button>Add</Button>
  </form>
 
  )
}

function DiviserFacture({amiChoisi,onDiviserFacture}){
  const [facture,setFacture] = useState("");
  const [maDepense,setMaDepense] = useState("");
  const [payeur, setPayeur] = useState("user");
  const depenseAmi = facture ? facture-maDepense : "";
  function handleSubmit(e) {
    e.preventDefault();

    if(!facture || !maDepense) return;
    onDiviserFacture(payeur === "user" ? depenseAmi : -maDepense)
  }
  
  return(

    <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>PARTAGER LA FACTURE AVEC {amiChoisi.name}</h2>

        <label>💰 Valeur Facture</label>
        <input type="text" value={facture} onChange={(e) => setFacture(Number(e.target.value))}/>

        <label>🙍‍♂️ Ma Depense</label>
        <input type="text" value={maDepense} onChange={(e) => 
        setMaDepense(Number(e.target.value) > facture ? maDepense : Number(e.target.value))}/>

        <label>👨🏽‍🤝‍👨🏽 {amiChoisi.name}'s depense</label>
        <input type="text" disabled value={depenseAmi}/>

        <label>🤑Qui paie la Facture ?</label>
        <select value={payeur} onChange={(e) => setPayeur(e.target.value)}>

          <option value='user'>Moi</option>
          <option value= 'friend'>{amiChoisi.name}</option>
        </select>
        <Button> Diviser Facture</Button>
    </form> 
  )
}
