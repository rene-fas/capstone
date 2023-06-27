import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 100px;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Headline = styled.h1`
  text-align: center;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
`;
