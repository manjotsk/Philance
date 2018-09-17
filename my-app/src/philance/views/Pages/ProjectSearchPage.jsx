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
import InterestsDropdown from "../../components/DoubleDropdown/InterestsDropdown";
import projectSearchStyle from "philance/views/PageStyles/ProjectSearchStyles.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { 
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  keywordChanged,
  findProjects
 } from "../../actions/findProject";

class ProjectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      impactCategory: [],
      yourLocation: "",
      resourceType: "0",
      projectStatus: "0",
      distanceFromYou: "0"
    };
  }

  onLocationChange=text=>{
    this.props.locationChanged(text)
  }

  handleResourceType = event => {
    this.props.resourceChanged(event.target.value)
  };

  handleProjectStatus = event => {
    this.props.projectStatusChanged(event.target.value)
    
  };
  
  handleImpactCategory = event => {
    this.props.impactCategoriesChanged(event.target.value)
  };
  
  onCountryChange=text=>{
    this.props.countryChanged(text)
  }

  onKeywordChange=text=>{
    console.log(text)
    this.props.keywordChanged(text)
  }
  
  columnFilter(filter, row, column) {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id])
        .toLowerCase()
        .includes(filter.value.toLowerCase())
      : true;
  }

  findProjects() {
    const {
      volunteers,
      freelancers,
      interests,
      yourLocation,
      country,
    }=this.props
    console.log('this.props',this.props)
    this.props.findProjects(
      {
        volunteers,
        freelancers,
        interests,
        yourLocation,
        country
      }
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={this.props.isLoggedIn?null:classes.container}>
        <GridContainer>{console.log(this.props)}
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
                            this.onLocationChange(e.target.value)
                          }
                        }}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={4} md={3} lg={3}>
                      <CustomInput
                        labelText="Your Country"
                        id="project-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "yourCountry",
                          onChange: e => {
                            this.onCountryChange(e.target.value)
                          }
                        }}
                      />
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
                            this.onKeywordChange(e.target.value)
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
                          htmlFor="impact-category"
                          className={classes.selectLabel}
                        >
                          Impact Category
                        </InputLabel>
                      </FormControl>
                      <InterestsDropdown interestOptions={this.props.interestOptions}/>
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
                          value={this.props.resourceType}
                          onChange={this.handleResourceType}
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
                          value={this.props.projectStatus}
                          onChange={this.handleProjectStatus}
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
              <CardBody >
                <ReactTable
                  style={{marginerRight:'100px'}}
                  data={this.props.tableData}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "project_name",
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
                      accessor: "country",
                      filterable: true,
                      // filterMethod: this.columnFilter
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>{console.log('this.props.tableData',this.props.tableData)}
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
    tableData: state.findProject.tableData,
    impactCategories: state.findProject.impactCategories,
    yourLocation: state.findProject.yourLocation,
    resourceType: state.findProject.resourceType,
    projectStatus: state.findProject.projectStatus,
    distanceFromYou: state.findProject.distanceFromYou,
    keyword: state.findProject.keyword,
    country: state.findProject.country,
    textChanged: state.findProject.textChanged,
    interestOptions: state.common.interestOptions,
    interests:state.user.interests
  }
}


export default connect(mapStateToProps, {
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  keywordChanged,
  findProjects
})(withStyles(projectSearchStyle)(ProjectSearch));
