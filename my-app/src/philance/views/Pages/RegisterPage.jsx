import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import Face from "@material-ui/icons/Face";
import LaunchIcon from "@material-ui/icons/Launch";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Join Philance and ...</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Launch Your Own Social Impact Project"
                      description="Post a project that has a durable social impact and find volunteers and/or freelancers to work on it with you, creating the impact your want to see in the world!"
                      icon={LaunchIcon}
                      iconColor="success"
                    />
                    <InfoArea
                      title="Manage Your Project"
                      description="Use the project management and collaboration tools available in the Philance platform to successfully execute your project. Your project team could be from your local community or from across the world!"
                      icon={Timeline}
                      iconColor="success"
                    />
                    <InfoArea
                      title="Work on an Existing Project"
                      description="Sign up as a volunteer or a freelancer to work on an existing social impact project posted by someone else. Contribute your time and expertise to start making a difference today in this world!"
                      icon={Group}
                      iconColor="success"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div className={classes.center}>
                      <Button color="facebook">
                        <i
                          className={
                            classes.socialButtonsIcons +
                            " " +
                            classes.marginRight +
                            " fab fa-facebook-square"
                          }
                        />{" "}
                        Sign Up with your Facebook Account
                      </Button>
                      <h4 className={classes.socialTitle}>
                        or with your email
                      </h4>
                    </div>
                    <form className={classes.form}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "First Name..."
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Last Name..."
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Email..."
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <LockOutline
                                className={classes.inputAdornmentIcon}
                              />
                            </InputAdornment>
                          ),
                          placeholder: "Password..."
                        }}
                      />
                      <FormLabel className={classes.labelHorizontal}>
                        <span>
                          By registering you confirm that you accept the{" "}
                          <a href="#">Terms and Conditions</a>
                        </span>
                      </FormLabel>
                      <div className={classes.center}>
                        <Button round color="info">
                          Get started
                        </Button>
                      </div>
                    </form>
                    <div className={classes.left}>
                      <h4>
                        {" "}
                        Already have an account? <a href="#">Login</a>{" "}
                      </h4>
                    </div>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
