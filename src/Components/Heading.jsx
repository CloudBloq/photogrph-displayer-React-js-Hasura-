import React from 'react'
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import './Drawer.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class Heading extends React.Component {
    handleLogOut = () => {
        console.log("this is the log out method");
        window.open("/login");
    }
    render() {
        return (

            <AppBar style={{ background: '#2E3B55' }} position="relative">
                <Toolbar>
                    <CameraIcon />
                    <Typography variant="h6" color="inherit" noWrap className="primary">
                        Album layout
                        <button onClick={this.handleLogOut} className="btn button btn-danger">
                            logout
 </button>
                    </Typography>
                </Toolbar>





            </AppBar >

        );
    }
}

export default Heading;