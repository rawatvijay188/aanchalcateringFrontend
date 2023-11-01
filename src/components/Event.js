import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Event() {
  return (
    <>
      <div style={{ display: "flex", "justifyContent": "center" }}>
        <Row xs={1} lg={2} className="g-2">
          <Col key={"addEvent"}>
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title>Add Event</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col key={"updateEvent"}>
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
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
