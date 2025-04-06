import { FC } from "react";
import { Modal } from "./Modal";
import { useSelector } from "react-redux";
import { login } from "../store/auth.slice";
import { useNavigate } from "react-router-dom";
import { StoreApp, useAppDispatch } from "../store";
import {changeRole, getInfoApplicant, getInfoEmployer } from "../store/user.slice";
import { changeErrorPassword, changeErrorUsername, changeErrorUserNotFound,changeErrorUserPassword } from "../store/errors.slice";

export const Signin: FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useSelector((store: StoreApp) => store.user.username);
  const password = useSelector((store: StoreApp) => store.user.password);

  const handleSubmit = async (e: React.MouseEvent) => {

    e.preventDefault();
    if (password === "") {
      dispatch(changeErrorPassword(true));
    } else if (username === "") {
      dispatch(changeErrorUsername(true));
    } else {
      try {
        const dataUser = await fetch(`${API_URL}/getUserInfo/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).then((response) => response.json());
        const loginUser = await fetch(`${API_URL}/loginUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            role: dataUser.role,
          }),
        });
        
        if (!loginUser.ok) {
          throw new Error("Login failed");
        }
        if(dataUser.error){
          dispatch(changeErrorUserNotFound(true));
          throw new Error("User not found");
        }
        if(dataUser.password !== password){
          dispatch(changeErrorUserPassword(true));
          throw new Error("password failed");
        }

        const data = await loginUser.json();
        dispatch(login(data.user));
        sessionStorage.setItem('role', dataUser.role);
        sessionStorage.setItem('username', username);
        dispatch(changeRole(dataUser.role));
        if(dataUser.role === "applicant"){
          dispatch(getInfoApplicant(username));
        }else{
          dispatch(getInfoEmployer(username));
        }
        navigate("/vacancies");
      } catch (error) {
        console.error("Login error:", error);
      }
    }

  };

  return (
    <Modal
      href="user"
      action={"Create your account"}
      name={"Login"}
      title={"Member Login"}
      onClick={handleSubmit}
    />
  );
};
