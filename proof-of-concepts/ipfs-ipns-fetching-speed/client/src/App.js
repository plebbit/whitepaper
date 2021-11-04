import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  async function Case1() {
    console.log((await axios.get('http://localhost:5000/subplebbit/latest/100')).data);
  }
  async function Case2() {
    console.log((await axios.get('http://localhost:5000/subplebbit/QmNhhyJkyBppPfEuyvjqmpcSHFkisMxQcyY4Q4smrUM3BP')).data);
  }
  async function Case3() {
    console.log((await axios.get('http://localhost:5000/post/QmdqrxGvj7bXCYaW1fRBQcZShtFfX83o2hmJ4N9LVirS4b')).data);
  }
  async function switchGateway() {
    if (count === 1) {
      await axios.post('http://localhost:5000/gateway', {
        IPFS_GATEWAY: "https://cloudflare-ipfs.com"
      });
      setCount(0);
    } else {
      await axios.post('http://localhost:5000/gateway', {
        IPFS_GATEWAY: "http://localhost:48084"
      });
      setCount(1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={Case1}>Case 1</button>
        <button onClick={Case2}>Case 2</button>
        <button onClick={Case3}>Case 3</button>
        <button onClick={switchGateway}>Switch gateway</button>
      </header>
    </div>
  );
}

export default App;
