import styled from "styled-components";
import PostUploadForm from "../components/post-upload-form";
import Timeline from "../components/timeline";

export default function Home() {
  return (
    <Wrapper>
      <PostUploadForm />
      <Timeline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;
