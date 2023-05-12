import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import moment from 'moment';
import RideMap from "../common/RideMap";
import axios from 'axios';

export default function DemandRide(props) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);


    const handleClickOpen = () => {
        if (!localStorage.getItem('idp'))
            window.location = './loginPaasenger'
        else
            setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleBook = async () => {
        setError(false)
        try {
            const response = await axios.post('demande/add',
                {
                    passager: {
                        id: JSON.parse(localStorage.getItem('idp'))
                    },
                    conducteur: {
                        id: props.pub.conducteur.id
                    },
                    publication: {
                        id: props.pub.id
                    }
                })
            console.log(response)
            setOpen(false);
            window.location = '/profilePasssenger'
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }



    console.log('pubDialog', props.pub)
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Book a Ride
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant='h5' style={{ color: '#000000' }}> From : {props.pub.lieuDepart}</Typography>
                    <Typography variant='h5' style={{ color: '#000000' }}> To : {props.pub.lieuArrive}</Typography>                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <RideMap pub={props.pub} />
                        <Typography variant='h6' style={{ color: '#000000' }}> {props.pub.conducteur.prenom} {props.pub.conducteur.nom}</Typography>

                        <Typography variant='body1' style={{ color: '#000000' }}> {moment(props.pub.dateDepart).calendar()}</Typography>
                        <Typography variant='body2' style={{ color: '#000000' }}> Note :  {(props.pub.description)}</Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleBook} autoFocus>
                        Book
                    </Button>
                </DialogActions>
                {(error) ?
                    (<Typography Style={{ color: 'red' }}> Error </Typography>
                    ) : ('')}
            </Dialog>
        </div>
    );
}