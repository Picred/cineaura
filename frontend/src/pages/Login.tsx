import LoginForm from "../components/LoginForm";

const Login = ({ isLogged }: { isLogged: boolean }) => {
  return <>{isLogged && <LoginForm />}</>;
};

export default Login;
