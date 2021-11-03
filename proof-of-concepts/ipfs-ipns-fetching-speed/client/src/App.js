import './App.css';
import axios from 'axios';

function App() {
  async function localCase1() {
    console.log((await axios.get('http://localhost:3000/subplebbit/latest/100')).data);
  }
  async function localCase2() {
    console.log((await axios.get('http://localhost:3000/subplebbit/QmajRHjvKCzuUspW8QoxM3GmNDxrHZRsM92D4e1EBsZQbH')).data);
  }
  async function localCase3() {
    console.log((await axios.get('http://localhost:3000/post/QmdqrxGvj7bXCYaW1fRBQcZShtFfX83o2hmJ4N9LVirS4b')).data);
  }
  async function cloudfareCase1() {
    console.log((await axios.get('http://localhost:3000/subplebbit/latest/100')).data);
  }
  async function cloudfareCase2() {
    console.log((await axios.get('http://localhost:3000/subplebbit/QmajRHjvKCzuUspW8QoxM3GmNDxrHZRsM92D4e1EBsZQbH')).data);
  }
  async function cloudfareCase3() {
    console.log((await axios.get('http://localhost:3000/post/QmdqrxGvj7bXCYaW1fRBQcZShtFfX83o2hmJ4N9LVirS4b')).data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={localCase1}>Case 1 Local</button>
        <button onClick={localCase2}>Case 2 Local</button>
        <button onClick={localCase3}>Case 3 Local</button>
        <button onClick={cloudfareCase1}>Case 1 Cloudfare</button>
        <button onClick={cloudfareCase2}>Case 2 Cloudfare</button>
        <button onClick={cloudfareCase3}>Case 3 Cloudfare</button>
      </header>
    </div>
  );
}

export default App;
