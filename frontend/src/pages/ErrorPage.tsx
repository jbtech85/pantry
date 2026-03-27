import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { LayoutDiv } from "../styles/layout.styles";
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <LayoutDiv>
        <Navbar />
        error in progress
      </LayoutDiv>
    </>
  )
}
export default ErrorPage