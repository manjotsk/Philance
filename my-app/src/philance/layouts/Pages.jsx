import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PublicPagesHeader from "philance/components/Header/PublicPagesHeader.jsx";
import PvtPagesHeader from "philance/components/Header/PvtPagesHeader.jsx";
import Footer from "philance/components/Footer/Footer.jsx";

import { pagesRoutes, pvtPagesRoutes } from "philance/routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImagePvt from "philance/assets/img/philance-bg2.jpg";
import bgImagePub from "philance/assets/img/philance-bg3.jpeg";

// var ps;

class Pages extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    if (this.props.isLoggedIn) {
      // display private pages
      return (
        <div>
          <PvtPagesHeader {...rest} />
          <div className={classes.wrapper} ref="wrapper">
            <div className={classes.fullPage}>
              <Switch>
                {pvtPagesRoutes.map((prop, key) => {
                  if (prop.redirect && this.props.registered) {
                    return (
                      <Redirect to ="/profile" />
                    );
                  }
                  else if(prop.redirect && !this.props.registered) {
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
              <Footer white />
              <div
                className={classes.fullPageBackground}
                style={{ backgroundImage: "url(" + bgImagePvt + ")" }}
              />
            </div>
          </div>
        </div>
      );
    } else {
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
      registered: state.reg.registered
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(pagesStyle)(Pages));
