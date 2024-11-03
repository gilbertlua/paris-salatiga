import { FindTable } from "./FindTable";
import { DeleteData, GetItems } from "../Query/DataQuery";
import { useEffect, useState } from "react";

export const ParisTable = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const itemList = await GetItems();
            setItems(itemList);
        }
        fetchData();
    }, []);

    const  handleDelete = async (itemId) =>{
        alert('yakin?')
        try{
            await DeleteData(itemId)
            alert('delete successfully')
        }
        catch(error){
            alert('gagal' + error)
        }
    }

    return (
        <div className="paris-table p-3 bg-dark rounded">
            {/* find */}
            <table className="table table-striped table-bordered table-dark">
                <FindTable />
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
                    {items.map((item, index) => (
                        <tr key={index}>
                            <th scope="row" className="align-middle">{index + 1}</th>
                            <td className="align-middle">{item.barcode}</td>
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{item.merk}</td>
                            <td className="align-middle">Rp {item.price}</td>
                            <td className="align-middle">
                                {/* {item.created_date?.toDate().toLocaleDateString()} */}
                            </td>
                            <td className="align-middle">
                                {/* {item.updated_date?.toDate().toLocaleDateString()} */}
                                {item.id}
                            </td>
                            <td className="text-center">
                                <button className="paris-btn btn btn-light btn-sm">&nbsp; Edit &nbsp;</button>&nbsp;
                                <button onClick={() => handleDelete(item.id)} className="paris-btn btn btn-danger btn-sm" >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
