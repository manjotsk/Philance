import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "@material-ui/icons/Timeline";
import Accessibility from "@material-ui/icons/Accessibility";
import Group from "@material-ui/icons/Group";

// scemetic-ui
import {
  Grid,
  Pagination,
  Menu,
  Dimmer,
  Loader,
  Table
} from 'semantic-ui-react'

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CtButton from "components/CustomButtons/Button.jsx";

// redux
import {connect} from 'react-redux'
import {myProject, storeList} from '../../actions/myProject'

//import publicHomePageStyle from "./PublicHomePageStyle";
import myProjectsPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class MyProjectsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    }
  }

  componentDidMount() {
    this.createList()
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
  }

  renderProjects() {
    if(!this.props.response) {
      return (
              <Dimmer active inverted>
                <Loader inverted content='Loading' />
              </Dimmer>
      )
  }

  else {
      return this.props.list
  }
}

  async createList() {
    const { activeItem } = this.state
    const object = []
    await this.props.response.forEach(element => 
      object.push(
        <Table.Row>
          <Table.Cell>{element.project_id}</Table.Cell>
          <Table.Cell>{element.project_name}</Table.Cell>
          <Table.Cell>{element.status}</Table.Cell>
          <Table.Cell>{element.start_date}</Table.Cell>
          <Table.Cell>{element.end_date}</Table.Cell>
          <Table.Cell>close</Table.Cell>
          <Table.Cell>percentage</Table.Cell>
        </Table.Row>)
    )
    console.log('object', object)
    this.props.storeList(object)
  }

  render() {
    
    const { classes } = this.props;
    const { activePage } = this.state;

    return (
        <GridContainer>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>My projects Page</h2>
              <CardBody>
                <InfoArea
                  classes={classes}
                  title="My projects"
                  description="My projects"
                  icon={Accessibility}
                  iconColor="rose"
                />
              </CardBody>

              <Table celled unstackable sortable verticalAlign="middle">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Start</Table.HeaderCell>
                    <Table.HeaderCell>Target End</Table.HeaderCell>
                    <Table.HeaderCell>Close</Table.HeaderCell>
                    <Table.HeaderCell>% Complete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                  <Table.Body>
                  {
                this.renderProjects()
              }
                  </Table.Body>
              </Table>
    
            </Card>
          </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <Grid>
            <Grid.Column>
              <Pagination
                activePage={activePage}
                onPageChange={this.handlePaginationChange}
                totalPages={this.props.length/10}
              />
            </Grid.Column>
          {async ()=> {
            await this.props.createList()
            console.log('ss',this.props.list)
          }}
          </Grid>
        </GridContainer>
        </GridContainer>
    );
  }
}

const mapStateToProps =state=> {
  return {
    response: state.mypro.response,
    length: state.mypro.length,
    list: state.mypro.list
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {myProject, storeList})(withStyles(myProjectsPageStyle)(MyProjectsPage));
