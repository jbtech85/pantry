import styled from 'styled-components';

export const StyledLoginForm = styled.form`
  background: hsl(16 35% 91%);
  border-radius: 15%;
  font-size: 18px;
  height: 180px;
  margin-left: 20px;
  padding: 30px 40px;
  text-align: center;

  label {
    display: block;
    text-align: right;
  }

  button {
    background: hsl(16 70% 51%);
    border: none;
    border-radius: 5px;
    color: white;
    float: right;
    padding: 5px 10px;
  }

  span {
    font-size: 14px;

    a {
      color: #2401e8;
    }
  }


`
