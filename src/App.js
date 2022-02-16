import './App.css';
import { useState } from 'react'
import CsvReader from './components/CsvReader';
import Table from './components/Table';

function App() {

  const [csvArray, setCsvArray] = useState([]);
  return (
    <div>

    <CsvReader setCsvArray={setCsvArray}/>

    <Table csvArray={csvArray}/>

    </div>
  );
}

export default App;
