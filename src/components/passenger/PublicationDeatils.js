
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Grid } from '@mui/material';
// import AddContractPosition from './AddContractPosition';
import { Link, Navigate, Redirect } from 'react-router-dom'
// import { GeolocateControl, Map, Marker, NavigationControl } from 'react-map-gl';
import { useState } from 'react';
import axios from 'axios'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PublicationDeatils(props) {
    const [open, setOpen] = React.useState(false);
    const [viewport, setViewport] = useState({
        latitude: props.c.latitude,
        longitude: props.c.longitude,
        zoom: 8.5,
        width: window.innerWidth,
        height: window.innerHeight
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAccept = () => {
        // setOpen(false);


        axios.put('http://localhost:8088/contract/accept/' + props.c.idContract)
            .then(response =>
                console.log(response),
                window.location.reload(false)
            )
            .catch(error =>
                console.error(error)
            )

    }; const handleReject = () => {
        axios.put('http://localhost:8088/contract/reject/' + props.c.idContract)
        .then(response =>
            console.log(response),
            window.location.reload(false)
        )
        .catch(error =>
            console.error(error)
        )
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                details
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {props.c.job.title}
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            Confirme
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Grid container justifyContent='center' spacing={2} >
                    <Grid item xs={5}>
                        <Typography variant='h6'>{props.c.job.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Link state={{ id: props.c.provider.id }} to='/ProviderPresenting'>
                            <div class="col-xl-12 col-md-12">
                                <div class="card user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                <h6 class="f-w-600">{props.c.provider.firstName} {props.c.provider.lastName}</h6>
                                                <p>{props.c.provider.speciality.label}</p>

                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>

                                        <div class="col-sm-8 ">
                                            {/* <Map
                                                mapboxAccessToken={
                                                    "pk.eyJ1IjoiOWE3dDYiLCJhIjoiY2xiZWF1MWdlMDluOTNvcGF6Zmx3bng2ayJ9.8bB7_aVExETntLYL9F0fOA"
                                                }
                                                {...viewport}
                                                style={{ width: '90vw', height: '50vh' }}
                                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                            // onMove={(v) => setViewport(v.viewState)}

                                            >
                                                <Marker key={props.c.id} longitude={props.c.longitude} latitude={props.c.latitude} anchor="bottom" >
                                                    <img style={{ width: '20px', height: '25px' }} src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg" />
                                                </Marker>

                                            </Map > */}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Grid>

                    <Grid item xs={12}>
                        {(localStorage.getItem("idp")) ? (
                            <>
                                <Grid justifyItems='center' justifyContent='center' container>
                                    <Grid item xs={6}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant='contained' onClick={handleAccept}>
                                                accept
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Button variant='contained' color='warning' onClick={handleReject}>
                                                reject
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>


                            </>
                        ) : ('')}

                    </Grid>
                </Grid>


            </Dialog >
        </div >
    );
}