import React from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withApollo } from '@apollo/react-hoc';
// import { useLazyQuery, gql } from '@apollo/client'

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});







class SignUp extends React.Component {
    state = {
        fName: '',
        lName: '',
        gender: 'Male',
        email: '',
        workTitle: '',
        country: 'Ethiopia',
        city: '',
        password: '',
        profilePictureName: 'yared.jpg',
        postResponse: null,
    }
    Copyright = () => {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
          </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    handleCountryChange = (event) => {
        // Handle country change
    };
    handleGenderChange = (event) => {
        //    Handle Gender Change
    };

    onChange = (e) => {
        let files = e.target.files;
        console.warn("data file", files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.warn("img data", e.target.result);
            this.setState({ profilePictureName: e.target.result })
        }
    }
    HandleSubmit = async () => {


        console.log("this is the submit button");
        const { loading, error, data } = await this.props.client.mutate({
            mutation: gql`
            
mutation {
    insert_Photographer(objects: {
      City: " ${this.state.city}", 
      Country: "${this.state.country}",
      Email: "${this.state.email}",
      FName: "${this.state.fName}", 
      Gender: "${this.state.gender}", 
      LName: "${this.state.lName}", 
      Password: "${this.state.password}", 
      ProfilePictureName: "${this.state.profilePictureName}", 
      WorkTitle: "${this.state.workTitle}"
    }
    ) {
      affected_rows
      returning {
        PhotographerId
      }
    }
  }
`,

            variables: null,
        })

        if (error) {
            console.error(error);
            return (<div>
                Error : error.toString();
            </div>)
        }


        console.log(data.insert_photographer.returning[0].PhotographerId);

        this.props.history.push('/login');

    }





    render() {

        const { classes } = this.props;
        console.log(classes.avatar);

        return (

            < Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    onInput={e => this.setState({ fName: e.target.value })}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onInput={e => this.setState({ lName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onInput={e => this.setState({ email: e.target.value })}
                                />
                            </Grid>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.country}
                                    onChange={this.handleCountryChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City "
                                    name="city"
                                    autoComplete="city"
                                    onInput={e => this.setState({ city: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Work Title"
                                    name="title"
                                    autoComplete="title"
                                    onInput={e => this.setState({ workTitle: e.target.value })}
                                />
                            </Grid>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.gender}
                                    onChange={this.handleGenderChange}
                                >
                                    <MenuItem value={10}>Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>

                                </Select>
                            </FormControl>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onInput={e => this.setState({ password: e.target.value })}
                                />
                            </Grid>

                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                                
                            </Grid> */}
                            <input type="file" name="file" onChange={(e) => this.onChange(e)} />
                        </Grid>

                        <Button

                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.HandleSubmit}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    {/* <Copyright /> */}
                </Box>
            </Container >
        );
    }
}



export default withApollo(withStyles(useStyles)(SignUp))
