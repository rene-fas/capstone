import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 20px;
`;

export const FormField = styled.div`
  flex-basis: calc(50% - 10px); /* Adjust the width as needed */
`;

export const MultilineField = styled.div`
  flex-basis: 100%;
`;

export const Label = styled.label`
  display: block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
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
