import PublicHomePage from "philance/views/Pages/PublicHome/PublicHomePage.jsx";
import StartProjectPage from "philance/views/Pages/StartProjectPage.jsx";
import FindProjectPage from "philance/views/Pages/FindProjectPage.jsx";
import HowItWorksPage from "philance/views/Pages/HowItWorksPage.jsx";
import RegisterPage from "philance/views/Pages/RegisterPage.jsx";
import LoginPage from "philance/views/Pages/LoginPage.jsx";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const pagesRoutes = [
  {
    path: "/home",
    name: "Public Home Page",
    short: "Home",
    mini: "PHP",
    icon: HomeIcon,
    component: PublicHomePage
  },
  {
    path: "/start-project",
    name: "Start Project Page",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage
  },
  {
    path: "/find-project",
    name: "Find Project Page",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: FindProjectPage
  },
  {
    path: "/how-it-works",
    name: "How It Works Page",
    short: "How It Works",
    mini: "HIWP",
    icon: HelpIcon,
    component: HowItWorksPage
  },
  {
    path: "/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: FingerprintIcon,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register Page",
    short: "Sign Up",
    mini: "RP",
    icon: PersonAddIcon,
    component: RegisterPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Public Home Page"
  }
];

export default pagesRoutes;
