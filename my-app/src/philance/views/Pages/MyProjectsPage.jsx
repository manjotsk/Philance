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
  Loader
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
import {myProject} from '../../actions/myProject'

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
    this.props.myProject()
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
  }

  renderProjects() {

    let object = [] 
    const items = []
    let isRetreived = false
    const { activeItem } = this.state;

    if(!this.props.response) {
      return (
              <Dimmer active inverted>
                <Loader inverted content='Loading' />
              </Dimmer>
      )
  }

  else if(isRetreived) {
    const page = this.state.activePage*10
    for(var i = page;i<page+10;++i) {
      items.push(object[i])
    }
  }

  else {
    this.props.response.forEach(element => 
      object.push(<Menu.Item name={element.project_name} id={element.project_id} active={activeItem === element.project_id} onClick={this.handleItemClick} />)
    )

    for(var i = 0;i<10;++i) {
      items.push(object[i])
    }

    isRetreived = true

      return(
          <Menu fluid vertical>
            {
              items
            }
          </Menu>
      )
  }
  }

  render() {
    
    const { classes } = this.props;
    const { activePage } = this.state;

    return (
        <GridContainer>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={10}>
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
              {
                this.renderProjects()
              }
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
          </Grid>
        </GridContainer>
        </GridContainer>
    );
  }
}

const mapStateToProps =state=> {
  return {
    response: state.mypro.response,
    length: state.mypro.length
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {myProject})(withStyles(myProjectsPageStyle)(MyProjectsPage));
