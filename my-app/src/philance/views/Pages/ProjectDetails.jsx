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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {InterestsDropdown, CountryDropdown} from '../../components/DoubleDropdown'
import {connect} from 'react-redux'
import {
  Table,
  Icon
} from 'semantic-ui-react';

import { getCommonInfo } from "../../actions/common";

import {
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
  startProjectUnmount
} from '../../actions/startProject'
import Toaster from "../../components/Toaster/Toaster";

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      name: '',
      description: '',
      freelancers: '',
      impact: '',
      volunteers: null,
      freeLancers: null,
      startDate: null,
      endDate: null,
      budget: null,
      isDisabled: true
    };
  }
  componentWillMount(){
    this.props.getCommonInfo()
  }
  componentWillUnmount(){
    this.props.startProjectUnmount()
  }
  onProjectNameChange(text) {
    this.props.projectNameChanged(text)
    this.props.textChanged()
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
    this.props.textChanged()
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text)
    this.props.textChanged()
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

  onStartDateChange(text) {
    this.props.startDateChanged(text)
    this.props.textChanged()
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text)
    this.props.textChanged()
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text)
    this.props.textChanged()
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn?classes.justifyContentCenter:classes.container}>
        <Toaster display={this.props.requestCompleted} message={'Project has been created'}/>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" text>
                <CardText color="info">
                  <h4>Project Details</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={14} md={6}>
                      <CustomInput
                        labelText ="Project Name"
                        id="projectName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Name",
                          onChange: e => {
                            this.onProjectNameChange(e.target.value)
                          },
                          disabled : this.state.isDisabled
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={14} md={6}>
                      <CustomInput
                        labelText ="Project Status"
                        id="projectStatus"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter Project Status",
                          onChange: e => {
                            this.onProjectNameChange(e.target.value)
                          },
                          disabled : this.state.isDisabled
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={14}>
                      <CustomInput
                      labelText ="Project Description"
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Description",
                          onChange: e => {
                            this.onDescriptionChange(e.target.value)
                          },
                          disabled : this.state.isDisabled
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText ="Project Location Zip"
                        id="projectLocation"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter zip code of location where it took place",
                          onChange: e => {
                            this.onZipCodeChange(e.target.value)
                          },
                          disabled : this.state.isDisabled
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <InputLabel className={classes.label} style={{marginBottom: 5, marginTop: 10}}>
                        Project Country
                      </InputLabel>
                      <CountryDropdown defaultValue={this.props.userCountry} disabled={this.state.isDisabled}/>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} style={{marginTop: 37}}>
                          <InputLabel className={classes.label}>
                            Project Start Date
                          </InputLabel>
                          <br/><br/>
                          <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                  timeFormat={false}
                                  onChange={date=>this.onStartDateChange(date._d)}
                                  inputProps={{
                                    disabled: this.state.isDisabled
                                  }}
                                />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' onClick = {()=>{console.log('hello')}}/>
                            </GridItem>
                          </GridContainer>
                          </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{marginTop: 37}}>
                          <InputLabel className={classes.label}>
                            Project End Date
                          </InputLabel>
                          <br/><br/>
                          <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                  timeFormat={false}
                                  onChange={date=>this.onEndDateChange(date._d)}
                                  inputProps={{
                                    disabled: this.state.isDisabled
                                  }}
                                />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' onClick = {()=>{console.log('hello')}}/>
                            </GridItem>
                          </GridContainer>
                          </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText ="% Complete"
                          id="%complete"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled : this.state.isDisabled,
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
                        labelText ="Budget"
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
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
                        <InputLabel className={classes.label} style={{marginBottom: 5, marginTop: 10}}>
                          Project Impact Category
                        </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}><br/>
                      <InterestsDropdown interestOptions={this.props.interestOptions} disabled={this.state.isDisabled}/>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                        <InputLabel className={classes.label} style={{marginTop: 20}}>
                          Resources Requested
                        </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem style = {{marginTop: 35}} md={2}>
                        <InputLabel className={classes.label}>
                          Volunteers
                        </InputLabel>
                    </GridItem>
                        <GridItem md ={10}>
                        <CustomInput
                        id="volunteers"
                        labelText ="Volunteers"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled : this.state.isDisabled,
                          placeholder: "Enter Number of Volunteers",
                          onChange: e => {
                            this.onVolunteersChange(e.target.value)
                          }
                        }}
                      />
                        </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem style = {{marginTop: 35}} md={2}>
                        <InputLabel className={classes.label}>
                          Freelancers
                        </InputLabel>
                        </GridItem>
                        <GridItem md ={10}>
                        <CustomInput
                        labelText ="Freelancers"
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled : this.state.isDisabled,
                          placeholder: "Enter Number of Freelancers",
                          onChange: e => {
                            this.onFreeLancersChange(e.target.value)
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <br/>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

const mapStateToProps =state=> {
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
    interests: state.user.interests,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    userId:state.user.userId
  }
}

// StartProject.propTypes = {
//   classes: PropTypes.object.isRequired
// };

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
  startProjectUnmount
})(withStyles(startProjectPageStyle)(ProjectDetails));
