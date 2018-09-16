import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {connect} from 'react-redux'

import Toaster from "../../components/Toaster/Toaster";

class ApplicationPage extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.justifyContentCenter}>
        <Toaster display={this.props.toast} message={'Project has been updated'}/>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" text>
                <CardText color="info">
                  <h3>Application to work on project</h3>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                <h2 className={classes.cardTitle}>Application to work on a project</h2>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <FormLabel className={classes.labelHorizontal} style={{color:"#777777",marginBottom:'2vh'}}>
                        Project Id and Name
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Enter your comments herte explaining why you want 
                        to work on this project and whatever other information you want 
                        to the project sponsor"
                        id="about-me"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                        multiline: true,
                        rows: 5,
                        onChange: e => {
                            this.onDescriptionChange(e.target.value)
                        }
                        }}
                    />
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

const mapStateToProps =state=> {
  return {
    name: state.proDetails.name,
    description: state.proDetails.description,
    zipCode: state.proDetails.zipCode,
    freelancers: state.proDetails.freelancers,
    volunteers: state.proDetails.volunteers,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    endDate: state.proDetails.endDate,
    budget: state.proDetails.budget,
    toast: state.proDetails.toast,
    id: state.proDetails.id,
    interests: state.proDetails.interests,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    userId:state.user.userId
  }
}

export default connect(mapStateToProps)(withStyles(startProjectPageStyle)(ApplicationPage));
