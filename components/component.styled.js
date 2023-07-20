import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  padding-top: 100px;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;
  background-color: gainsboro;
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
  border: 2px solid #337ab7;
  border-radius: 4px;
`;

export const ListItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Headline = styled.h2`
  text-align: center;
`;

export const PopupHeadline = styled.h3`
  font-size: 16px;
  text-align: center;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, lightgray, gainsboro);
  z-index: 9999;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid black;
  background-color: lightgray;
  padding: 20px;
  border-radius: 4px;
  z-index: 2;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const LinkButton = styled(Button)`
  flex-basis: 75%;
`;

export const RemoveButton = styled(Button)`
  flex-basis: 12.5%;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  flex-basis: 75%;
`;

export const EditButton = styled(Button)`
  flex-basis: 12.5%;
`;

export const StyledInput = styled.input`
  margin-bottom: 10px;
`;
