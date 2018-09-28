import React from "react"
import PropTypes from "prop-types"
import ReactTable from "react-table"

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles"
import Person from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";

// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"

// redux
import { connect } from 'react-redux'
import { myProject, storeList } from '../../actions/myProject'
import { getProjectById, idStored } from '../../actions/projectDetails'
import { getProjectCandidateReviewList } from '../../actions/candidateReview'

import Loader from "../../components/Loader/Loader"
//import publicHomePageStyle from "./PublicHomePageStyle";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 13,
  }
})

class MyProjectsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: false,
      loader: false
    }
  }

  componentDidMount() {
    this.props.myProject(this.props.id)
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
  }

  color(i) {
    if (i === 1) return '#dbebf6'
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }

  render() {
    let data = []
    let i = 0;
    const { classes } = this.props;
    console.log(this.props)
    {
      this.props.response ?
        this.props.response.map((element) => {
          i = i === 2 ? 1 : i + 1
          let startDate = new Date(element.start_date);
          let endDate = new Date(element.end_date);
          startDate = startDate.toDateString()
          endDate = endDate.toDateString()
          let sample = {
            project_name: element.project_name,
            status: element.status,
            startDate: startDate,
            endDate: endDate,
            Close: "",
            Complete: "",
            Action: <span>
              <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
                <Button
                  round
                  justIcon
                  simple
                  onClick={() => {
                    // this.toggleLoader(true)
                    this.props.getProjectById(element.project_id,(flag)=>{
                      // this.toggleLoader(flag)
                      this.props.history.push(`../project-details/${element.project_id}`)
                      this.props.idStored(element.project_id)
                    })
                  }}
                  color="info"
                  className="like"
                ><ViewList /></Button>
              </Tooltip>
              <Tooltip title="Review" classes={{ tooltip: classes.lightTooltip }}>
                <Button
                  justIcon
                  round
                  simple onClick={() => {
                    // this.toggleLoader(true)
                    this.props.getProjectCandidateReviewList(element.project_id, (flag)=>{
                      // this.toggleLoader(flag)
                      this.props.idStored(element.project_id)
                      this.props.history.push(`../projectCandidateReview/${element.project_id}/`)
                    })
                  }} color="info"
                  className="like"
                ><Person /></Button>
              </Tooltip>
            </span>
          }
          data.push(sample)
        }) : null
    }

    return (
      <GridContainer>
        <Loader loader={this.state.loader} />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <ReactTable style={{ overflow: "none" }}
                  data={data}
                  columns={[
                    {
                      Header: <strong>Name</strong>,
                      accessor: "project_name",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Status</strong>,
                      accessor: "status",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Start</strong>,
                      accessor: "startDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Target End</strong>,
                      accessor: "endDate",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong>Close</strong>,
                      accessor: "Close",
                      filterable: true,
                      filterMethod: this.columnFilter
                    },
                    {
                      Header: <strong></strong>,
                      accessor: "Action",
                      sortable: false,
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

const mapStateToProps = state => {
  return {
    response: state.mypro.response,
    length: state.mypro.length,
    list: state.mypro.list,
    id: state.auth.userId
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeList, getProjectById, idStored, myProject })(withStyles(styles)(MyProjectsPage));
