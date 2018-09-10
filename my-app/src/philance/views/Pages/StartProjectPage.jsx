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
import {InterestsDropdown} from '../../components/DoubleDropdown'
import {connect} from 'react-redux'
import { Button as Buttons, Label, Icon} from 'semantic-ui-react';

import { getCommonInfo, uploadFiles } from "../../actions/common";

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
  startProjectUnmount
} from '../../actions/startProject'
import Toaster from "../../components/Toaster/Toaster";


const uid = Math.random().toString(36).substring(7);
class StartProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      name: '',
      description: '',
      freelancers: '',
      impact: '',
      volunteerStatus: true,
      freeLanceStatus: true,
      volunteers: null,
      freeLancers: null,
      startDate: null,
      endDate: null,
      budget: null,
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
  
  onFilesChange(e){
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
                  <h4>Start a project to help others OR ask for help</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={14}>
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
                          }
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
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12}>
                      <CustomInput
                      labelText ="Project Zip Code"
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
                    <GridItem xs={12} sm={6}><br/>
                        <InputLabel className={classes.label} style={{marginBottom: 5, marginTop: 10}}>
                          Impact Category
                        </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}><br/>
                      <InterestsDropdown interestOptions={this.props.interestOptions}/>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6}><br/><br/>
                        <InputLabel className={classes.label} style={{marginTop: 20}}>
                          Resources Needed
                        </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem style = {{marginTop: 23}}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => this.setState({volunteerStatus: !this.state.volunteerStatus})}
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
                          label="Volunteers"
                        />
                        </GridItem>
                        <GridItem md ={6}>
                        <CustomInput
                        id="volunteers"
                        labelText ="Volunteers"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled : this.state.volunteerStatus,
                          placeholder: "Enter Number of Volunteers",
                          onChange: e => {
                            this.onVolunteersChange(e.target.value)
                          }
                        }}
                      />
                        </GridItem>
                        </GridContainer>
                        <GridContainer>
                        <GridItem style = {{marginTop: 23}}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => this.setState({freeLanceStatus: !this.state.freeLanceStatus})}
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
                          label="Freelancers"
                        />
                        </GridItem>
                        <GridItem md ={6}>
                        <CustomInput
                        labelText ="Freelancers"
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled : this.state.freeLanceStatus,
                          placeholder: "Enter Number of Freelancers",
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
                          <InputLabel className={classes.label}>
                            Project Start Date
                          </InputLabel>
                          <br />
                          <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                  timeFormat={false}
                                  onChange={date=>this.onStartDateChange(date._d)}
                                />
                            </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' onClick = {()=>{console.log('hello')}}/>
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
                            Project End Date
                          </InputLabel>
                          <br />
                          <FormControl fullWidth>
                          <GridContainer>
                            <GridItem xs={9}>
                              <Datetime
                                  timeFormat={false}
                                  onChange={date=>this.onEndDateChange(date._d)}
                                />
                              </GridItem>
                            <GridItem xs={3}>
                              <Icon bordered inverted color='teal' name='calendar alternate outline' onClick = {()=>{console.log('hello')}}/>
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
                        labelText ="Budget"
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter Estimated Budget (USD)",
                          onChange: e => {
                            this.onBudgetChange(e.target.value)
                            console.log(this.state.budget)
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
                        <Icon name='upload'/>Select Files{'\t\t\t'}
                        <input type="file" id={uid}
                          multiple
                          style={{display: "none"}}
                          name="files"
                          onChange={(e)=>this.onFilesChange(e)}
                        />
                        <Button
                            icon="upload"
                            onClick={()=>{
                              //call upload Action
                              this.props.uploadFiles('startProject',this.props.files)
                            }}
                        >Upload</Button>
                      </Label>

                      {this.props.uploadStatus=='NOT_INITIATED'?null:
                      <Toaster display={true} message={this.props.uploadStatus}/>}

                    </GridItem>
                    {console.log('******45',this.props.files)}
                  </GridContainer>
                  <br/>
                  <GridContainer className={classes.justifyContentCenter}> 
                    <GridItem>
                      <Button onClick = {()=>{
                        const {
                        name,
                        description,
                        volunteers,
                        freelancers,
                        zipCode,
                        interests,
                        startDate,
                        endDate,
                        budget,
                        userId,
                        files
                      } = this.props
                      console.log(this.props)
                      this.props.startProject({
                        name,
                        description,
                        volunteers,
                        freelancers,
                        zipCode,
                        interests,
                        startDate,
                        endDate,
                        budget,
                        userId,
                        files
                      })
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
    userId:state.user.userId,
    files:state.start.files,
    uploadStatus:state.common.uploadStatus
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
