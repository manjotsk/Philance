import React from "react";
import ReactTable from "react-table";
//import Axios from "axios";
import { connect } from 'react-redux'
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import projectSearchStyle from "philance/views/PageStyles/ProjectSearchStyles.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

class ProjectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      skillsNeeded: [],
      impactCategory: [],
      yourLocation: "",
      resourceType: "0",
      projectStatus: "0",
      distanceFromYou: "0"
    };
  }

  // @todo populate UI with init data from the backend
  componentDidMount() {
    console.log("mounted");
    /*
    Axios.get("/project/search/init", {
      baseURL: "http://localhost:3001"
    })
      .then(response => {
        // @todo UI init data from backend, use to populate Select boxes
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      */
  }

  handleSingle = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleMultiple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  columnFilter(filter, row, column) {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id])
        .toLowerCase()
        .includes(filter.value.toLowerCase())
      : true;
  }

  findProjects() {
    let filterParams = this.state;
    filterParams.tableData = [];
    /*
    Axios.get("/project", {
      baseURL: "http://localhost:3001",
      params: filterParams
    })
      .then(response => {
        console.log(response);
        this.setState({ tableData: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    */
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn?null:classes.container}>
      {console.log(this.props.isLoggedIn,'***************************')}
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Find Projects</h4>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <CustomInput
                        labelText="Your Location"
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
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="distance-from-you"
                          className={classes.selectLabel}
                        >
                          Distance From You
                        </InputLabel>
                        <Select
                          value={this.state.distanceFromYou}
                          onChange={this.handleSingle}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "distanceFromYou",
                            id: "distance-from-you"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Distance From You
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="0"
                          >
                            Any
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            Within 5 miles
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Within 10 miles
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Within 25 miles
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={8} sm={6} md={4} lg={4}>
                      <CustomInput
                        labelText="Keywords/Hashtags"
                        id="keywords"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "keywordsHashtags",
                          onChange: e => {
                            this.setState({ [e.target.name]: e.target.value });
                            console.log(this.state);
                          }
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="skills-needed"
                          className={classes.selectLabel}
                        >
                          Skills Needed
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.skillsNeeded}
                          onChange={this.handleMultiple}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "skillsNeeded",
                            id: "skills-needed"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Skills Needed
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            IT
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Communication
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Accounting
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="impact-category"
                          className={classes.selectLabel}
                        >
                          Impact Category
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.impactCategory}
                          onChange={this.handleMultiple}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "impactCategory",
                            id: "impact-category"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Impact Category
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            Community
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Elderly
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Homeless
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="resource-type"
                          className={classes.selectLabel}
                        >
                          Resource Type
                        </InputLabel>
                        <Select
                          value={this.state.resourceType}
                          onChange={this.handleSingle}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "resourceType",
                            id: "resource-type"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Resource Type
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="0"
                          >
                            Any
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            Needs Volunteers
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Needs Freelancers
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="project-status"
                          className={classes.selectLabel}
                        >
                          Project Status
                        </InputLabel>
                        <Select
                          value={this.state.projectStatus}
                          onChange={this.handleSingle}
                          MenuProps={{ className: classes.selectMenu }}
                          classes={{ select: classes.select }}
                          inputProps={{
                            name: "projectStatus",
                            id: "project-status"
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Project Status
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="0"
                          >
                            Any
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            Active
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Closed
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Future
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <br />
                  <GridContainer>
                    <GridItem>
                      <Button color="info" onClick={() => this.findProjects()}>
                        Find
                      </Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardBody>
                <ReactTable
                  data={this.state.tableData}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: "Description",
                      accessor: "description",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: "Location",
                      accessor: "location",
                      filterable: true,
                      filterMethod: this.columnFilter
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridContainer>

    );
  }
}

ProjectSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

const myObj = withStyles(extendedFormsStyle)(ProjectSearch);
export default connect(mapStateToProps)(withStyles(projectSearchStyle)(myObj));
