import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px;
    /* background: #fff; */
    height: 600px;
    width: 600px;

    p {
      color: #999;
    }

    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      img {
        width: 200px;
        height: 50px;
        /* border: 1px solid #d3d3d3; */
      }
    }

    input {
      outline: 0px;
      width: 60%;
      border: 2px solid;
      border-color: #d9d9d9;
      border-radius: 5px;
      color: #333;
      font-size: 14px;
      height: 50px;
      width: 320px;
      transition: border 0.2s ease 0s;
      background: #fff;
      padding: 15px 21px;
      border-image: initial;
      margin: 10px;

      &::placeholder {
        color: #d9d9d9;
      }

      &:focus {
        border-color: #000;
      }
    }

    button {
      width: 320px;
      color: rgb(255, 255, 255);
      font-size: 16px;
      font-weight: bold;
      height: 50px;
      background: #d3d3d3;
      border-radius: 5px;
      border-width: 0px;
      border-style: initial;
      border-color: initial;
      border-image: initial;
      margin-bottom: 10px;
      transition: background 0.2s ease 0s, color 0.2s ease 0s;

      &:hover {
        background: #333;
        color: #fff;
      }
    }
  }
`;
