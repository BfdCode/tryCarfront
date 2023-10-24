import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
    });

    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            year: props.data.row.year,
            fuel: props.data.row.fuel,
            price: props.data.row.price,
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    }

    return (
        <div>
            <IconButton>
                <EditIcon color="primary" onClick={handleClickOpen}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="brand"
                            name="brand"
                            autoFocus
                            variant="standard"
                            value={car.brand}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="model"
                            name="model"
                            variant="standard"
                            value={car.model}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="color"
                            name="color"
                            variant="standard"
                            value={car.color}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="year"
                            name="year"
                            variant="standard"
                            value={car.year}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="price"
                            name="price"
                            variant="standard"
                            value={car.price}
                            onChange={handleChange}
                        />
                        <br />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCar;