import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table"

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "@material-ui/icons/Timeline";
import Accessibility from "@material-ui/icons/Accessibility";
import Group from "@material-ui/icons/Group";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CtButton from "components/CustomButtons/Button.jsx";
import { connect } from 'react-redux'

//import publicHomePageStyle from "./PublicHomePageStyle";
import notificationsPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    let data = [{
      Message: "Reminder for Today",
      Sender: "Any Name",
      Date_Time: "5/2/2017 at 13:07"
    }]
    console.log(this.props)
    return (
        <GridContainer>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <ReactTable style={{ overflow: "none" }}
                  data={this.props.data}
                  columns={[
                    {
                      Header: <strong>Message</strong>,
                      accessor: "test",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Sender</strong>,
                      accessor: "createdBy",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Date and Time</strong>,
                      accessor: "creationDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      
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
        <GridContainer justify="center">
        </GridContainer>
      </GridContainer>
    );
  }
}

NotificationsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps =state=> {
  return {
    data:state.user.notifications,
  }
}

export default connect(mapStateToProps)(withStyles(notificationsPageStyle)(NotificationsPage));
