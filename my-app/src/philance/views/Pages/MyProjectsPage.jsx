import React from "react"
import PropTypes from "prop-types"

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles"

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "components/CustomButtons/Button.jsx";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"

// redux
import {connect} from 'react-redux'
import {myProject, storeList} from '../../actions/myProject'
import {getProjectById} from '../../actions/projectDetails'

//import publicHomePageStyle from "./PublicHomePageStyle";

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
  }
})

class MyProjectsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    }
  }

  componentDidMount() {
    this.createList()
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
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
    const object = []
    let i=0
    await this.props.response.forEach(element => {
      console.log('element is', element)
      let startDate = new Date(element.start_date);
      let endDate = new Date(element.end_date);
      startDate = startDate.toDateString()
      endDate = endDate.toDateString()
      startDate = startDate.substr(startDate.indexOf(" ")+1)
      endDate = endDate.substr(endDate.indexOf(" ")+1)
      i=i===2?1:i+1
      object.push(
                    <TableRow style={{backgroundColor: this.color(i)}}>
                      <CustomTableCell>{element.project_id}</CustomTableCell>
                      <CustomTableCell>{element.project_name}</CustomTableCell>
                      <CustomTableCell>{element.status}</CustomTableCell>
                      <CustomTableCell>{startDate}</CustomTableCell>
                      <CustomTableCell>{endDate}</CustomTableCell>
                      <CustomTableCell></CustomTableCell>
                      <CustomTableCell></CustomTableCell>
                      <CustomTableCell><Button color="info" onClick={()=>{
                        this.props.getProjectById(element.project_id)
                        this.props.history.push(`project-details/${element.project_id}`)
                        }}>Details</Button></CustomTableCell>
                    </TableRow>
        )
      }
    )
    console.log('object', object)
    this.props.storeList(object)
  }

  render() {
    
    const { classes } = this.props;
    const { activePage } = this.state;

    return (
        <GridContainer>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} justify="center">
            <Card className={classes.cardSignup}>
              <CardBody>
                  <Table className={classes.table} padding="checkbox">
                    <TableHead>
                      <TableRow>
                      <CustomTableCell>ID</CustomTableCell>
                      <CustomTableCell>Name</CustomTableCell>
                      <CustomTableCell>Status</CustomTableCell>
                      <CustomTableCell>Start</CustomTableCell>
                      <CustomTableCell>Target End</CustomTableCell>
                      <CustomTableCell>Close</CustomTableCell>
                      <CustomTableCell>% Complete</CustomTableCell>
                      <CustomTableCell>Actions</CustomTableCell>                      
                      </TableRow>
                    </TableHead>
                      {
                       this.renderProjects() 
                      }
                  </Table>
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

const mapStateToProps =state=> {
  return {
    response: state.mypro.response,
    length: state.mypro.length,
    list: state.mypro.list
  }
}

MyProjectsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {myProject, storeList, getProjectById})(withStyles(styles)(MyProjectsPage));
