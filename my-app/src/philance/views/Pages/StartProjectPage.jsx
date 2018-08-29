import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
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
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import Face from "@material-ui/icons/Face";
import LaunchIcon from "@material-ui/icons/Launch";
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";
import { geolocated } from 'react-geolocated';
import { compose, withProps } from "recompose"
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {  withScriptjs, withGoogleMap, GoogleMap, Marker  } from "react-google-maps"

import store from '../../store/store'
import { startProject } from "../../actions/startProject";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)


class StartProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
      selectedValue: null,
      selectedEnabled: "b",
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
      latitude: -34.397,
      longitude: 150.644,
      error: 'Get Location',
      enable: false,
      isMarkerShown: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4>Start a project to help others OR ask for help</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Project Name
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={10}>
                      <CustomInput
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Project Description
                      </FormLabel>
                    </GridItem>
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel
                        className={
                          classes.labelHorizontal +
                          " " +
                          classes.labelHorizontalRadioCheckbox
                        }
                      >
                        Resources Needed to complete the project
                      </FormLabel>
                    </GridItem>
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Resource Skill Needed
                      </FormLabel>
                    </GridItem>
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Select Impact Category
                      </FormLabel>
                    </GridItem>
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Project Location
                      </FormLabel>
                    </GridItem>
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
                              <Button color = "rose" className = "float-right" onClick={()=>{
                                !this.props.isGeolocationAvailable
                                  ? this.setState({error: 'Geolocation Not Supported'})
                                  : !this.props.isGeolocationEnabled
                                    ? null
                                    : this.props.coords
                                      ? this.setState({latitude: this.props.coords.latitude, longitude: this.props.coords.longitude, enable: true, error: 'Get Location'})
                                      : this.setState({error: 'Getting Data'})
                              }}>{this.state.error}</Button>
                            </div>
                    </GridItem>
                  </GridContainer>
                 
                    <MyMapComponent
                      isMarkerShown={this.state.isMarkerShown}
                      onMarkerClick={this.handleMarkerClick}
                    />
              
                  <GridContainer>
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Target Project
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card>
                        <CardHeader color="rose" icon>
                          <CardIcon color="rose">
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
                        <CardHeader color="rose" icon>
                          <CardIcon color="rose">
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Estimated Budget for Project
                      </FormLabel>
                    </GridItem>
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
                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Attachments
                      </FormLabel>
                    </GridItem>
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
                      }} color="rose">Create a Project</Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

StartProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withStyles(startProjectPageStyle)(StartProject));