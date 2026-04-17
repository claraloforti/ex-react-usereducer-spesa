import { useState } from "react";


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts(curr => curr.map(p => p.name === name ? { ...p, quantity } : p)
    );
  }

  const addToCart = product => {
    const isAdded = addedProducts.find(p => p.name === product.name);
    if (isAdded) {
      updateProductQuantity(isAdded.name, isAdded.quantity + 1)
      return;
    }
    setAddedProducts(curr => [...curr, { ...product, quantity: 1 }
    ])
  }

  const removeFromCart = product => {
    setAddedProducts(curr => curr.filter(p => p.name !== product.name));

  }

  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity),
    0);


  return (
    <>
      <h1>Prodotti</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i}>
            <p>{product.name} - {product.price.toFixed(2)}€</p>
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (<>
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((p, i) => (
            <li key={i}>
              <p>{p.quantity} x {p.name} {p.price.toFixed(2)}€</p>
              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
            </li>
          ))}
        </ul>
        <h2>Totale da pagare: {totalToPay.toFixed(2)}€</h2>
      </>)}
    </>
  )
}

export default App
