import { useState, useEffect } from "react";
import Link from "next/link";
import { StyledList, StyledListItem, StyledImage } from "./ImageList.styled";

export default function ImageList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const currentFieldTripId = localStorage.getItem("currentFieldTripId");
      const currentOutcropId = localStorage.getItem("currentOutcropId"); // needed to display the images from the current outcrop and fieldtrip
      try {
        const response = await fetch(
          `/api/images?currentFieldTripId=${currentFieldTripId}&currentOutcropId=${currentOutcropId}` // call api/images with query parameters
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
