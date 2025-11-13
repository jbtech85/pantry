import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import styled from 'styled-components'

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vw;

  > div {
    width: 100%;
  }

  nav {
    width: 200px;
  }
`

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