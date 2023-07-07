import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TextField = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
`;
