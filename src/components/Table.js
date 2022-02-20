import { useEffect, useState } from 'react'
import "./Table.css"

import Icon from "./SortIcon"

const Table = (props) => {

    const [sortBy, setSortBy] = useState("sur_name")
    const [order, setOrder] = useState("descending")
    const [sortedArray, setSortedArray] = useState([])
    

    const filterArray = (filterField) => {
        if (filterField === undefined){
            filterField = sortBy
        }
        if(order === "descending"){
            setSortedArray(props.csvArray.sort((a, b) =>{return a[filterField] > b[filterField] ? 1 : -1}))
        }       
        if(order === "ascending"){
            setSortedArray(props.csvArray.sort((a, b) =>{return b[filterField] > a[filterField] ? 1 : -1}))
        }
    }
    

    const handleClick = (filterField) => {
        if (sortBy === filterField && order === "ascending"){
            setOrder("descending")
        }
        else if (sortBy === filterField && order === "descending"){
            setOrder("ascending")
        }
        if (sortBy !== filterField){
            setOrder("descending")
        }

        setSortBy(filterField)

        filterArray(filterField)
    }
    useEffect(() => {
        filterArray()
    },[props.csvArray])

    return(
        <>
        {sortedArray.length>0 ?
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleClick("first_name")}>
                                <div className='aligner'>
                                    <div>First name</div> 
                                    <Icon/>
                                </div>
                            </th>
                            <th onClick={() => handleClick("sur_name")}>
                                <div className='aligner'>
                                    <div>Sur name</div>
                                    <Icon/>
                                </div>
                            </th>
                            <th onClick={() => handleClick("issue_count")}>
                                <div className='aligner'>
                                    <div>Issues</div> 
                                    <Icon/>
                                </div>
                            </th>
                            <th onClick={() => handleClick("date_of_birth")}>
                                <div className='aligner'>
                                    <div>Date of birth</div> 
                                    <Icon/>
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
                </table>
             : null}
        </>
    )
}

export default Table