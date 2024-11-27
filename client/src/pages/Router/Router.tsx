import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blur from "../../components/ui/blur/Blur"
import Queue from "../Queue/Queue"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Archive from "../Archive/Archive"

const Router = () => {
    return (
    <BrowserRouter>
        <Blur />
        <Header />
        <Routes>
            <Route element = { <Queue /> } path = '/' />
            <Route element = { <Archive /> } path = '/archive' />
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}

export default Router