import { useEffect, useState } from 'react'
import "./Table.css"

import Icon from "./SortIcon"

/**
 * Table renders a table and handles all sorting events. 
 * @param {*} props 
 * @returns 
 */
const Table = (props) => {
    const [order, setOrder] = useState("DESC")
    const [lastSorted, setLastSorted] = useState('sur_name')
    const [sortedArray, setSortedArray] = useState([])

    const filterArray = (filterField) => {

        //simple sorting, it flips the sort order on every call
        if(order === "ASC" && lastSorted === filterField){
            setSortedArray(props.csvArray.sort((a, b) =>{return a[filterField] > b[filterField] ? 1 : -1}))
            setOrder("DESC")
        }       
        if(order === "DESC" && lastSorted === filterField){
            setSortedArray(props.csvArray.sort((a, b) =>{return a[filterField] < b[filterField] ? 1 : -1}))
            setOrder("ASC")
        }
        //this last if statement makes sure the sorted field is always ordered in a descending way on the first filter
        if(lastSorted !== filterField){
            setSortedArray(props.csvArray.sort((a, b) =>{return a[filterField] > b[filterField] ? 1 : -1}))
            setOrder("DESC")
        }

        setLastSorted(filterField)
    }

    // makes sure we call the sort on the first render
    useEffect(() => {
        filterArray("sur_name")
    },[props.csvArray])

    return(
        <>
        {sortedArray.length>0 ?
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => filterArray("first_name")}>
                                <div className='aligner'>
                                    <div>First name</div> 
                                    <Icon field="first_name" sorted={lastSorted} order={order}/>
                                </div>
                            </th>
                            <th onClick={() => filterArray("sur_name")}>
                                <div className='aligner'>
                                    <div>Sur name</div>
                                    <Icon field="sur_name"  sorted={lastSorted} order={order}/>
                                </div>
                            </th>
                            <th onClick={() => filterArray("issue_count")}>
                                <div className='aligner'>
                                    <div>Issues</div> 
                                    <Icon field="issue_count" sorted={lastSorted} order={order}/>
                                </div>
                            </th>
                            <th onClick={() => filterArray("date_of_birth")}>
                                <div className='aligner'>
                                    <div>Date of birth</div> 
                                    <Icon field="date_of_birth" sorted={lastSorted} order={order}/>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedArray.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.first_name}</td>
                                    <td>{item.sur_name}</td>
                                    <td>{item.issue_count}</td>
                                    <td>{item.date_of_birth.toLocaleString('en-EN', {year: 'numeric', month: "short", day: "numeric"})}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan = '100%'>
                        <button onClick={() => props.setCsvArray([])}>Upload new data</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
             : null}
        </>
    )
}

export default Table