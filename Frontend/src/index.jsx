import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/Student/Dashboard/Dashboard";
import Profile from "./Components/Student/Profile/Profile"
import Notifications from "./Components/Student/Notifications/Notifications";
import Sidemenu from "./Components/Sidemenu";
import SignIn from "./Components/Signin";
import Login from "./Components/Login";
import Participation from "./Components/Student/Participation/Participation";

const App = () => {
    return (
        <div className="flex">
            <Sidemenu />
            <Outlet />
        </div>
    );
};

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />, // This will be shown first
    },
    {
        path: "/dashboard",
        element: <App />, // Sidebar will be included here
        children: [
            {
                path: "", // This will match the /dashboard route
                element: <Dashboard />,
            },
            {
                path: "profile", // This will match /dashboard/profile
                element: <Profile/>
            },
            {
                path: "notifications", // This will match /dashboard/notifications
                element: <Notifications />,
            },
            {
                path: "Participation", // This will match /dashboard/notifications
                element: <Participation />,
            },
        ],
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);
