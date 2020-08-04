import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Icons from "./views/examples/Icons.js";
import Categories from "./views/Categories";
import Services from "./views/Services";
import Users from "./views/Users";
import Booking from "./views/Booking"
import ConfirmPayment from "./views/ConfirmPayment.js";

var routes = [
	{
		path: "/index",
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		component: Index,
		layout: "/admin"
	},
	{
		path: "/services",
		name: "Services",
		icon: "ni ni-controller text-red",
		component: Services,
		layout: "/admin"
	},
	{
		path: "/categories",
		name: "Categories",
		icon: "ni ni-collection text-green",
		component: Categories,
		layout: "/admin"
	},
	{
		path: "/booking",
		name: "Booking",
		icon: "ni ni-cart text-purple",
		component: Booking,
		layout: "/admin"
	},
	{
		path: "/confirm-payment",
		name: "Confirm Payment",
		icon: "ni ni-money-coins text-yellow",
		component: ConfirmPayment,
		layout: "/admin"
	},
	{
		path: "/users",
		name: "Users",
		icon: "ni ni-circle-08 text-black",
		component: Users,
		layout: "/admin"
	},

	{
		path: "/icons",
		name: "Icons",
		icon: "ni ni-planet text-blue",
		component: Icons,
		layout: "/admin"
	},
	{
		path: "/maps",
		name: "Maps",
		icon: "ni ni-pin-3 text-orange",
		component: Maps,
		layout: "/admin"
	},
	{
		path: "/user-profile",
		name: "User Profile",
		icon: "ni ni-single-02 text-yellow",
		component: Profile,
		layout: "/admin"
	},
	{
		path: "/tables",
		name: "Tables",
		icon: "ni ni-bullet-list-67 text-red",
		component: Tables,
		layout: "/admin"
	},
	{
		path: "/login",
		name: "Login",
		icon: "ni ni-key-25 text-info",
		component: Login,
		layout: "/auth"
	},
	{
		path: "/register",
		name: "Register",
		icon: "ni ni-circle-08 text-pink",
		component: Register,
		layout: "/auth"
	}
];
export default routes;
