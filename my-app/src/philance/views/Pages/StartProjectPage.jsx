import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import { connect } from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { geolocated } from 'react-geolocated';
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";

import store from '../../store/store'
import { startProject } from "../../actions/startProject";

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
      skills: null,
      locationError: null,
      latitude: '',
      longitude: '',
      error: 'Get Location',
      enable: false,
    };
  }
  getLocation() {
    !this.props.isGeolocationAvailable
      ? this.setState({error: 'Geolocation Not Supported'})
      : !this.props.isGeolocationEnabled
        ? null
        : this.props.coords
          ? this.setState({
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude,
            enable: true,
            error: 'Get Location'
          })
          : this.setState({error: 'GET LOCATION'})
  }

  render() {
    const { classes } = this.props;
    return (
        <GridContainer className={this.props.isLoggedIn?null:classes.container} direction="row" justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info" text>
                <CardText color="info">
                  <h4>Start a project to help others OR ask for help</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        labelText ="Project Name"
                        id="projectName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Name",
                          onChange: e => {
                            this.setState({name: e.target.value})
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Description",
                          onChange: e => {
                            this.setState({description: e.target.value})
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
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
                        <select
                          class="form-control selectpicker"
                          data-style="btn btn-link"
                          id="exampleFormControlSelect1"
                          value = {this.state.volunteers}
                          onChange = {(e)=>{this.setState({volunteers: e.target.value})}}
                          disabled={this.state.volunteerStatus}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <div />

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
                        <select
                          class="form-control selectpicker"
                          data-style="btn btn-link"
                          id="exampleFormControlSelect1"
                          value = {this.state.freelancers}
                          onChange = {(e)=>{this.setState({freelancers: e.target.value})}}
                          disabled = {this.state.freeLanceStatus}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <div />
                      </div>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <select
                          multiple
                          class="form-control selectpicker"
                          data-style="btn btn-link"
                          id="exampleFormControlSelect2"
                          value = {this.state.skills}
                          onChange = {(e)=>{this.setState({skills: e.target.value})}}
                        >
                          <option value = "Skill 1">Skill 1</option>
                          <option value = "Skill 2">Skill 2</option>
                          <option value = "Skill 3">Skill 3</option>
                          <option value = "Skill 4">Skill 4</option>
                          <option value = "Skill 5">Skill 5</option>
                        </select>
                      </div>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <div>
                        <select
                          multiple
                          class="form-control selectpicker"
                          data-style="btn btn-link"
                          id="exampleFormControlSelect2"
                          value = {this.state.impact}
                          onChange = {(e)=>{this.setState({impact: e.target.value})}}
                        >
                          <option value = "Impact Category 1" >Impact Category 1</option>
                          <option value = "Impact Category 2" >Impact Category 2</option>
                          <option value = "Impact Category 3" >Impact Category 3</option>
                          <option value = "Impact Category 4" >Impact Category 4</option>
                          <option value = "Impact Category 5" >Impact Category 5</option>
                        </select>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={7}>
                      <CustomInput
                        id="projectLocation"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:'latitude: '+this.state.latitude+' longitude: '+this.state.longitude,
                          placeholder: "Enter a Project Location"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={2}>
                            <div>
                              <Button color = "info" className = "float-right" onClick={()=>this.getLocation()}>{this.state.error}</Button>
                            </div>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card>
                        <CardHeader color="info" icon>
                          <CardIcon color="info">
                            <LibraryBooks />
                          </CardIcon>
                          <h4 className={classes.cardIconTitle}>Start Date</h4>
                        </CardHeader>
                        <CardBody>
                          <InputLabel className={classes.label}>
                            Start Date
                          </InputLabel>
                          <br />
                          <FormControl fullWidth>
                            <Datetime
                              timeFormat={false}
                              inputProps={{
                                placeholder: "Start Date"
                              }}
                              onChange={date=>this.setState({startDate: date._d})}
                            />
                          </FormControl>
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card>
                        <CardHeader color="info" icon>
                          <CardIcon color="info">
                            <LibraryBooks />
                          </CardIcon>
                          <h4 className={classes.cardIconTitle}>End Date</h4>
                        </CardHeader>
                        <CardBody>
                          <InputLabel className={classes.label}>
                            End Date
                          </InputLabel>
                          <br />
                          <FormControl fullWidth>
                            <Datetime
                              timeFormat={false}
                              inputProps={{
                                placeholder: "End Date",
                            }}
                            onChange={date=>this.setState({startDate: date._d})}
                            />
                          </FormControl>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter estimated budget",
                          onChange: e => {
                            this.setState({budget: e.target.value})
                            console.log(this.state.budget)
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Optional"
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={2} />
                    <GridItem xs={12} sm={2}>
                      <Button onClick = {()=>{
                        const {
                        name,
                        description,
                        volunteers,
                        freelancers,
                        skills,
                        impact,
                        startDate,
                        endDate,
                        budget,
                        latitude,
                        longitude,
                      } = this.state
                      store.dispatch(startProject(
                        name,
                        description,
                        volunteers,
                        freelancers,
                        skills,
                        impact,
                        latitude,
                        longitude,
                        startDate,
                        endDate,
                        budget
                      ))
                      }} color="info">Create a Project</Button>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

StartProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withStyles(startProjectPageStyle)(StartProject)));
