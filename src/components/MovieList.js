import {Card, Col, Container, Pagination, Row} from "react-bootstrap";

function MovieList(props) {
    const listItems = props.data === null ? '' : props.data.Search.map((item) =>  {
        return (
            <Col md="3" className="mb-2" key={item.imdbID} data-testid="movie-item">
                <Card style={{ width: '100%', height: '100%' }}>
                    <Card.Img variant="top" src={item.Poster} style={{width: '300px', height: '465px'}}/>
                    <Card.Body>
                        <Card.Title>{item.Title}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        )
    });
    const totalResults = props.data === null ? 0 : props.data.totalResults;
    const perPage = 10;
    const lastPage = Math.ceil(totalResults / perPage)

    return (
        <Container>
            <Row>
                { listItems }
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mb-5">
                    <Pagination>
                        <Pagination.First data-testid="first" disabled={props.page === 1} onClick={(e) => props.changePage(1)} />
                        <Pagination.Prev data-testid="prev" disabled={props.page === 1} onClick={(e) => props.changePage(props.page - 1)}/>
                        <Pagination.Next data-testid="next" disabled={props.page === lastPage} onClick={(e) => props.changePage(props.page + 1)} />
                        <Pagination.Last data-testid="last" disabled={props.page === lastPage} onClick={(e) => props.changePage(lastPage)} />
                    </Pagination>
                </Col>
            </Row>
        </Container>

    );
}
export default MovieList
