import { styled } from "styled-components"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"]{
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;


export default function CreateAccount() {
  const navigate = useNavigate() // 네비게이터라는 hook 사용
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로딩중이거나, 빈칸이 있을 경우 되돌아가도록
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      // create an account
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      // 성공 시 자격 증명을 받게 됨, 해당 계정으로 자동 로그인됨
      console.log(credentials.user); // 계정 확인
      // set the name of the user
      await updateProfile(credentials.user, {
        displayName: name,
      });
      // redirect to the home page
      navigate("/");

    } catch (e) {
      // 실패 : 해당 이메일로 이미 계정이 있거나 비밀번호가 유효하지 않은 경우
      // setError

    } finally {
      setLoading(false);
    }

    // 콘솔에 테스트 console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
        <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
        <Input type="submit" value={isLoading ? "loading..." : "Create Account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}