import React from 'react';
import {useSelector} from "react-redux";
import {selectTypes} from 'features/itinerary/itinerarySlice';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

export function ItineraryAddModal({open, formData, handleClose, handleChange, handleStepSubmit}) {

    const types = useSelector(selectTypes);

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Ajouter une étape</DialogTitle>

                <DialogContent>

                    <DialogContentText>Les champs type, date et heure sont obligatoires</DialogContentText>

                    <div className="form-dialog-input">
                        <TextField
                            id="standard-select-currency"
                            select
                            value={formData.type}
                            name="type"
                            onChange={handleChange}
                            helperText="Veuillez choisir un type (*)"
                            variant="outlined"
                        >
                            {types.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className="form-dialog-input">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="date"
                            onChange={handleChange}
                            name="stepDay"
                            variant="outlined"
                            helperText="Veuillez choisir une date (*)"
                            fullWidth
                        />
                    </div>

                    <div className="form-dialog-input">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="time"
                            onChange={handleChange}
                            name="stepHour"
                            variant="outlined"
                            helperText="Veuillez choisir une heure (*)"
                            fullWidth
                        />
                    </div>

                    <div className="form-dialog-input">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            type="text"
                            onChange={handleChange}
                            name="title"
                            variant="outlined"
                            helperText="Titre de l'étape (facultatif)"
                            fullWidth
                        />
                    </div>

                    <div className="form-dialog-input">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            type="text"
                            onChange={handleChange}
                            name="description"
                            variant="outlined"
                            helperText="Description de l'étape (facultatif)"
                            fullWidth
                        />
                    </div>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={handleStepSubmit} color="primary">
                        Créer l'étape
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
