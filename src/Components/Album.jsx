import React from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Drawer.css'
import Heading from './Heading';
import { useLocation } from 'react-router-dom'

















const useStyles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),

    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,

    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Album extends React.Component {

    state = {
        photosByEmail: [],
        loggedInPhotographers: [],
        photographerData: {},
        photosToUpload: '',
        email: '',
        sucess: '',


    }








    getLogedInEmail = async () => {
        const apiUrl3 = " https://localhost:5001/LoggedInPhotographer/getAllLogedInPhotographers";
        await fetch(apiUrl3)
            .then((response) => response.json())
            .then((data) => {
                console.log("logged in user information", data);
                this.setState({ loggedInPhotographers: data });

            });


    }
    getPhotographerInformation = (email) => {
        const apiUrl = " https://localhost:5001/Photographer/getPhotographerByEmail?email=" + email;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log("photographer self information", data);
                this.setState({ photographerData: data });
            });
    }

    getPhotoByEmail = (email) => {
        console.log("get Photo By Email method");

        const apiUrl3 = "https://localhost:5001/photos/getPhotosByEmail?email=" + email;
        fetch(apiUrl3)
            .then((response) => response.json())
            .then((data) => {
                console.log("photos", data);
                this.setState({ photosByEmail: data });
            });




        // 
    }

    componentDidMount = async () => {


        await this.getLogedInEmail();
        // await this.getPhotoByEmail()
        var emails = [...this.state.loggedInPhotographers];
        var email = emails[emails.length - 1].email;//get last item in the array  

        console.log("logged in users", this.state.loggedInPhotographers);
        console.log("email logged in", email);

        await this.setState({ email: email });
        this.getPhotoByEmail(email);
        this.getPhotographerInformation(email);


        console.log("photots", this.state.photographerData);





    }
    getCurrentlyLoggedInUser = () => {
        console.log("this is the  getCurrentlyLoggedInUserMehtod");
        const new_email = "yaredyaya16@gmail.com";
        this.setState({
            email: new_email
        })
        // return "yaredyaya16@gmail.com";
    }
    onChange = (e) => {
        let files = e.target.files;
        console.warn("data file", files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.warn("img data", e.target.result);
            this.setState({ photosToUpload: e.target.result })
        }
    }
    handleUpload = () => {

        console.log("email", this.state.email);
        console.log("photosName", this.state.photosToUpload);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                photographerEmail: this.state.email,
                photosName: this.state.photosToUpload,
            })
        };


        console.log("upload image");

        fetch('https://localhost:5001/photos/InsertPhotos', requestOptions)
            .then(response => {
                response.json();
                console.log("response", response);
                if (response.status == 200) {
                    console.log("successfully added");
                    this.setState({
                        sucess: 'Sccessfully uploaded...'
                    })


                }
            });

    }
    render() {
        const { photosByEmail } = this.state;
        // const { photographer } = this.state.photographerData;



        const { classes } = this.props;

        const { photographerData } = this.state;
        return (
            <React.Fragment>




                <CssBaseline />
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <div className={classes.heroButtons}>
                                <div xs={12} sm={6} md={4} className="profile">
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={photographerData.profilePictureName}
                                            title="Image title"
                                        />


                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {photographerData.fName} {photographerData.lName}
                                            </Typography>
                                            <Typography>
                                                {photographerData.workTitle}
                                            </Typography>
                                            <Typography>
                                                {photographerData.country}
                                            </Typography>
                                            <Typography>
                                                {photographerData.city}
                                            </Typography>

                                        </CardContent>

                                    </Card>
                                </div>
                                <p className="success">{this.state.sucess}</p>
                                <Grid className="addIMage" container spacing={2} justify="center">
                                    <div className="button_upload">
                                        <input color="danger" type="file" name="file" onChange={(e) => this.onChange(e)} />
                                    </div>

                                    <Button onClick={this.handleUpload} variant="contained" color="primary">
                                        Upload
                                    </Button>

                                </Grid>
                                <Grid item>



                                </Grid>

                            </div>

                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {photosByEmail.map((photo) => (
                                <Grid item key={photo} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={photo.photosName}
                                            title="profile"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {/* {photographer.fName + " " + photographer.lName} */}
                                            </Typography>
                                            <Typography>
                                                This is a media card. You can use this section to describe the content.
                                        </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                        </Button>
                                            <Button size="small" color="primary">
                                                Edit
                                        </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment >
        );
    }
}
export default withStyles(useStyles)(Album)

