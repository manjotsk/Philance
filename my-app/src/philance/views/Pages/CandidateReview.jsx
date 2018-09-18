import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import ReactTable from "react-table";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";

//import publicHomePageStyle from "./PublicHomePageStyle";
import ActionDropdown from '../../components/DoubleDropdown/ActionDropdown'
import CandidatePageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class CandidateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
    }

    render() {
        const data = [{
            "#": 1,
            Name: 'Tanner Linsley',
            Status: 'Any',
            dateApplied: "17/9/2018",
            Messages: 'Hey',
            Action: <ActionDropdown />,
        },
        ]
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
                                        <ReactTable style={{ overflow: "none" }}
                                            data={data}
                                            columns={[
                                                {
                                                    Header: "#",
                                                    accessor: "#",
                                                },
                                                {
                                                    Header: "Name",
                                                    accessor: "Name",
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "Status",
                                                },
                                                {
                                                    Header: "Date Applied",
                                                    accessor: "dateApplied",
                                                },
                                                {
                                                    Header: "Messages",
                                                    accessor: "Messages",
                                                },
                                                {
                                                    Header: "Action",
                                                    accessor: "Action",
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
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

CandidateReview.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(CandidatePageStyle)(CandidateReview);
