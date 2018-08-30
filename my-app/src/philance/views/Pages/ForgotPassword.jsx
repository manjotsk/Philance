import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { connect } from "react-redux";
//import publicHomePageStyle from "./PublicHomePageStyle";
import howItWorksPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import { emailChanged,resetPassword,textChanged } from "../../actions/resetPassword";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }
  onEmailChange(text) {
    this.props.emailChanged(text)
    this.props.textChanged()
}
onButtonPress() {
  const {email} = this.props;
  this.props.resetPassword({email})
}
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
            <Card>
              <CardHeader>
                <h2 className={classes.cardTitle}>Reset Password</h2>
              </CardHeader>
              {this.props.emailSent?
              <CardBody>
                <GridContainer >
                  <GridItem xs={12} sm={12} md={12}  className={classes.container}>
                    Email Has Been Sent!
                  </GridItem>
                </GridContainer>
              </CardBody>
              
              :
              
              <CardBody>
                <CustomInput
                  labelText="Enter your email"
                  id="project-name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    name: "yourLocation",
                    onChange: e => {
                      this.onEmailChange(e.target.value)
                    }
                  }}
                />
                <GridContainer>
                  <GridItem  className={classes.container} xs={12} sm={12} md={12}>
                    <Button color="rose"  onClick={()=>this.onButtonPress()}>
                      Send Me a Password Reset Email
                      </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
              }

            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
      email: state.resetpass.email,
      emailSent: state.resetpass.emailSent
  }
}

export default connect(mapStateToProps, {emailChanged, resetPassword, textChanged})(withStyles(howItWorksPageStyle)(ForgotPassword));
