import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import Box from "./Box";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadDetailFB } from "../redux/modules/detail_reducer";

function Home() {
  const Detail_list = useSelector((state) => state.detail_reducer.list);

  console.log(Detail_list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadDetailFB());
  }, [dispatch]);

  const goto_detail = () => {
    navigate("/Detail");
  };

  return (
    <div>
      <Container className="container">
        <Row className="Row">
          {Detail_list.map((item) => (
            <Col lg={4}>
              <Box item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="plusbutton" onClick={goto_detail}>
        +
      </div>
    </div>
  );
}

export default Home;
