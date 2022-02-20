import { useState } from 'react'
import "./CsvReader.css"
/**
 * 
 * CsvReader handles all the csv related events. It has a form to upload the file. Once uploaded it reads the file 
 * @param {*} props 
 * @returns 
 */
const CsvReader = (props) => {
    const [csvFile, setCsvFile] = useState();
    const [invalidFile, setInvalidFile] = useState(false);


    //putting the types of accaptable files in an array for type checking
    //note I am not capable of checking this, as I only have access to a mac at the moment. 
    const acceptedFiles = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
    ]

    /**
     * Since the input only accepts csv and deletes anything else we dont have to validate the file. So submit only reads the file and outputs it as a string.
     * The string is then passed on to processCsv
     * 
     * the assumption here is that the file will always be the same, just with more or less data. 
     */
    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text)
        }
        reader.readAsText(file);
    }

    /**
     * processCsv takes the string  output of the submit function, it then creates an array of objects by processing the text.
     * the outputted array will be an object with key value pairs. where the key is equal to the header in the file. 
     * 
     * @param {*} text 
     * @param {*} deliminator 
     */
    const processCSV = (text, deliminator=';') => {
        const headers = text.slice(0,text.indexOf('\n')).split(deliminator);
        const rows = text.slice(text.indexOf('\n')+1).split('\n');
        const newArray = rows.map( row => {
            const values = row.split(deliminator);
            const object = headers.reduce((obj, header, i) => {
                // since this field regards ints, we need to parse them as such, otherwise the sort function will not work as intended. 
                if (header === "issue_count"){
                    obj[header] = parseInt(values[i]);
                    return obj;
                }
                //there seems to be a small mistake in the header of date of birth with a trailling space. So we trim the header
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

    if (csvFile) {
        submit()
    }

    return(
        <div className='form'>
            <div className='header'>Select your file</div>
            <p className='help_text'> File should be a CSV file</p>
                <input
                    className='upload_area'
                    type='file'
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    id='csvFile'
                    onChange={(e) => {
                        if (e.target.files[0] !== undefined){
                            if(!acceptedFiles.includes(e.target.files[0].type)){
                                //TODO Add error notification
                                e.target.value = null 
                                setInvalidFile(true)
                            }else{
                                setCsvFile(e.target.files[0])
                                setInvalidFile(false)
                            }
                        }
                    }}
                />
                {invalidFile &&
                <p className='error_text'>It seems that was not a csv file</p>         
}
        </div>
    );

}

export default CsvReader