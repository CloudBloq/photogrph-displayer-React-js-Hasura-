
import React from 'react'
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Link from '@material-ui/core/Link';
export function Copyright() {
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
class Footer extends React.Component {













    render() {
        return (






            <div>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
    </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
    </Typography>
                <Copyright />
            </div>
        );
    }
}
export default Footer;