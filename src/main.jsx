import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './main.scss';
import { ConfigProvider } from 'antd';


const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF871C',
          borderRadius: 6,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
