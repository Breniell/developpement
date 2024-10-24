import { useEffect, useState } from "react";
import "./index.css"; // Import du fichier CSS

function App() {
  const [montant, setMontant] = useState("1"); // Conserver comme string
  const [de, setDe] = useState("EUR");
  const [a, setA] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${montant}&from=${de}&to=${a}`
      );
      const data = await res.json();
      setConverted(data.rates[a]);
      setIsLoading(false);
    }

    if (de === a) return setConverted(montant);
    convert();
  }, [montant, de, a]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Ne mettre à jour que si c'est un nombre valide ou une chaîne vide (pour gérer les backspaces)
    if (/^\d*\.?\d*$/.test(value)) {
      setMontant(value); // On ne convertit pas immédiatement
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Currency Converter</h1>
      <div className="converter-container">
        <input
          disabled={isLoading}
          type="text" // Utiliser "text" au lieu de "number" pour éviter les comportements indésirables
          value={montant}
          onChange={handleChange}
          className="currency-input"
        />
        <CurrencySelect
          label="From:"
          value={de}
          onChange={(e) => setDe(e.target.value)}
          disabled={isLoading}
        />
        <CurrencySelect
          label="To:"
          value={a}
          onChange={(e) => setA(e.target.value)}
          disabled={isLoading}
        />
        <div className="result">
          {isLoading ? <Loader /> : <p>{converted} {a}</p>}
        </div>
      </div>
    </div>
  );
}

function CurrencySelect({ label, value, onChange, disabled }) {
  return (
    <div className="select-wrapper">
      <label className="select-label">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="currency-select"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
}

function Loader() {
  return <div className="loader"></div>;
}

export default App;
