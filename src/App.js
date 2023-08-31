import logoPng from './logo.png';
import './App.css';
import {Alert, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useEffect, useRef, useState} from "react";
import {useDebounce} from "usehooks-ts";
import {searchMovies} from "./api";
import MovieList from "./components/MovieList";

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const changePage = (newPage) => {
    if (page < 1) {
        return
    }
    setPage(newPage)
    window.scrollTo(0, 0)
  }
  const debouncedValue = useDebounce(searchValue, 500)

  let prevSearch = useRef(null)

  useEffect(() => {
    async function fetchMovies() {
        setShowLoader(true)
        if (debouncedValue !== prevSearch.current) {
            setPage(1)
        }
        const result = await searchMovies(debouncedValue, page)
        setShowLoader(false)
        if (result === null) {
            setShowError(true)
        } else {
            setData(result.data)
            prevSearch.current = debouncedValue
        }
    }
    if (debouncedValue) {
        fetchMovies()
    }

  }, [debouncedValue, page])
  return (
    <div className="App">
      <Container fluid>
          <Row>
              <Col>
                  <Navbar className="bg-body-tertiary">
                      <Container fluid>
                          <Navbar.Brand href="#home">
                              <img
                                  alt=""
                                  src={logoPng}
                                  width="40"
                                  height="40"
                                  className="d-inline-block align-top"
                              />{' '}
                              <h4 className="ms-2 d-inline">The Open Movie Database</h4>
                          </Navbar.Brand>
                      </Container>
                  </Navbar>
              </Col>
          </Row>
          <Row>
              <Col>
                  <Container>
                      <Row className="mt-5">
                          <Col>
                              <Form.Control
                                  type="text"
                                  placeholder="Search for a movie e.g Star Wars"
                                  size="lg"
                                  value={searchValue}
                                  onChange={e => setSearchValue(e.target.value)}
                              />
                              {
                                  data &&
                                  <p className="text-start text-muted mt-1">Found { data.totalResults } result(s)</p>
                              }
                              {
                                  showError &&
                                  <Alert variant="danger" className="mt-2" onClose={() => setShowError(false)} dismissible>
                                      An error occurred while fetching movies.
                                  </Alert>
                              }
                              {
                                  showLoader &&
                                  <Spinner animation="grow" className="mt-2"/>
                              }
                          </Col>
                      </Row>
                      <Row className="mt-3">
                          <Col>
                              <MovieList data={data} page={page} changePage={changePage} />
                          </Col>
                      </Row>
                  </Container>
              </Col>
          </Row>
      </Container>
    </div>
  );
}

export default App;
