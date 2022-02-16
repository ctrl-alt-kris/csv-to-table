import { useState } from 'react'


/**
 * 
 * CsvReader handles all the csv related events. It has a form to upload the file. Once uploaded it reads the file 
 * @param {*} props 
 * @returns 
 */
const CsvReader = (props) => {
    const [csvFile, setCsvFile] = useState();

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text)
        }

        reader.readAsText(file);
    }

    const processCSV = (str, delim=';') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const object = headers.reduce((obj, header, i) => {
                if (header === "issue_count"){
                    obj[header] = parseInt(values[i]);
                    return obj;
                }
                else if (header.trim() === "date_of_birth"){
                    obj[header.trim()] = new Date (values[i]);
                    return obj;
                }
                else{
                    obj[header] = values[i];
                    return obj;
                }
            }, {})
            return object;
        })

        props.setCsvArray(newArray)
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button                
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}>
                Submit
            </button>
        </form>
    );

}

export default CsvReader