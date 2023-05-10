import { CssBaseline, Grid } from '@mui/material'
import moment from 'moment';
import React from 'react'
import * as yup from "yup";
import { useFormik, Formik } from 'formik';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from './assets/avatar.png'



const idp = JSON.parse(localStorage.getItem('idp'))

export default function EditPassengerProfile() {
    const [passData, setPassData] = React.useState()

    const [formData, setformData] = React.useState()
    const [isLoading, setLoading] = React.useState(true);
    const [minDate, setMinDate] = React.useState(moment(new Date()))

    const [citys, setCitys] = React.useState();
    const [client, setClient] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        street: "",
        phone: "",
        city: 2,
        birthday: moment(minDate).subtract(18, 'years').format("YYYY-MM-DD")
    });


    // async function signup() {
    //     try {
    //         const response = await axios.put('http://localhost:8088/client/editClient/' + idp, formData);
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function changePass() {
        try {
            const response = await axios.put('/passager/' + idp, passData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {

        async function getClient() {
            try {
             
                const res = await axios.get('/passager/' + idp);
                console.log(res);
                setClient(res.data);
                console.log("client", client);

                
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }


        getClient();
        console.log("sdf", moment(minDate).subtract(2, 'days').format("YYYY-MM-DD"))
    }, [isLoading]);


    const minnDate = moment(new Date()).subtract(18, 'years')._d
    // console.log("minnDate", minnDate)

    const validationSchema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Enter a valid email").required("Email is required"),
        street: yup.string().required("street is required"),
        phone: yup.number()
            .typeError(' phone est invalide')
            .required('phone is required')
            .max(99999999, 'Saisir 8 chiffres')
            .min(10000000, 'Saisir 8 chiffres'),
        opassword: yup.string()
            .required('password is required'),
        npassword: yup.string()
            .required('password is required')
            .min(8, 'il faut plus que 8 caractére'),
        cpassword: yup.string()
            .required('password is required')
            .oneOf([yup.ref('npassword'), null], 'mote de passe incorrecte'),
        birthday: yup.date()
            .max(minnDate, "Il faut avoir 18 ans minimum")
            .required('Obligatoire'),

    })

    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={Avatar} /><span class="font-weight-bold">{client.firstName} {client.lastName}</span><span class="text-black-50">{client.email}</span><span> </span></div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>
                        <div class="row ">
                            <Grid container>
                                <Grid item>
                                    <Formik
                                        initialValues={{
                                            firstName: client.nom,
                                            lastName: client.prenom,
                                            email: client.email,
                                            street: client.adresse,
                                            phone: client.telephone,
                                            // city: client.city.idCity,

                                            birthday: moment(client.dateDeNaissance).format("YYYY-MM-DD")
                                        }}

                                        onSubmit={async (values) => {
                                            // await new Promise((r) => setTimeout(r, 500));
                                            setformData({
                                                email: values.email,
                                                nom: values.firstName,
                                                prenom: values.lastName,
                                                telephone: values.phone,
                                                adresse: values.street,
                                                dateDeNaissance: values.birthday,
                                                password:values.password
                                                // city:
                                                // {
                                                //     idCity: values.city
                                                // },


                                            });

                                            await axios.put('/passager/' + idp, {
                                                email: values.email,
                                                nom: values.firstName,
                                                prenom: values.lastName,
                                                telephone: values.phone,
                                                adresse: values.street,
                                                dateDeNaissance: values.birthday,
                                                password:values.password
                                                // city:
                                                // {
                                                //     idCity: values.city
                                                // },


                                            })
                                                .then(response => {
                                                    console.log(response)
                                                    window.location.replace('/passengerProfile')
                                                })

                                                .catch(error => {
                                                    console.error(error);
                                                })
                                        }}

                                    >
                                        {props => (


                                            <form onSubmit={props.handleSubmit} >                                         <Grid container justifyContent="center" spacing={2}>
                                                <Grid item xs={12} sm={6} justifyContent="center">
                                                    <TextField
                                                        autoComplete="given-name"
                                                        name="firstName"

                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                        value={props.values.firstName}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.firstName && Boolean(props.errors.firstName)}
                                                        helperText={props.touched.firstName && props.errors.firstName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField

                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="family-name"
                                                        value={props.values.lastName}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.lastName && Boolean(props.errors.lastName)}
                                                        helperText={props.touched.lastName && props.errors.lastName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={props.values.email}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.email && Boolean(props.errors.email)}
                                                        helperText={props.touched.email && props.errors.email}
                                                    />
                                                </Grid>


                                                <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        name="phone"
                                                        label="phone"
                                                        type="text"
                                                        id="phone"
                                                        autoComplete="phone"
                                                        value={props.values.phone}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.phone && Boolean(props.errors.phone)}
                                                        helperText={props.touched.phone && props.errors.phone}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <TextField

                                                        fullWidth
                                                        name="street"
                                                        label="street"
                                                        type="text"
                                                        id="street"
                                                        autoComplete="street"
                                                        value={props.values.street}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.street && Boolean(props.errors.street)}
                                                        helperText={props.touched.street && props.errors.street}
                                                    />
                                                </Grid> */}
                                                
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="date"
                                                        name="birthday"
                                                        label="birthday"
                                                        type="date"
                                                        value={props.values.birthday}
                                                        onBlur={props.handleBlur}
                                                        onChange={props.handleChange}
                                                        error={props.touched.birthday && Boolean(props.errors.birthday)}
                                                        helperText={props.touched.birthday && props.errors.birthday}
                                                    // defaultValue={moment(minDate).subtract(18, 'years').format("YYYY-MM-DD")}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <CssBaseline />
                                                </Grid>

                                            </Grid>
                                                <Button
                                                    type="submit"
                                                    // fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    Save Profile
                                                </Button>


                                            </form>
                                        )}
                                    </Formik>
                                </Grid>
                            </Grid>

                        </div>
                        {/* <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div> */}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center experience"><span>Edit Password</span></div>
                        <Formik
                            initialValues={{
                                opassword: "",
                                npassword: "",
                                cpassword: "",
                            }}

                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                setPassData({
                                    opassword: values.opassword,
                                    npassword: values.npassword,
                                    cpassword: values.cpassword
                                })
                                changePass();
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit} >                            <CssBaseline />
                                    <Grid spacing={4} container>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="opassword"
                                                label="Old Password"
                                                type="password"
                                                id="opassword"
                                                autoComplete="new-password"
                                                value={props.values.opassword}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                error={props.touched.password && Boolean(props.errors.password)}
                                                helperText={props.touched.password && props.errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="npassword"
                                                label="New Password"
                                                type="password"
                                                id="npassword"
                                                autoComplete="new-password"
                                                value={props.values.npassword}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                error={props.touched.npassword && Boolean(props.errors.npassword)}
                                                helperText={props.touched.npassword && props.errors.npassword}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="cpassword"
                                                label="Confirme Password"
                                                type="password"
                                                id="cpassword"
                                                autoComplete="new-cpassword"
                                                value={props.values.cpassword}
                                                onBlur={props.handleBlur}
                                                onChange={props.handleChange}
                                                error={props.touched.cpassword && Boolean(props.errors.cpassword)}
                                                helperText={props.touched.cpassword && props.errors.cpassword}
                                            />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            // fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Change Password
                                        </Button>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    )
}
