import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { InterestsDropdown, CountryDropdown } from '../../components/DoubleDropdown'
import { connect } from 'react-redux'
import {
  Icon
} from 'semantic-ui-react';

import {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject
} from '../../actions/projectDetails'

import { myProject } from '../../actions/myProject'
import store from '../../store/store'

import Toaster from "../../components/Toaster/Toaster";

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      interests: []
    };
  }

  componentWillUnmount() {
    this.props.removeToaster()
    this.props.myProject(this.props.userId)
  }

  onProjectNameChange(text) {
    this.props.projectNameChanged(text)
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text)
  }

  onEndDateChange(text) {
    this.props.endDateChanged(text)
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
  }

  onFreeLancersChange(text) {
    this.props.freelancersChanged(text)
  }

  onStartDateChange(text) {
    this.props.startDateChanged(text)
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text)
  }

  onCountryChanged(text) {
    store.dispatch(countryChanged(text))
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text)
  }

  onStatusChange(text) {
    this.props.statusChanged(text)
  }

  render() {
    let interests=[];
    let interestValues = this.props.interests;
    const { classes } = this.props;
    return (
      <GridContainer className={classes.justifyContentCenter}>
        <Toaster display={this.props.toast} message={'Project has been updated'} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info" text>
              <CardText color="info">
                <h4>Project Details</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer align="right" direction="column">
                  <GridItem>
                    {this.props.userId === this.props.createdBy ?
                      <Button onClick={async () => {
                        const {
                          name,
                          description,
                          volunteers,
                          freelancers,
                          budget,
                          startDate,
                          endDate,
                          id
                        } = this.props
                        if (this.state.isDisabled) {
                          this.setState({ isDisabled: false })
                          this.props.removeToaster()
                        }
                        else {
                          this.setState({ isDisabled: true })
                          this.props.updateProject({
                            name,
                            description,
                            volunteers,
                            freelancers,
                            budget,
                            startDate,
                            endDate,
                            id
                          })
                        }
                      }}
                        color="info">
                        {this.state.isDisabled ? 'EDIT' : 'SAVE'}
                      </Button> : null}
                    <Button color="info" onClick={() => {
                      this.props.history.push('..')
                      this.props.history.replace(`application-page/${this.props.id}`)
                    }}>Apply</Button>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14} md={6}>
                    <CustomInput
                      labelText="Project Name"
                      id="projectName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.name,
                        placeholder: "Enter a Project Name",
                        onChange: e => {
                          this.onProjectNameChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={14} md={6}>
                    <CustomInput
                      labelText="Project Status"
                      id="projectStatus"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.status,
                        placeholder: "Enter Project Status",
                        onChange: e => {
                          this.onStatusChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Project Description"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.description,
                        placeholder: "Enter a Project Description",
                        onChange: e => {
                          this.onDescriptionChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Project Location Zip"
                      id="projectLocation"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.zipCode,
                        placeholder: "Enter zip code of location where it took place",
                        onChange: e => {
                          this.onZipCodeChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Project Country
                      </InputLabel>
                    {this.props.country?
                      <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.country} disabled={this.state.isDisabled} />
                      :
                      <CountryDropdown onCountryChanged={this.onCountryChanged} disabled={this.state.isDisabled} />
                     }
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                    <InputLabel className={classes.label}>
                      Project Start Date
                          </InputLabel>
                    <br /><br />
                    <FormControl fullWidth>
                      <GridContainer>
                        <GridItem xs={9}>
                          <Datetime
                            timeFormat={false}
                            onChange={date => this.onStartDateChange(date._d)}
                            inputProps={{
                              value: new Date(this.props.startDate).toDateString(),
                              disabled: this.state.isDisabled
                            }}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Icon bordered inverted color='teal' name='calendar alternate outline' />
                        </GridItem>
                      </GridContainer>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                    <InputLabel className={classes.label}>
                      Project End Date
                          </InputLabel>
                    <br /><br />
                    <FormControl fullWidth>
                      <GridContainer>
                        <GridItem xs={9}>
                          <Datetime
                            timeFormat={false}
                            onChange={date => this.onEndDateChange(date._d)}
                            inputProps={{
                              value: new Date(this.props.endDate).toDateString(),
                              disabled: this.state.isDisabled
                            }}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Icon bordered inverted color='teal' name='calendar alternate outline' onClick={() => { console.log('hello') }} />
                        </GridItem>
                      </GridContainer>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="% Complete"
                      id="%complete"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Complete %",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
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
                        value: this.props.budget,
                        placeholder: "Enter Estimated Budget (USD)",
                        onChange: e => {
                          this.onBudgetChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Project Impact Category
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer xs={12} sm={12} md={10}>
                  <GridItem xs={12} sm={12} md={10}><br />
                    {console.log(interestValues)}
                    {  
                      interestValues.forEach(element => {
                      console.log(element);
                      interests.push(element)
                    })}
                    {
                      this.props.interests!=[]?
                      <InterestsDropdown interestOptions={this.props.interestOptions} defaultValue={this.props.interests} disabled={this.state.isDisabled} />
                      :
                      <InterestsDropdown interestOptions={this.props.interestOptions} disabled={this.state.isDisabled} />
                    }
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginTop: 20 }}>
                      Resources Requested
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 35 }} md={2}>
                    <InputLabel className={classes.label}>
                      Volunteers
                        </InputLabel>
                  </GridItem>
                  <GridItem md={10}>
                    <CustomInput
                      id="volunteers"
                      labelText="Volunteers"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.volunteers,
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Number of Volunteers",
                        onChange: e => {
                          this.onVolunteersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 35 }} md={2}>
                    <InputLabel className={classes.label}>
                      Freelancers
                        </InputLabel>
                  </GridItem>
                  <GridItem md={10}>
                    <CustomInput
                      labelText="Freelancers"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.freelancers,
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Number of Freelancers",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <br />
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.proDetails.name,
    description: state.proDetails.description,
    zipCode: state.proDetails.zipCode,
    freelancers: state.proDetails.freelancers,
    volunteers: state.proDetails.volunteers,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    endDate: state.proDetails.endDate,
    budget: state.proDetails.budget,
    toast: state.proDetails.toast,
    id: state.proDetails.id,
    country: state.proDetails.country,
    interests: state.proDetails.interests,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    userId: state.user.userId,
    createdBy: state.proDetails.createdBy,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject,
  myProject
})(withStyles(startProjectPageStyle)(ProjectDetails));
