import { useState } from 'react'

const Table = (props) => {
    const [sortBy, setSortBy] = useState("surname")
    const [order, setOrder] = useState("ascending")
    console.log(props.csvArray)
    return(
        <>
        {props.csvArray.length>0 ?
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Sur Name</th>
                            <th>Issue Count</th>
                            <th>Date of birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.csvArray.map((item, i) => (
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