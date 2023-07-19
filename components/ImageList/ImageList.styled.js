import styled from "styled-components";
import Image from "next/image";
export const StyledTag = styled.span`
  background-color: #ddd;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledListItem = styled.li`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
`;

export const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  border-color: aliceblue;
`;
