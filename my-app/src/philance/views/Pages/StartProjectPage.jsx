import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
// styles for buttons on sweetalert
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { InterestsDropdown, CountryDropdown } from '../../components/DoubleDropdown'
import { connect } from 'react-redux'
import { Button as Buttons, Label, Icon } from 'semantic-ui-react';

import { getCommonInfo } from "../../actions/common";

import {
  textChanged,
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  filesChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  startProject,
  startProjectUnmount,
  uploadFiles,
  countryChanged,
  interestschanged
} from '../../actions/startProject'
import Toaster from "../../components/Toaster/Toaster";
import store from '../../store/store'

const uid = Math.random().toString(36).substring(7);
class StartProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      name: '',
      description: '',
      freelancers: '',
      interests: '',
      volunteerStatus: true,
      freeLanceStatus: true,
      volunteers: null,
      freeLancers: null,
      startDate: null,
      endDate: null,
      budget: null,
      validName: false,
      validDescription: false,
      validDropdown: false,
      validCountry: false,
      validStartDate: false,
    };
    this.myRef = React.createRef();
    this.fileInput = React.createRef();
  }
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.successAlert();
    }
    this.props.getCommonInfo()
  }
  componentWillUnmount() {
    this.props.startProjectUnmount()
  }

  validate = async (value) => {
    if (value === "ProjectName") {
      await this.setState({
        validName: true
      })
    }
    if (value === "Description") {
      await this.setState({
        validDescription: true
      })
    }
    if (value === "startDate") {
      await this.setState({
        validStartDate: true
      })
    }
  }

  onProjectNameChange = async (text) => {
    if (text === "") {
      this.validate("ProjectName")
    }
    else {
      await this.setState({ validName: false })
      this.props.projectNameChanged(text)
      this.props.textChanged()
    }
  }

  onDescriptionChange = async (text) => {
    if (text === "") {
      this.validate("Description")
    }
    else {
      await this.setState({ validDescription: false })
      this.props.descriptionChanged(text)
      this.props.textChanged()
    }
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text)
    this.props.textChanged()
  }

  onFilesChange(e) {
    this.props.filesChanged(e.target.files[0])
    // this.props.textChanged()
  }

  onEndDateChange(text) {
    this.props.endDateChanged(text)
    this.props.textChanged()
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
    this.props.textChanged()
  }

  onFreeLancersChange(text) {
    this.props.freelancersChanged(text)
    this.props.textChanged()
  }

  onStartDateChange = async (text) => {
    if (text === undefined) {
      this.validate("startDate")
    }
    else {
      await this.setState({ validStartDate: false })
      this.props.startDateChanged(text)
      this.props.textChanged()
    }
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text)
    this.props.textChanged()
  }

  onZipCodeChange(text) {
      this.props.zipCodeChanged(text)
      this.props.textChanged()
  }

  onCountryChanged = async (text) => {
    if (text === "") {
      this.validate("Country")
    }
    else {
      await this.setState({ validCountry: false })
      store.dispatch(countryChanged(text))
      store.dispatch(textChanged())
    }
  }

  handleClick() {
    this.refs.fileInput.click();
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn ? classes.justifyContentCenter : classes.container}>
        {this.props.requestCompleted ? <Toaster display={this.props.requestCompleted} message={'Project has been created'} /> : null}
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info" text>
              <CardText color="info">
                <h4>Start a project to help others OR ask for help</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <div ref={this.myRef} />
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Project Name"
                      id="projectName"
                      error={this.state.validName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter a Project Name",
                        onChange: e => {
                          this.onProjectNameChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Project Description"
                      id="projectDescription"
                      error={this.state.validDescription}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter a Project Description",
                        onChange: e => {
                          this.onDescriptionChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Country
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer spacing={12}>
                  <GridItem xs={6}>
                    <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.country} action ={this.state.validCountry} />
                  </GridItem>
                </GridContainer>
                <GridContainer spacing={12}>
                  <GridItem xs={6} style={{}}>
                    <CustomInput
                      labelText="Project Zip Code"
                      id="projectLocation"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter zip code of location where it took place",
                        onChange: e => {
                          this.onZipCodeChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}><br />
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Impact Category
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer xs={12} sm={12} md={10}>
                  <GridItem xs={12} sm={12} md={10}><br />
                    <InterestsDropdown
                    onInterestsChange={
                      async (e, {value})=>{
                        await this.setState({value:value})
                        if (this.state.value.toString() === "") {
                          await this.setState({
                              valid:true
                          })
                          store.dispatch(interestschanged(this.state.value.toString()))
                        }
                        else {
                          await this.setState({ valid: false })
                          store.dispatch(interestschanged(this.state.value.toString()))
                          store.dispatch(textChanged())
                        }
                      }
                    }
                    interestOptions={this.props.interestOptions} action={this.state.validDropdown} defaultValue={this.props.interests ? this.props.interests.split(',') : null}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}><br /><br />
                    <InputLabel className={classes.label} style={{ marginTop: 20 }}>
                      Resources Needed
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 23 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={
                            async () => {
                              await this.setState({ volunteerStatus: !this.state.volunteerStatus })
                              this.state.volunteerStatus ? this.onVolunteersChange('') : null
                            }
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="Volunteers (Unpaid)"
                    />
                  </GridItem>
                  <GridItem md={6}>
                    <CustomInput
                      id="volunteers"
                      labelText="Enter Number of Volunteers"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.volunteers,
                        disabled: this.state.volunteerStatus,
                        placeholder: "",
                        onChange: e => {
                          this.onVolunteersChange(e.target.value)
                        }
                      }}
                    />

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 23 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={
                            async () => {
                              await this.setState({ freeLanceStatus: !this.state.freeLanceStatus })
                              this.state.freeLanceStatus ? this.onFreeLancersChange('') : null
                            }
                          }
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="Freelancers (Paid)"
                    />
                  </GridItem>
                  <GridItem md={6}>
                    <CustomInput
                      labelText="Enter Number of Freelancers"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.freelancers,
                        disabled: this.state.freeLanceStatus,
                        placeholder:"",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardBody>
                      {this.state.validStartDate?
                        <InputLabel className={classes.label}>
                          <span style={{color: "red"}}>Project Start Date</span>
                          </InputLabel>
                        :
                        <InputLabel className={classes.label}>
                          Project Start Date
                          </InputLabel>
                        }
                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                timeFormat={false}
                                onChange={date => this.onStartDateChange(date._d)}
                              />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' />
                            </GridItem>
                          </GridContainer>
                        </FormControl>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <CardHeader color="info" icon>
                      </CardHeader>
                      <CardBody>
                        <InputLabel className={classes.label}>
                          Project End Date (Estimated)
                          </InputLabel>
                        <br />
                        <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                timeFormat={false}
                                onChange={date => this.onEndDateChange(date._d)}
                              />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' />
                            </GridItem>
                          </GridContainer>
                        </FormControl>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Budget"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Enter Estimated Budget (USD)",
                        onChange: e => {
                          this.onBudgetChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14} >
                    <Label
                      as="label"
                      basic
                      htmlFor={uid}
                    >
                      <GridContainer className={classes.justifyContentCenter}>
                        <GridItem justify='center'>
                          <input type="file" id={uid}
                            ref='fileInput'
                            multiple
                            style={{ display: "none" }}
                            name="files"
                            onChange={(e) => this.onFilesChange(e)}
                          />
                          <Button color="info" onClick={() => this.handleClick()}>
                            <Icon name='upload' />Select Files{'\t\t\t'}
                          </Button>
                        </GridItem>
                        <GridItem xs={12} justify='center'>
                          {
                            this.props.files ?
                              <Card>
                                <CardHeader>
                                  {this.props.files.type.split('/')[0].charAt(0).toUpperCase() + this.props.files.type.split('/')[0].slice(1) + ' File'}
                                </CardHeader>
                                <CardBody>
                                  <Icon name='file' />{this.props.files.name}{'\t\t\t'}
                                </CardBody>
                              </Card>
                              : null
                          }
                        </GridItem>
                        <GridItem justify='center'>
                        </GridItem>
                      </GridContainer>
                    </Label>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer className={classes.justifyContentCenter}>
                  <GridItem>
                    {this.state.alert}
                    <Button onClick={() => {
                      if (!this.props.isLoggedIn) {
                        this.successAlert();
                      } else {

                        const {
                          name,
                          description,
                          volunteers,
                          freelancers,
                          zipCode,
                          country,
                          interests,
                          startDate,
                          endDate,
                          budget,
                          userId,
                          files
                        } = this.props
                        this.props.startProject({
                          name,
                          description,
                          volunteers,
                          freelancers,
                          zipCode,
                          country,
                          interests,
                          startDate,
                          endDate,
                          budget,
                          userId,
                          files
                        }, (projectId) => {
                          this.props.uploadFiles(
                            {
                              uploadType: 'startProjectFiles',
                              userInfo: {
                                userId: this.props.userId,
                                projectId: projectId
                              }
                            },
                            this.props.files
                          )
                        })
                        if (this.props.name === "") {
                          this.setState({ validName: true })
                        }
                        if (this.props.description === "") {
                          this.setState({ validDescription: true })
                        }
                        if (this.props.interests === "") {
                          this.setState({ validDropdown: true })
                        }
                        if (this.props.country === "") {
                          this.setState({ validCountry: true })
                        }
                        if (this.props.country !== "") {
                          this.setState({ validCountry: false })
                        }
                        if( this.props.startDate === "")
                        {
                          this.setState({validStartDate: true})
                        }
                      }
                    }}
                    
                      color="info"
                    >
                      {this.props.text}
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  successAlert() {
    const { classes } = this.props;

    this.setState({
      alert: (
        <SweetAlert
          success={false}
          style={{ display: "block", marginTop: "-100px" }}
          title=""
          onConfirm={() => this.props.history.push('/login')}
          onCancel={() => this.props.history.push('/login')}
      
        >
          You need to be logged in to Start a Project!
        </SweetAlert>
      )
    });
  }
}

const mapStateToProps = state => {
  return {
    name: state.start.name,
    description: state.start.description,
    zipCode: state.start.zipCode,
    freelancers: state.start.freelancers,
    volunteers: state.start.volunteers,
    startDate: state.start.startDate,
    endDate: state.start.endDate,
    budget: state.start.budget,
    text: state.start.text,
    interests: state.start.interests,
    interestOptions: state.common.interestOptions,
    isLoggedIn: state.auth.isLoggedIn,
    requestCompleted: state.start.requestCompleted,
    userId: state.user.userId,
    files: state.start.files,
    uploadStatus: state.start.uploadStatus,
    country: state.start.country,
    isLoggedIn: state.auth.isLoggedIn
  }
}

StartProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  textChanged,
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  startProject,
  getCommonInfo,
  startProjectUnmount,
  filesChanged,
  uploadFiles
})(withStyles(startProjectPageStyle)(StartProject));
