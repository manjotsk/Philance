import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "../components/Header/Header/Header";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "./Sidebar";

import dashboardRoutes from "routes/dashboard.jsx";
import { pagesRoutes, pvtPagesRoutes } from "philance/routes/pages.jsx";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import {connect} from 'react-redux'

import image from "assets/img/sidebar-2.jpg";
import logo from "../assets/logos/philancelogo.png";
import logoText from "../assets/logos/Philance-logo-text.png";
import { getCommonInfo } from "../actions/common";
import { getUserInfo } from "../actions/userProfile";


const switchRoutes =(isRegistered)=> (
  <Switch>
    {/* {pvtPagesRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })} */}
    {pvtPagesRoutes.map((prop, key) => {
                  if (prop.redirect && isRegistered) {
                    return (
                      <Redirect to ="/profile" />
                    );
                  }
                  else if(prop.redirect && !isRegistered) {
                    return (
                      <Redirect from={prop.path} to={prop.pathTo} key={key} />
                    )
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
);

var ps;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    miniActive: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  componentDidMount() {
    console.log(this.props.isLoggedIn, this.props.isRegistered)
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    this.props.getCommonInfo()
    this.props.getUserInfo(this.props.currentEmail)
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }
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
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={pvtPagesRoutes}
          logoText={logoText}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={pvtPagesRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(this.props.isRegistered)}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps =state=> {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.reg.registered,
    currentEmail: state.auth.email===""?state.reg.email:state.auth.email,
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps,{getCommonInfo,getUserInfo})(withStyles(appStyle)(Dashboard));
