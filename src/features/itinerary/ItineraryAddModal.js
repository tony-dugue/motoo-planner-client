import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function ItineraryAddModal({open, handleClose, position}) {

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ajouter une étape</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La : {position.lat}
                        Long : {position.lng}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Créer l'étape
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
