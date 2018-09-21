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
import Button from "components/CustomButtons/Button.jsx";
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

class CandidateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
    }

    componentDidMount() {
        this.props.getProjectCandidateReviewList(this.props.projectId);
      }
    
    color(i) {
        if (i === 1) return '#dbebf6'
    }

    render() {

        const { classes } = this.props;

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
                            <GridItem style={{ marginRight: 45 }}>
                            <Button color="info" round className={classes.marginRight} onClick={() => {
                                {console.log(this.props.history)}
                                this.props.history.push('../..')
                                this.props.history.push(`my-projects/`)
                                                                    }}>
                                <i class="fa fa-angle-left"></i> Back to my projects
                            </Button>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12}>
                                <Card>
                                    <CardBody>
                                        <Table className={classes.table} padding="checkbox">
                                            <TableHead>
                                                <TableRow>
                                                    <CustomTableCell>Project Name</CustomTableCell>
                                                    <CustomTableCell>Candidate Name</CustomTableCell>
                                                    <CustomTableCell>Date Applied</CustomTableCell>
                                                    <CustomTableCell>Candidate Status</CustomTableCell>
                                                    <CustomTableCell>Action</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                this.props.response ?
                                                    this.props.response.map((element) => {
                                                        let i = 0
                                                        let appliedDate = new Date(element.appliedDate);
                                                        appliedDate = appliedDate.toDateString()
                                                        return (
                                                            <TableRow style={{ backgroundColor: this.color(i) }}>
                                                                <CustomTableCell>New Project1</CustomTableCell>
                                                                <CustomTableCell>abc</CustomTableCell>
                                                                <CustomTableCell>{appliedDate}</CustomTableCell>
                                                                <CustomTableCell>{element.status}</CustomTableCell>
                                                                <CustomTableCell>
                                                                    <Button color="info" onClick={() => {
                                                                    }}>Accept</Button>
                                                                    <Button color="info" onClick={() => {
                                                                    }}>Reject</Button>
                                                                </CustomTableCell>
                                                            </TableRow>
                                                        )
                                                    }) : null
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
        list: state.candidateReview.list,
    }
}

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeCandidateReview })(withStyles(CandidatePageStyle)(CandidateReview));
