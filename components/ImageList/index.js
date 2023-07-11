import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function ImageList() {
  const { data, error } = useSWR("/api/images");
  if (error) return <div>failed to load</div>;
  if (!data || !data.resources) return <div>loading...</div>;

  return (
    <StyledList>
      {data.resources.map((image) => (
        <StyledListItem key={image.asset_id}>
          <Link href={`/images/${image.public_id}`} key={image.asset_id}>
            <StyledImage
              src={image.url}
              layout="responsive"
              height={image.height}
              width={image.width}
              alt={`Image-Id: ${image.public_id}`}
            />
          </Link>
          <p>
            {image.tags.length > 0 ? (
              image.tags.map((tag, index) => (
                <StyledTag key={`tag-${index}`}>{tag}</StyledTag>
              ))
            ) : (
              <i>untagged</i>
            )}
          </p>
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
