import React, { useEffect, useState } from "react";
import { Navbar, Input, Button, Row, Col, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const SearchBar = ({ text }) => {
  const [search, setSearch] = useState(text);
  const router = useRouter();

  useEffect(() => {
    !search && text && setSearch(text);
  }, [text]);

  const handleKeyPress = (ev) => {
    if (ev.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/items/",
      query: { search },
    });
  };

  return (
    <Navbar
      style={{ backgroundColor: "#fff159", position: "relative" }}
      fixed="top"
      color="#fff159"
      light
    >
      <Container>
        <Row>
          <Col>
            <div className="search-bar">
              <img
                src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.10.4/mercadolibre/logo__large_plus@2x.png"
                onClick={() =>
                  router.push({
                    pathname: "/",
                  })
                }
              />
              <Input
                type="text"
                value={search}
                placeholder="Ingresá lo que quieras encontrar"
                onChange={(ev) => setSearch(ev.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="button"
                className="btn btn-light"
                onClick={handleSubmit}
              >
                <span>
                  <FontAwesomeIcon icon="search" />
                </span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default SearchBar;
