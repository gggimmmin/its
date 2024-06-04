import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Post from "./post";

export interface IPost {
  id: string;
  photo?: string;
  post: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [posts, setPost] = useState<IPost[]>([]);
  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map((doc) => {
      const { post, createdAt, userId, username, photo } = doc.data();
      return {
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setPost(posts);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Wrapper>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
