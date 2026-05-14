import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { LayoutDiv } from "../styles/layout.styles";
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = "Something went wrong";
  if(isRouteErrorResponse(error)) {
    // log for devs
    console.error('Route error: ', error.status, error.data);

    // message for users
    if(error.status === 404) {
      errorMessage = "Page not found";
    } else if(error.status === 401) {
      errorMessage = "You need to be logged in to view this page";
    } else if(error.status === 500) {
      errorMessage = "Server error, please try again later";
    }
  } else if(error instanceof Error) {
    console.error('Application error: ', error.message);
  }

  return (
    <>
      <Header />
      <LayoutDiv>
        <Navbar />
        <p>{errorMessage}</p>
      </LayoutDiv>
    </>
  )
}
export default ErrorPage