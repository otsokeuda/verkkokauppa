import './App.css';
import products from "./products";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { TiShoppingCart } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

function App() {

  const [cart, setCart] = useState(products);
  const [visible, setVisible] = React.useState(false);

  const addToCart = i => {
    setVisible(!visible)
    setCart(prevState =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal
          };
        }
        return item;
      })
    );
    
  };

  const increaseQuantity = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1
            };
        }
        return item;
      })
    );   
  };

  const decreaseQuantity = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = i => {
    setCart(prevCart =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false
          };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Kori on tyhjä</b>
    ) : (
      <>
        <b>
          <p>Tuotteita korissa: {cartCountTotal}</p>
          <p>
            Loppusumma: $
            {Number.isInteger(cartPriceTotal)
              ? cartPriceTotal
              : cartPriceTotal.toFixed(2)}
          </p>
        </b>
      </>
    );

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.name}>
      {item.inCart && (
        <>
          <p> Tuote: {item.title}</p>
          <p>
            Määrä: <button onClick={() => decreaseQuantity(i)}>-</button>{" "}
            {item.count} <button onClick={() => increaseQuantity(i)}>+</button>
          </p>
          <p>
            Yhteensä: $
            {Number.isInteger(item.count * item.price)
              ? item.count * item.price
              : `${(item.count * item.price).toFixed(2)}`}
          </p>
          <button onClick={() => removeFromCart(i)}>Poista korista</button>
          <hr />
        </>
      )}
    </React.Fragment>
  ));

 

  
  return (
    <div className="App">

      <header className="top">
        <p className='logo'>VERKKOKAUPPA</p>
        <input className='search'></input>
        <button className='cart' onClick={() => setVisible(!visible)}>{visible ? <ImCross className='icon2'/> : <TiShoppingCart className='icon'/>}</button>
     
      </header>

    {visible && 
      <div className='inCart'>
        {cartItems}
        {cartTotals()}
      </div>}

      <div className='teksti'>
        <h2>TUOTTEET</h2>
      </div>

     

      <div className='tuotteet'>

      {products.map((item, i) => (
        <div key={i}>

          <img className="images" src={item.imageUrl} alt="images"></img>
          <p className='names'>{item.title}</p>
          <h1 className='prices'>{item.price}€</h1>
          <button onClick={() => addToCart(i)}>Lisää ostoskoriin</button>
        
          </div>
        ))}
       </div>

    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
