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

//import publicHomePageStyle from "./PublicHomePageStyle";
import howItWorksPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
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
                      this.setState({ [e.target.name]: e.target.value });
                      console.log(this.state);
                    }
                  }}
                />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                <Button color="rose" >
                  Send Me a Password Reset Email
                      </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
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

export default withStyles(howItWorksPageStyle)(ForgotPassword);
