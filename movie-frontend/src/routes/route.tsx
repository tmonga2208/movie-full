import Browse from "../pages/browse"
import Home from "../pages/home"
import { BrowserRouter, Route, Routes } from "react-router"

function RouteComp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteComp
