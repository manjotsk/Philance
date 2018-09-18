import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {connect} from 'react-redux'
import {removeToaster, roleChanged, messageChanged, applyForProject} from '../../actions/applyForProject'

import Toaster from "../../components/Toaster/Toaster";

class ApplicationPage extends React.Component {

  state = {
    value: '',
  }

  componentWillUnmount() {
    this.props.removeToaster()
  }

  handleChange = async event => {
    await this.setState({ value: event.target.value });
    this.props.roleChanged(this.state.value)
  }

  onMessageChanged (text) {
    this.props.messageChanged(text)
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.justifyContentCenter}>
        <Toaster display={this.props.toast} message={this.props.text}/>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" text>
                <CardText color="info">
                  <h3>Application to work on project</h3>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                <h2 className={classes.cardTitle}>Application to work on a project</h2><br/>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <InputLabel className={classes.label}>
                        Project Id: {this.props.projectId}, Project Name: {this.props.projectName}
                      </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={6} align="left">
                    <CustomInput
                        id="comments"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                        multiline: true,
                        rows: 2,
                        placeholder:"Enter your comments here explaining why you want to work on this project and whatever other information you want to the project sponsor",
                        onChange: e => {
                          this.onMessageChanged(e.target.value)
                        }
                        }}
                    />
                    </GridItem>
                  </GridContainer>
                  <br/>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                    <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select Your Role</FormLabel>
                    <RadioGroup
                      aria-label="role"
                      name="role"
                      className={classes.group}
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value="volunteer"
                        control={<Radio color="primary" />}
                        label="Volunteer"
                      />
                      <FormControlLabel
                        value="freelancer"
                        control={<Radio color="primary" />}
                        label="Freelancer"
                      />
                    </RadioGroup>
                    </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button 
                      color="info"
                      onClick={()=>{
                        const {projectId, userId, message, role} = this.props
                        this.props.applyForProject({userId, projectId, message, role})
                        console.log(this.props.text)
                      }}
                      >
                      Submit Application to Project Sponsor
                      </Button>
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
    projectId: state.proDetails.id,
    projectName: state.proDetails.name,
    userId: state.auth.userId,
    message: state.applypro.message,
    role: state.applypro.role,
    toast: state.applypro.toast,
    text: state.applypro.text
  }
}

export default connect(mapStateToProps, {
  removeToaster,
  roleChanged,
  messageChanged,
  applyForProject
})(withStyles(startProjectPageStyle)(ApplicationPage));