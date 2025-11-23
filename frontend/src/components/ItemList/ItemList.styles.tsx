import styled from 'styled-components';

export const ItemLI = styled.li`
  border-bottom: 1px solid grey;
  display: flex;
  padding: 10px 0px;
  
  div {
    display: flex;
    flex-grow: 1;

    div {
      flex: 1;
    }

    button {
      background: transparent;
      border: none;
      font-size: 26px;
      padding: 0 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
