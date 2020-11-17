import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {

    state = {
        displayOnLable: '',
        autorisedzUser: [],
        isAutorized: false,
        email: '',
        password: ''
    }

    componentDidMount = () => {

        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = "https://localhost:5001/Authentication/getAllAuthentictedUser";

        setTimeout(fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log("data from server side", data);
                this.setState({ autorisedzUser: data });
            }), 20);



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
    addLoggedInUser = (email) => {
        console.log("This is the email address currently logged in", email);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({



                email: email,





            })
        };
        fetch('https://localhost:5001/LoggedInPhotographer/InsertLogedInPhotographer', requestOptions)
            .then(response => {
                response.json();
                console.log("added user >> response", response);



            });
    }
    handleLogin = () => {
        const singleUser = this.state.autorisedzUser;
        // handle login method
        console.log("this is the autorized user came from the database", this.state.autorisedzUser);
        console.log("email: ", this.state.email);
        console.log("pasword", this.state.password);

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        for (var index = 0; index < singleUser.length; index++) {



            if (user.email == singleUser[index].email) {
                if (user.password == singleUser[index].password) {
                    console.log("autorized user");
                    this.addLoggedInUser(user.email);
                    this.props.history.push('/home');
                    // window.open("/home");
                    // <Link
                    // to={{
                    // pathname: "/home",
                    // email: user.email // your data array of objects
                    // }}
                    // >Go to Home</Link>
                    // this.props.history.push({
                    // pathname: '/home',
                    // email: user.email // your data array of objects
                    // })

                    // this.props.history.push({
                    // pathname: '/home',
                    // data: {
                    // email: user.email
                    // }
                    // your data array of objects
                    // })

                    break;
                } else {

                    this.setState({ displayOnLable: 'Incorrect Password' });
                    console.log("incorrect password");
                    break;
                }
            } else {
                this.setState({ displayOnLable: 'Incorrect Email and Password' });
                console.log("incorrect email and passowrd");

            }

        };








        // if (this.state.autorisedzUser.includes(user)) {
        // console.log("Autorized used");
        // this.setState({ isAutorized: true });
        // }
        // else {
        // console.log("the user is not registered");
        // }

    }

    render() {
        const text = this.state.displayOnLable;
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>

                    <form className={classes.form} noValidate>
                        <div className=".text-danger">{text}</div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onInput={e => this.setState({ email: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onInput={e => this.setState({ password: e.target.value })}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={this.handleLogin}
                            fullWidth
                            variant="contained"
                            color="primary"

                            className={classes.submit}
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>

                </Box>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignIn)
