// Client-side code (ImageList.js)
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function ImageList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const currentFieldTripId = localStorage.getItem("currentFieldTripId");
      const currentOutcropId = localStorage.getItem("currentOutcropId");
      try {
        const response = await fetch(
          `/api/images?currentFieldTripId=${currentFieldTripId}&currentOutcropId=${currentOutcropId}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  if (error) return <div>failed to load</div>;
  if (!data || !data.resources) return <div>loading...</div>;

  return (
    <StyledList>
      {data.resources.map((image) => (
        <StyledListItem key={image.asset_id}>
          <Link href={image.url}>
            <StyledImage
              src={image.url}
              layout="responsive"
              height={image.height}
              width={image.width}
              alt={`Image-Id: ${image.public_id}`}
            />
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

export const StyledTag = styled.span`
  background-color: #ddd;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  border-color: aliceblue;
`;
