// ##############################
// // // RegisterPage view styles
// #############################

import {
    container,
    cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
    ...customCheckboxRadioSwitch,
    flex: {
        flex: 1,
    },
    cardTitle: {
        ...cardTitle,
        textAlign: "center"
    },
    container: {
        ...container,
        position: "relative",
        zIndex: "3",
        paddingTop: "23vh",
    },
    cardSignup: {
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        marginBottom: "100px",
        padding: "40px 0px",
        marginTop: "20vh"
    },
    infoArea: {
        maxWidth: "660px",
        margin: "0 auto",
        padding: "0px"
    },
    title: {
        fontSize: "28px"
    },
    description: {
        fontSize: "18px"
    },
    center: {
        textAlign: "center"
    },
    right: {
        textAlign: "right"
    },
    left: {
        textAlign: "left"
    },
    form: {
        padding: "0 20px",
        position: "relative"
    },
    socialTitle: {
        fontSize: "18px"
    },
    inputAdornment: {
        marginRight: "18px",
        position: "relative"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    customFormControlClasses: {
        margin: "0 12px"
    },
    checkboxLabelControl: {
        margin: "0"
    },
    checkboxLabel: {
        marginLeft: "6px",
        color: "rgba(0, 0, 0, 0.26)"
    },
    fullPage: {
        "&:before": {
            backgroundColor: "rgba(0, 0, 0, 0.65)"
        },
        "&:before,&:after": {
            display: "block",
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            zIndex: "5"
        }
    },
    fullPageBackground: {
        position: "absolute",
        zIndex: "-5",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center"
    }
};

export default registerPageStyle;
