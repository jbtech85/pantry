import styled from 'styled-components';

export const StyledNav = styled.nav`
  background: hsl(11 100% 89%);

  ul {
    list-style: none;
    padding-inline-start: 5px;

    li {
      padding: 0px 10px 10px 5px;

      a {
        color: black;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        text-decoration: none;

        &:hover {
          color: #e08d12e1;
        }
      }
    }
  }
`
