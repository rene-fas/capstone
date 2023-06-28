import styled from "styled-components";

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
  flex-basis: calc(50% - 10px);
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
