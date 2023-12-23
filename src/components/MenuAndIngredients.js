import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import menuImage from "../static/images/menu.jpg";
import ingredientsImage from "../static/images/ingredients.jpg";
import { Image } from "react-bootstrap";

function MenuAndIngredients(props) {
  const cardImageStyle = {
    height: "200px", // Set your desired height
    width: "100%", // 100% width to maintain aspect ratio
    objectFit: "cover", // To ensure the image covers the entire space
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row xs={1} lg={2} className="g-2">
          <Col key={"Menu"}>
            <Card
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(2);
              }}
            >
              <Card.Img
                as={Image}
                src={menuImage}
                fluid={true}
                variant="top"
                alt="Card image"
                style={cardImageStyle}
              />
              <Card.Body>
                <Card.Title>Update Menu</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col key={"Ingredients"}>
            <Card
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(3);
              }}
            >
              <Card.Img
                as={Image}
                src={ingredientsImage}
                fluid={true}
                variant="top"
                alt="Card image"
                style={cardImageStyle}
              />
              <Card.Body>
                <Card.Title>Update Ingredients</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MenuAndIngredients;
