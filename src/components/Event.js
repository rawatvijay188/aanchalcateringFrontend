import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import addEvent from "../static/images/add_event.png";
import updateEvent from "../static/images/update_event.jpg";
import { Image } from "react-bootstrap";
function Event(props) {
  const cardImageStyle = {
    height: "200px", // Set your desired height
    width: "100%", // 100% width to maintain aspect ratio
    objectFit: "cover", // To ensure the image covers the entire space
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row xs={1} lg={2} className="g-2">
          <Col key={"addEvent"}>
            <Card
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(4);
              }}
            >
              <Card.Img
                as={Image}
                src={addEvent}
                fluid={true}
                variant="top"
                alt="Card image"
                style={cardImageStyle}
              />
              <Card.Body>
                <Card.Title>Add Event</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col key={"updateEvent"}>
            <Card
              onClick={(e) => {
                e.preventDefault();
                props.setTabValue(5);
              }}
            >
              <Card.Img
                as={Image}
                src={updateEvent}
                fluid={true}
                variant="top"
                alt="Card image"
                style={cardImageStyle}
              />
              <Card.Body>
                <Card.Title>Update Event</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Event;
