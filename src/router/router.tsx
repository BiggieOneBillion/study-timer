import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "../layout/root";
import HomePage from "../pages/home";
// import CountDown from "../components/count-down";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} >
           <Route index element={<HomePage />} />
           {/* <Route path="timer" element={<CountDown />} /> */}
        </Route>
    )
)