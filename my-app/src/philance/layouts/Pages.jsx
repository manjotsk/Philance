import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import cx from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PublicPagesHeader from "philance/components/Header/PublicPagesHeader.jsx";
import PvtPagesHeader from "philance/components/Header/PvtPagesHeader.jsx";
import Footer from "philance/components/Footer/Footer.jsx";

import { pagesRoutes, pvtPagesRoutes } from "philance/routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import Dashboard from '../layouts/Dashboard'
import bgImagePvt from "philance/assets/img/philance-bg2.jpg";
import bgImagePub from "philance/assets/img/philance-bg3.jpeg";

import {myProject} from '../actions/myProject'

import Sidebar from "../../components/Sidebar/Sidebar"
// var ps;

const switchRoutes = (
  <Switch>
    {pvtPagesRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Pages extends React.Component {
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  constructor(props) {
    super(props);
    this.state = {
      // variable for deciding if the sidebar is open (true) or not (false) on a mobile device
      mobileOpen: true,
      // variables for deciding if the sidebar is mini (true) or full width (false)
      miniActive: true
    };
  }
  // function for changeing the component from open to not open and vice versa on a mobile device
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  // function for changeing the component from mini to full width and vice versa
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {

    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    if (this.props.isLoggedIn) {
      this.props.myProject(this.props.id)
      return (
        <Dashboard {...rest}/>
      )}

    else {
      //display public pages
      return (
        <div>
          <PublicPagesHeader {...rest} />
          <div className={classes.wrapper} ref="wrapper">
            <div className={classes.fullPage}>
              <Switch>
                {pagesRoutes.map((prop, key) => {
                  if (prop.redirect) {
                    return (
                      <Redirect from={prop.path} to={prop.pathTo} key={key} />
                    );
                  }
                  return (
                    <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
              </Switch>
              <Footer white />
              <div
                className={classes.fullPageBackground}
                style={{ backgroundImage: "url(" + bgImagePub + ")" }}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    id: state.auth.userId
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {myProject})(withStyles(pagesStyle)(Pages));
