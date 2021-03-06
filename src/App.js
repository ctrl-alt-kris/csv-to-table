import './App.css';
import { useState } from 'react'
import CsvReader from './components/CsvReader';
import Table from './components/Table';

function App() {

  const [csvArray, setCsvArray] = useState([]);

  return (
    <div className='container'>
      
    {csvArray.length === 0 &&
    
      <CsvReader setCsvArray={setCsvArray}/>
    
    }
    {csvArray.length > 0 &&
    <div>
        <Table csvArray={csvArray} setCsvArray={setCsvArray}/>
       
      </div>
    }

    
    </div>
  );
}

export default App;
