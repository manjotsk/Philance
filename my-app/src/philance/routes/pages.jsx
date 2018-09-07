import PublicHomePage from "philance/views/Pages/PublicHomePage.jsx";
import PvtHomePage from "philance/views/Pages/PvtHomePage.jsx";
import StartProjectPage from "philance/views/Pages/StartProjectPage.jsx";
import ProjectSearch from "philance/views/Pages/ProjectSearchPage.jsx";
import HowItWorksPage from "philance/views/Pages/HowItWorksPage.jsx";
import RegisterPage from "philance/views/Pages/RegisterPage.jsx";
import LoginPage from "philance/views/Pages/LoginPage.jsx";
import MyProjectsPage from "philance/views/Pages/MyProjectsPage.jsx";
import NotificationsPage from "philance/views/Pages/NotificationsPage.jsx";
import MessagesPage from "philance/views/Pages/MessagesPage.jsx";
import UserProfile from "philance/views/Pages/UserProfilePage.jsx";
import ForgotPassword from "../views/Pages/ForgotPassword";
import ProjectDetails from "../views/Pages/ProjectDetails"

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";
import ResetPasswordPublic from "../views/Pages/ResetPasswordPublic";

export const pagesRoutes = [
  {
    path: "/home",
    name: "Home Page",
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
    component: ProjectSearch
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
    path: "/forgotPassword",
    name: "Forgot Password Page",
    short: "Forgot Password",
    mini: "FP",
    icon: PersonAddIcon,
    component: ForgotPassword
    
  },
  {
    path: "/resetPassword/:id",
    name: "Reset Password Page",
    short: "Reset Password",
    mini: "RP",
    icon: PersonAddIcon,
    component: ResetPasswordPublic
    
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home Page"
  },

];
export const headerRoutes = [
  {
    path: "/home",
    name: "Home Page",
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
    component: ProjectSearch
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
    name: "Home Page"
  },

];

export const pvtSidebarRoutes = [
  {
    path: "/home",
    name: "Home Page",
    short: "Home",
    mini: "HP",
    icon: HomeIcon,
    component: PvtHomePage
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
    component: ProjectSearch
  },
  {
    path: "/my-projects",
    name: "My Projects Page",
    short: "My Projects",
    mini: "MPP",
    icon: FolderIcon,
    component: MyProjectsPage
  },
  {
    path: "/notifications",
    name: "Notifications Page",
    short: "Notifications",
    mini: "NP",
    icon: NotificationsIcon,
    component: NotificationsPage
  },
  {
    path: "/messages",
    name: "Messages Page",
    short: "Messages",
    mini: "MP",
    icon: MessageIcon,
    component: MessagesPage
  },
  {
    path: "/profile",
    name: "User Profile Page",
    short: "User Profile",
    mini: "UP",
    icon: PersonIcon,
    component: UserProfile
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home Page"
  }
]

export const pvtPagesRoutes = [
  {
    path: "/home",
    name: "Home Page",
    short: "Home",
    mini: "HP",
    icon: HomeIcon,
    component: PvtHomePage
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
    component: ProjectSearch
  },
  {
    path: "/my-projects",
    name: "My Projects Page",
    short: "My Projects",
    mini: "MPP",
    icon: FolderIcon,
    component: MyProjectsPage
  },
  {
    path: "/notifications",
    name: "Notifications Page",
    short: "Notifications",
    mini: "NP",
    icon: NotificationsIcon,
    component: NotificationsPage
  },
  {
    path: "/messages",
    name: "Messages Page",
    short: "Messages",
    mini: "MP",
    icon: MessageIcon,
    component: MessagesPage
  },
  {
    path: "/profile",
    name: "User Profile Page",
    short: "User Profile",
    mini: "UP",
    icon: PersonIcon,
    component: UserProfile
  },
  {
    path: "/project-details/:id",
    name: "Project Details",
    short: "Details",
    mini: "PD",
    icon: FolderIcon,
    component: ProjectDetails
  },
  {
    redirect: true,
    path: "/project-details",
    pathTo: "/my-projects",
    name: "Home Page"
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home Page"
  }
];
