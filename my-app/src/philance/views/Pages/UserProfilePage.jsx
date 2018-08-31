import React from "react";
import PropTypes from "prop-types";

import {connect} from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";

import {CountryDropdown, InterestsDropdown} from '../../components/DoubleDropdown'
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import userProfileStyles from "philance/views/PageStyles/UserProfileStyles.jsx";

import avatar from "assets/img/faces/marc.jpg";

import {registerToast} from '../../actions/register'

import {
  textChanged,
  updateProfile,
  contactChanged,
  emailChanged,
  postalCodeChanged,
  descriptionChanged,
  oraganizationChanged,
  titleChanged,
  nameChanged,
  passwordChanged
} from '../../actions/userProfile'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.registerToast()
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
    this.props.textChanged()
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
    this.props.textChanged()
  }

  onOrganizationChange(text) {
    this.props.oraganizationChanged(text)
    this.props.textChanged()
  }

  onNameChange(text) {
    this.props.nameChanged(text)
    this.props.textChanged()
  }

  onTitleChange(text) {
    this.props.titleChanged(text)
    this.props.textChanged()
  }

  onContactChange(text) {
    this.props.contactChanged(text)
    this.props.textChanged()
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text)
    this.props.textChanged()
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text)
    this.props.textChanged()
  }

  onPostalCodeChange(text) {
    this.props.postalCodeChanged(text)
    this.props.textChanged()
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
    this.props.textChanged()
  }

   onButtonPress() {
    const {
      contact,
      email,
      postalCode,
      country,
      password,
      description,
      name,
      organization,
      title,
      interests,
      currentEmail
    } = this.props
    this.props.updateProfile({
      name,
      email,
      password,
      contact,
      country,
      postalCode,
      description,
      organization,
      title,
      interests,
      currentEmail
    })
}

  render() {
    const { classes } = this.props;
    return (
        <GridContainer>
      <div>
        {this.props.showToast?
          <h4 className={classes.welcomeHeading}>
            Welcome to Philance! Please take a few moments to complete your User Profile and you can then post a project or join an existing project.
          </h4>
       :null
       }
       <br/>
       </div>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onEmailChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onPasswordChange(e.target.value)
                        }
                      }}
                      inputProps={{
                        type: 'password'
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                      <FormLabel className={classes.labelHorizontal}>
                        Country
                      </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CountryDropdown/>
                    <br/>
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                      <FormLabel className={classes.labelHorizontal}>
                        Impact Category Interests
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    
                    <InterestsDropdown/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Your Zip Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onPostalCodeChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Phone"
                      id="contact"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onContactChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button color="info" onClick={()=>{
                    this.onButtonPress()
                    console.log(this.props)
                    }}>
                    {this.props.text}
                  </Button>
                </GridItem>
                </GridContainer>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onNameChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Title"
                      id="title"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onTitleChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Organization"
                      id="organization"
                      formControlProps={{
                        fullWidth: true,
                        onChange: e => {
                          this.onOrganizationChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Description about me"
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          onChange: e => {
                            this.onDescriptionChange(e.target.value)
                          }
                        }}
                      />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    contact: state.user.contact,
    email: state.user.email,
    currentEmail: state.auth.email,
    country: state.user.country,
    postalCode: state.user.postalCode,
    description: state.user.description,
    text: state.user.text,
    showToast: state.reg.showToast,
    password: state.user.password,
    interests: state.user.interests,
    name: state.user.name,
    title: state.user.title,
    organization: state.user.organization,

  }
}

export default connect(mapStateToProps, {
  textChanged,
  updateProfile,
  contactChanged,
  emailChanged,
  postalCodeChanged,
  descriptionChanged,
  registerToast,
  oraganizationChanged,
  titleChanged,
  nameChanged,
  passwordChanged
})(withStyles(userProfileStyles)(UserProfile));
