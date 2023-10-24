import React from "react";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../Constants";
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import EditCar from './EditCar.js';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const columns = [
        { field: 'brand', headerName: 'Marque', width: 200 },
        { field: 'model', headerName: 'Modèle', width: 200 },
        { field: 'color', headerName: 'Couleur', width: 200 },
        { field: 'year', headerName: 'Année', width: 150 },
        { field: 'price', headerName: 'Prix', width: 150 },

        // {
        //     field: '_links.owner.href',
        //     headerName: 'Owner',
        //     sortable: false,
        //     filterable: false,
        //     renderCell: (row) => (
        //        <EditCar data={row} updateCar={updateCar} /> 
        //     ),
        // },

        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
               <EditCar data={row} updateCar={updateCar} /> 
            ),
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            // renderCell: (row) => {    //des parenthese et non des crochets
            //     <button onClick={() => onDelClick(row.id)}>Delete</button>
            // },
            renderCell: row => (
                <IconButton onClick={() => onDelClick(row.id)}>
                    {/* Delete */}
                    <DeleteIcon color="error"/>
                </IconButton>
            ),
        },
    ];

    useEffect(()=> {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch(SERVER_URL + 'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    };

    const addCar = car => {
        fetch(SERVER_URL + 'api/cars', {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(car),
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            } else{
                alert("something went wrong");
            }
        })
        .catch(err => console.error(err));
    };

    const updateCar = (car, link) => {
        fetch(link, {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(car),
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            } else{
                alert("something went wrong");
            }
        })
        .catch(err => console.error(err));
    };

    const onDelClick = url => {
        if (window.confirm("Are you sure to delete ?")){
            fetch(url, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                    setOpen(true);
                } else{
                    alert("something went wrong");
                }
            })
            .catch(err => console.error(err));
        }
    };

    return (
        <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />  
            </Stack>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={(row) => row._links.self.href}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="voiture suprimee"
                />
            </div>
        </React.Fragment>
    );
}



// le premier redu 



//     // return (
//     // <div>
//     //     <table>
//     //         <tbody>
//     //             {cars.map((car, index) => (
//     //                 <tr key={index}>
//     //                     <td>{car.brand}</td>
//     //                     <td>{car.model}</td>
//     //                     <td>{car.color}</td>
//     //                     <td>{car.year}</td>
//     //                     <td>{car.price}</td>
//     //                 </tr>
//     //             ))}
//     //         </tbody>
//     //     </table>
//     // </div>
//     // );

