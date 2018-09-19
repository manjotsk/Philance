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

class CandidateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
    }



    render() {
        const { classes } = this.props;

        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                    <Card>
                        <CardHeader color="info" text>
                            <CardText color="info">
                                <h3>Review Candidates</h3>
                            </CardText>
                        </CardHeader>
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
                                            <TableRow style={{ backgroundColor: "#dbebf6" }}>
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
                                            </TableRow>
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
        response: state.candidateReview.response,
        length: state.candidateReview.length,
        list: state.candidateReview.list
    }
}

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeCandidateReview })(withStyles(CandidatePageStyle)(CandidateReview));
