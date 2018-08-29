import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import { connect } from 'react-redux'

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

import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";

class StartProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [24, 22],
      selectedValue: null,
      selectedEnabled: "b"
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
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  render() {
    const { classes } = this.props;
    return (
        <GridContainer className={this.props.isLoggedIn?null:classes.container} direction="row" justify="center">
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
                          placeholder: "Enter a Project Name"
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
                          placeholder: "Enter a Project Description"
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
                              onClick={() => this.handleToggle(3)}
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
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <div />

                        <FormControlLabel
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => this.handleToggle(3)}
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
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
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
                        >
                          <option>Skill 1</option>
                          <option>Skill 2</option>
                          <option>Skill 3</option>
                          <option>Skill 4</option>
                          <option>Skill 5</option>
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
                        >
                          <option>Impact Category 1</option>
                          <option>Impact Category 2</option>
                          <option>Impact Category 3</option>
                          <option>Impact Category 4</option>
                          <option>Impact Category 5</option>
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
                    <GridItem xs={12} sm={10}>
                      <CustomInput
                        id="projectDescription"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Description"
                        }}
                      />
                    </GridItem>
                  </GridContainer>

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
                              inputProps={{ placeholder: "Start Date" }}
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
                              inputProps={{ placeholder: "End Date" }}
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
                          placeholder: "Enter a Project Description"
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
                      <Button color="rose">Create a Project</Button>
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

export default connect(mapStateToProps)(withStyles(startProjectPageStyle)(StartProject));
