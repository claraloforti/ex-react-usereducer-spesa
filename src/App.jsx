import { useReducer } from "react";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const isAdded = addedProducts.find(p => p.name === action.payload.name);
      if (isAdded) {
        action.payload.quantity = isAdded.quantity + 1;
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map(p => p.name === action.payload.name ?
        { ...p, quantity: action.payload.quantity } : p)
    case 'REMOVE_ITEM':
      return addedProducts.filter(p => p.name !== action.payload)
    default:
      return state;
  }
}



function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);


  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity),
    0);


  return (
    <>
      <h1>Prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <p>{p.name} - {p.price.toFixed(2)}€</p>
            <button onClick={() =>
              dispatchCart({ type: 'ADD_ITEM', payload: p })}>
              Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (<>
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((p, i) => (
            <li key={i}>
              <p>
                <input
                  type="number"
                  value={p.quantity}
                  onChange={e => dispatchCart({
                    type: 'UPDATE_QUANTITY',
                    payload: { name: p.name, quantity: parseInt(e.target.value) }
                  })
                  } />
                <span> x {p.name} </span>
                <span>{p.price.toFixed(2)}€</span>
              </p>
              <button onClick={() =>
                dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>
                Rimuovi dal carrello</button>
            </li>
          ))}
        </ul>
        <h2>Totale da pagare: {totalToPay.toFixed(2)}€</h2>
      </>)}
    </>
  )
}

export default App
