import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'fontsource-roboto';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={2}>
                <App />
            </SnackbarProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
