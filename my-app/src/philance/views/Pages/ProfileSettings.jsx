import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Switch from '@material-ui/core/Switch';

//import publicHomePageStyle from "./PublicHomePageStyle";
import ProfileSettingsPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import {
  emailToggle,
  phoneToggle  
} from '../../actions/userProfile'
import { getUserInfo } from "../../actions/userProfile";
import {connect} from 'react-redux'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    this.props.getUserInfo(this.props.currentEmail)
  }

  handleChangeEmail(text){
    this.props.emailToggle(text)
  }

  handleChangePhone(text){
    this.props.phoneToggle(text)
  }
  render() {
    const { classes } = this.props;
    let toggle= { float: "right", marginTop:"-13px" }
console.log(this.props)
    return (
      <GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer >
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ fontSize: "16px" }}>Email Notifications</span>
                    <span style={toggle}>
                      <Switch
                        checked={this.props.email}
                        onChange={(e)=>{this.handleChangeEmail(e.target.checked)}}
                        value="checkedB"
                        color="primary"
                      />
                    </span>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ fontSize: "16px"}}>Phone Notifications</span>
                    <span style={toggle}>
                      <Switch
                        checked={this.props.phone}
                        onChange={(e)=>{this.handleChangePhone(e.target.checked)}}
                        value="checkedB"
                        color="primary"
                      />
                    </span>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        </GridContainer>
      </GridContainer>
    );
  }
}

ProfileSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    email: state.user.email.toggleEmail,
    phone: state.user.email.togglePhone,
    currentEmail: state.auth.email===""?state.reg.email:state.auth.email,
  }
}
export default connect(mapStateToProps, {
  emailToggle,
  phoneToggle,
  getUserInfo
})(withStyles(ProfileSettingsPageStyle)(ProfileSettings));