import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 10px;
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
  background-color: whitesmoke;
  color: black;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

export const ListItem = styled.li`
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const PopupHeadline = styled.h3`
  font-size: 16px;
  text-align: center;
`;

export const Header = styled.header`
  position: fixed;
  align-items: center;
  gap: 10px;
  min-height: 65px;
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

export const Headline = styled.h2`
  text-align: center;
  flex: 1;
  font-size: 20px;
  margin: 10px 0px 5px 0px;
`;

export const HeaderContainer = styled.div``;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: lightgray;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 4px;
  z-index: 2;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: stretch, center;
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
  width: 100%;
`;

export const StyledBack = styled(Image)`
  width: 30px;
  height: 30px;
  z-index: 10000;
`;

export const StyledBackButton = styled.button`
  position: fixed;
  left: 5px;
  top: 15px;
  background: linear-gradient(to bottom, lightgray, gainsboro);
  border: none;
  height: 30px;
  width: 30px;
  padding: auto;
  cursor: pointer;
  z-index: 10000;
`;

export const StyledLinkButtonText = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const StyledLinkButtonDate = styled.p`
  margin: 0px;
  margin-top: 5px;
  color: darkslategrey;
`;

export const StyledSubHeaderDate = styled.h3`
  text-align: center;
  font-size: 16px;
  color: darkslategrey;
  margin: 0 0 5px 0;
`;
