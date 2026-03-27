import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { LayoutDiv } from "./styles/layout.styles";


export default function Layout() {
  return (
    <>
      <Header />
      <LayoutDiv>
        <Navbar />
        <Outlet />
      </LayoutDiv>
    </>
  )
}