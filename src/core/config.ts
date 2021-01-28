const THE_BEER_BOOK_ROUTE =
    process.env.REACT_APP_THE_BEER_BOOK_ROUTE ?? 'localhost:4000/api';

const CONFIG = {
    api: {
        THE_BEER_BOOK_ROUTE,
    },
    palette: {
        primary: '#fae637',
        secondary: '#5d1cb0',
        blue: '#3875e7',
        red: '#f1114f',
    },
};

export default CONFIG;
