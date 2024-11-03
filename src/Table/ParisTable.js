import { FindTable } from "./FindTable"
import { GetItems } from "../Query/DataQuery"
import { useEffect,useState } from "react"

export const ParisTable = () =>{
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const itemList = await GetItems();
            setItems(itemList);
        }
        fetchData();
    }, []);


    return(
        <div className="paris-table p-3 bg-dark rounded">
            {/* find */}
            <table className="table table-striped table-bordered table-dark">
                    <FindTable/>
                    <thead className="thead-dark"> 
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Barcode</th>
                            <th scope="col">Nama Barang</th>
                            <th scope="col">Merk</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Input date</th>
                            <th scope="col">Update date</th>
                            <th scope="col" className="text-center">Action</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        
                        {items.map((item,index) => (
                            <tr key={index}>
                                <th scope="row" className="align-middle">{index+1}</th>
                                    <td className="align-middle">{item.barcode}</td>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="align-middle">{item.merk}</td>
                                    <td className="align-middle">Rp {item.price}</td>
                                    <td className="align-middle">{item.created_date}</td>
                                    <td className="align-middle">{item.updated_date}</td>
                                    <td className="text-center">
                                        <button className="paris-btn btn btn-light btn-sm">&nbsp; Edit &nbsp;</button>&nbsp;
                                        {/* <button className="paris-btn btn btn-warning btn-sm">Publish</button>&nbsp; */}
                                        <button className="paris-btn btn btn-danger btn-sm">Delete</button>
                                    </td>
                            </tr>
                        )) }                        
                    </tbody>
                    </table>
        </div>
    )
}