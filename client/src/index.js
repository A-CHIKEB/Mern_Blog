import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import Store from './store/index'
import Chat from './components/Chat';
import AdminApp from './AdminApp';
import MultiLangage from './components/MultiLangage';



// langage
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend'

// import 'bootstrap/dist/js/bootstrap.js'
// import 'bootstrap/dist/css/bootstrap.min.css'

i18n
.use(HttpApi)
.use(LanguageDetector)
.use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    
    //lng: document.querySelector('html').lang,
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: "en",
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });



var str = window.location.href
var n = str.includes('admin')
if (n) {
  


  ReactDOM.render(
    <Provider store={Store}>
      <AdminApp/>
    </Provider>,
    document.getElementById('root')
  );

}else{

    ReactDOM.render(
      <Provider store={Store}>
        <App />
        <Chat/>
        {/* <MultiLangage/> */}
      </Provider>,
      document.getElementById('root')
    );
    
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
