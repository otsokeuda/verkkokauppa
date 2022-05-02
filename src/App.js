import './App.css';
import products from "./products";

function App() {
  return (
    <div className="App">

      <div className="top">
        <p className='logo'>VERKKOKAUPPA</p>
        <input className='search'></input>
        
      </div>

      <div className='teksti'>
        <h2>TUOTTEET</h2>
      </div>

     

      <div className='tuotteet'>

      {products.map((item, i) => (
        <div key={i}>

          <img className="images" src={item.imageUrl} alt="images"></img>

          <p className='names'>{item.title}</p>

          <h1 className='prices'>{item.price}€</h1>
          
        </div>
        ))}
       </div>

    </div>
  );
}

export default App;
