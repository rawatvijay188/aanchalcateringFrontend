import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function Event(props) {
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
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
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
