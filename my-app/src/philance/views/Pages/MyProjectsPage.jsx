import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Accessibility from "@material-ui/icons/Accessibility";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

//import publicHomePageStyle from "./PublicHomePageStyle";
import myProjectsPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class MyProjectsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
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
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(myProjectsPageStyle)(MyProjectsPage);
