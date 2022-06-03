import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import "./Home.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDetailFB } from "../redux/modules/detail_reducer";

const Detail = () => {
  const wordRef = React.useRef(null);
  const meanRef = React.useRef(null);
  const exRef = React.useRef(null);
  const interpretRef = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adddetailbox = (event) => {
    event.preventDefault();

    dispatch(
      addDetailFB({
        word: wordRef.current.value,
        mean: meanRef.current.value,
        ex: exRef.current.value,
        interpret: interpretRef.current.value,
      })
    );
    navigate("/");
  };

  return (
    <Container>
      <Detailbox>
        <h2 className="detail_head">단어 추가하기</h2>
        <Form>
          <label for="word">단어</label>
          <input type="text" name="word" id="word" ref={wordRef}></input>
          <label type="text" for="mean">
            의미
          </label>
          <input type="text" name="mean" id="mean" ref={meanRef}></input>
          <label type="text" for="ex">
            예문
          </label>
          <input type="text" id="ex" ref={exRef}></input>
          <label type="text" for="interpret">
            해석
          </label>
          <input type="text" id="interpret" ref={interpretRef}></input>
          <br></br>
          <button
            type="submit"
            className="detail_button"
            onClick={adddetailbox}
          >
            저장하기
          </button>
        </Form>
      </Detailbox>
    </Container>
  );
};

const Detailbox = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  max-width: 400px;
  margin: 50px auto;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default Detail;
