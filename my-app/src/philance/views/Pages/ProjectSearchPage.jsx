import React from "react";
import Axios from "axios";
import { connect } from 'react-redux'
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
import CountryDropdown from "../../components/DoubleDropdown/CountryDropdown";
import projectSearchStyle from "philance/views/PageStyles/ProjectSearchStyles.jsx";
import {
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  keywordChanged,
  findProjectUnmount,
  findProjects
} from "../../actions/findProject";
import store from "../../store/store";

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

let EmptyTableRow = {
  fontSize: "15px",
  color: "black",
}

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

  componentWillUnmount() {
    this.props.findProjectUnmount()
  }

  onLocationChange = text => {
    this.props.locationChanged(text)
  }

  onCountryChanged = (text) => {
    store.dispatch(countryChanged(text))
  }

  emptyTable = () => {
    return (
      <TableRow >
        <CustomTableCell></CustomTableCell>
        <CustomTableCell></CustomTableCell>
        <CustomTableCell style={EmptyTableRow}>No Rows Found</CustomTableCell>
        <CustomTableCell></CustomTableCell>
      </TableRow>);
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

  onCountryChange = text => {
    this.props.countryChanged(text)
  }

  onKeywordChange = text => {
    this.props.keywordChanged(text)
  }
  color(i) {
    if (i === 1) return '#dbebf6'
  }
  findProjects() {
    const {
      interests,
      yourLocation,
      country,
      keyword
    } = this.props
    this.props.findProjects(
      {
        interests,
        yourLocation,
        country,
        keyword
      }
    )
  }

  render() {
    let i = 0;
    let headings = {
      fontSize: "15px",
      color: "black",
    }
    const { classes } = this.props;

    return (
      <GridContainer className={this.props.isLoggedIn ? null : classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
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
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 30 }}>
                      <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.userCountry} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 30 }}>
                      <InterestsDropdown interestOptions={this.props.interestOptions} />
                    </GridItem>
                  </GridContainer>
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
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
                          {
                            ['Needs Volunteers', 'Needs Freelancers', 'Any'].map((prop, key) => {
                              return (
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={prop}
                                >
                                  {prop}
                                </MenuItem>
                              );
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
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
                          {
                            ['Active', 'Closed', 'Any'].map((prop, key) => {
                              return (
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={prop}
                                >
                                  {prop}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Comma seperated keywords"
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

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardBody >
                <Table className={classes.table} padding="checkbox">
                  <TableHead>
                    <TableRow>
                      <CustomTableCell style={headings}>Name</CustomTableCell>
                      <CustomTableCell style={headings}>Status</CustomTableCell>
                      <CustomTableCell style={headings}>Start</CustomTableCell>
                      <CustomTableCell style={headings}>Location</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  {
                    this.props.tableData.length === 0 ?
                      this.emptyTable()
                      :
                      this.props.tableData.map((element) => {
                        i = i === 2 ? 1 : i + 1
                        return (
                          <TableRow style={{ backgroundColor: this.color(i) }}>
                            <CustomTableCell>{element.project_name}</CustomTableCell>
                            <CustomTableCell>{element.status}</CustomTableCell>
                            <CustomTableCell>{element.start_date}</CustomTableCell>
                            <CustomTableCell>{element.country}</CustomTableCell>
                          </TableRow>
                        )
                      })
                  }
                </Table>
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
    interests: state.user.interests,
    resourceTypeOptions: state.findProject.resourceTypeOptions
  }
}


export default connect(mapStateToProps, {
  locationChanged,
  resourceChanged,
  projectStatusChanged,
  impactCategoriesChanged,
  countryChanged,
  findProjectUnmount,
  keywordChanged,
  findProjects
})(withStyles(projectSearchStyle)(ProjectSearch));
