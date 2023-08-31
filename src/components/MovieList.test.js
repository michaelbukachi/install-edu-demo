import {render, screen} from "@testing-library/react";
import MovieList from "./MovieList";
import userEvent from "@testing-library/user-event";

test('nothing is rendered if list is null', () => {
    const callback = (page) => {
    }
    render(<MovieList data={null} page={1} changePage={callback}/>)
    const cards = screen.queryAllByTestId('movie-item')
    expect(cards).toStrictEqual([])
})

test('nothing is rendered if list is empty', () => {
    const callback = (page) => {
    }
    render(<MovieList data={{Search: []}} page={1} changePage={callback}/>)
    const cards = screen.queryAllByTestId('movie-item')
    expect(cards).toStrictEqual([])
})

test('movie items are rendered properly', () => {
    const callback = (page) => {
    }
    render(<MovieList data={{Search: [{Title: 'Test', imdbID: 'test', Poster: 'test'}]}} page={1} changePage={callback}/>)
    const cards = screen.queryAllByTestId('movie-item')
    expect(cards.length).toBe(1)
})


test('pagination buttons emit right data', async() => {
    const expected = []
    const callback = (page) => {
        expected.push(page)
    }
    const {rerender} = render(<MovieList data={{totalResults: 50, Search: []}} page={3} changePage={callback}/>)
    await userEvent.click(screen.getByTestId('first'))
    rerender(<MovieList data={{totalResults: 50, Search: []}} page={1} changePage={callback}/>)
    await userEvent.click(screen.getByTestId('next'))
    rerender(<MovieList data={{totalResults: 50, Search: []}} page={2} changePage={callback}/>)
    await userEvent.click(screen.getByTestId('last'))
    rerender(<MovieList data={{totalResults: 50, Search: []}} page={5} changePage={callback}/>)
    await userEvent.click(screen.getByTestId('prev'))
    expect(expected).toStrictEqual([1, 2, 5, 4])
})
