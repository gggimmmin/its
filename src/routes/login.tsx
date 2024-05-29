import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import styled from "styled-components";
import { errorMessages } from "../components/error-messages";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetPw = async () => {
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("이메일로 비밀번호 재설정 메일이 발송되었습니다.");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMessage = errorMessages[e.code] || e.message;
        setError(errorMessage);
      }
    }
  };
  return (
    <Wrapper>
      <Title>Log into IT's</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to="/create-account">회원가입 하기🚀</Link>
      </Switcher>
      <ResetPwBtn onClick={handleResetPw}>비밀번호를 잊으셨나요? 🛠️</ResetPwBtn>
      <GithubButton />
    </Wrapper>
  );
}

const ResetPwBtn = styled.span`
  margin-top: 10px;
  color: #1d9bf0;
  border-bottom: 1px solid #1d9bf0;
  cursor: pointer;
`;
