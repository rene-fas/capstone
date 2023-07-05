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

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const List = styled.ul`
  margin-top: 5px;
  list-style-type: none;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ListItem = styled.li`
  padding: 10px;
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

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid black;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  z-index: 2;
`;
