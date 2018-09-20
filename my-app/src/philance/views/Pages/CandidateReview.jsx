import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

//import publicHomePageStyle from "./PublicHomePageStyle";
import ActionDropdown from '../../components/DoubleDropdown/ActionDropdown'
import CandidatePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { getProjectCandidateReviewList, storeCandidateReview } from '../../actions/candidateReview'
import { connect } from 'react-redux'


const CustomTableCell = withStyles(theme => ({
    body: {
        fontSize: 14,
    },
}))(TableCell);

var eleme ;

class CandidateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
    }

    componentDidMount() {
        this.createList()
      }
    
    renderProjects() {
      if(!this.props.response) {
        return (
         <div/>
        )
    }   
    else {
        return this.props.list
    }
    }
    
      color(i) {
        if(i===1) return '#dbebf6'
      }
    
      async createList() {
          console.log(this.props);
          eleme=this.props;
        const object = []
        let i=0
        console.log(eleme)
        // await eleme.response.forEach(element => {
        //   console.log('element is', element)
        //   let startDate = new Date(element.start_date);
        //   let endDate = new Date(element.end_date);
        //   startDate = startDate.toDateString()
        //   endDate = endDate.toDateString()
        //   startDate = startDate.substr(startDate.indexOf(" ")+1)
        //   endDate = endDate.substr(endDate.indexOf(" ")+1)
        //   i=i===2?1:i+1
        //   object.push(
        //                 <TableRow style={{backgroundColor: this.color(i)}}>
        //                   <CustomTableCell>{element.project_id}</CustomTableCell>
        //                   <CustomTableCell>{element.project_name}</CustomTableCell>
        //                   <CustomTableCell>{element.status}</CustomTableCell>
        //                   <CustomTableCell>{startDate}</CustomTableCell>
        //                   <CustomTableCell>{endDate}</CustomTableCell>
        //                   <CustomTableCell></CustomTableCell>
        //                   <CustomTableCell></CustomTableCell>
        //                   <CustomTableCell>
        //                     {console.log(this.props.response)}
        //                     <Button color="info" onClick={()=>{
        //                     this.props.getProjectById(element.project_id)
        //                     this.props.history.push(`../project-details/${element.project_id}`)
        //                     this.props.idStored(element.project_id)
        //                     }}>Details</Button>
        //                     <Button color="info" onClick={()=>{
        //                     this.props.getProjectCandidateReviewList(element.project_id)
        //                     this.props.history.push(`projectCandidateReview/${element.project_id}/`)
        //                     this.props.idStored(element.project_id)
        //                     }}>Review</Button>
        //                   </CustomTableCell>
        //                 </TableRow>
        //     )
        //   }
        // )
        // console.log('object', object)
        // this.props.storeList(object)
      }

    render() {
        const { classes } = this.props;
        // const elements = this.props;
        // console.log(elements);
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="info" text>
                            <CardText color="info">
                                <h3>Review Candidates</h3>
                            </CardText>
                        </CardHeader>
                        <GridContainer align="right" direction="column">
                            <GridItem style={{marginRight: 45}}>
                                <a onClick={
                                    ()=>{
                                    this.props.history.push('../..')
                                    this.props.history.push(`my-projects/`)
                                }}
                                style={{cursor: 'pointer', color: "blue", fontSize: 15}}
                                >
                                    <i class="fa fa-angle-left"></i>
                                    Go back to my projects
                                </a>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12}>
                                <Card>
                                    <CardBody>
                                        <Table className={classes.table} padding="checkbox">
                                            <TableHead>
                                                <TableRow>
                                                    <CustomTableCell>#</CustomTableCell>
                                                    <CustomTableCell>Name</CustomTableCell>
                                                    <CustomTableCell>Status</CustomTableCell>
                                                    <CustomTableCell>Date Applied</CustomTableCell>
                                                    <CustomTableCell>Messages</CustomTableCell>
                                                    <CustomTableCell>Action</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            {/* <TableRow style={{ backgroundColor: "#dbebf6" }}>
                                                <CustomTableCell>1</CustomTableCell>
                                                <CustomTableCell>New</CustomTableCell>
                                                <CustomTableCell>Active</CustomTableCell>
                                                <CustomTableCell>27/8/18</CustomTableCell>
                                                <CustomTableCell>New Candidate</CustomTableCell>
                                                <CustomTableCell>
                                                    <ActionDropdown />
                                                </CustomTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <CustomTableCell>2</CustomTableCell>
                                                <CustomTableCell>New</CustomTableCell>
                                                <CustomTableCell>Offline</CustomTableCell>
                                                <CustomTableCell>27/8/18</CustomTableCell>
                                                <CustomTableCell>New Candidate</CustomTableCell>
                                                <CustomTableCell>
                                                    <ActionDropdown />
                                                </CustomTableCell>
                                            </TableRow> */}
                                            {
                       this.renderProjects() 
                      }
                                        </Table>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

CandidateReview.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    return {
        projectId: state.proDetails.id,
        response: state.candidateReview.response,
        length: state.candidateReview.length,
        list: state.candidateReview.list
    }
}

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeCandidateReview })(withStyles(CandidatePageStyle)(CandidateReview));
