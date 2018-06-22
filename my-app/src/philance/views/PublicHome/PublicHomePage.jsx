import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Timeline from "@material-ui/icons/Timeline";
import Accessibility from "@material-ui/icons/Accessibility";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import LockOutline from "@material-ui/icons/LockOutline";

// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CtButton from "components/CustomButtons/Button.jsx";

import publicHomePageStyle from "./PublicHomePageStyle";

import bgImage from "philance/assets/img/philance-bg.jpg";


class PublicHomePage extends React.Component {

    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar position="static" title="Philance">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton} color="inherit" aria-label="Menu"
                            onClick={this.handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Start A Project</MenuItem>
                            <MenuItem onClick={this.handleClose}>Find A Project</MenuItem>
                            <MenuItem onClick={this.handleClose}>How It Works</MenuItem>
                        </Menu>
                        <Typography variant="title" color="inherit">
                            {<img src={require('assets/img/philance.png')} width="75" height="75" alt="Philance" />}
                        </Typography>
                        <Button color="inherit">Start A Project</Button>
                        <Button color="inherit">Find A Project</Button>
                        <Button color="inherit">How It Works</Button>
                        <div className={classes.flex} />
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Sign Up</Button>
                    </Toolbar>
                </AppBar>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={10} lg={10}>
                        <Card className={classes.cardSignup}>
                            <h2 className={classes.cardTitle}>Philance<br/>Helping You Help Others!</h2>
                            <CardBody>
                                        <InfoArea
                                            classes={classes}
                                            title="WelcomeTo Philance"
                                            description="This is a platform for organizations
                                                and individuals to launch and manage their very own social projects,
                                                so anyone can make a social impact."
                                            icon={Accessibility}
                                            iconColor="rose"
                                        />
                                        <InfoArea
                                            classes={classes}
                                            title="Mission"
                                            description="Enable organizations and individuals to launch and manage
                                                their own social projects and make a social impact"
                                            icon={Timeline}
                                            iconColor="primary"
                                        />
                                        <InfoArea
                                            classes={classes}
                                            title="Vision"
                                            description="Our vision is to make it easy for anyone to launch a project
                                                that has a durable social impact and find the tools and resources
                                                needed to successfully complete that project."
                                            icon={Group}
                                            iconColor="info"
                                        />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <div className={classes.fullPageBackground} style={{ backgroundImage: "url(" + bgImage + ")" }}/>
            </div>
        );
    }
}

//export default withStyles(styles)(PublicHomePage);
export default withStyles(publicHomePageStyle)(PublicHomePage);
