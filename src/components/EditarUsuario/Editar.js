import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ButtonNome,
  DeleteButton,
  ButtonContainer,
  MainContainer,
  InputContainer,
  SaveButton,
  CloseButton,
} from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { Input } from "../../Appstyle";
import { BASE_URL } from "../../constants/BASE_URL";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";

export const EditarUsuario = (props) => {
  const [usuario, setUsuario] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editar, setEditar] = useState(false);

  const getDadosUsuario = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${props.id}`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      setUsuario(res.data);
      //console.log(res.data);
      setEmail(res.data.email);
      setName(res.data.name);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDadosUsuario();
  }, []);

  const editaUsuario = async () => {
    try {
      const body = {
        name,
        email,
      };

      const response = await axios.put(`${BASE_URL}/${usuario.id}`, body, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      getDadosUsuario();
      setEditar(!editar);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deletarUsuario = async () => {
    
    try {
      const response = await axios.delete(`${BASE_URL}/${usuario.id}`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }) 
      console.log(response);
      alert("usuario removido");
        // chama de novo o get usuarios pra atualizar a lista
        props.getUsuarios();

    } catch (error) {
      console.log(error.response)
    }    
      
  };

  return (
    <MainContainer>
      {editar ? (
        <InputContainer>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SaveButton onClick={editaUsuario}>Salvar</SaveButton>
          <CloseButton onClick={() => setEditar(!editar)}>Fechar</CloseButton>
        </InputContainer>
      ) : (
        <ButtonContainer>
          <ButtonNome onClick={() => setEditar(!editar)}>
            {usuario.name}
          </ButtonNome>
          <DeleteButton onClick={deletarUsuario}>
            <AiOutlineDelete />
          </DeleteButton>
        </ButtonContainer>
      )}
    </MainContainer>
  );
};
