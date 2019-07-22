import 'babel-polyfill';
import ReactDOM from 'react-dom';
import App from './components/container.js';
import 'elemental-freewheel/dist/elemental.css';
import 'react-select-freewheel/dist/react-select-freewheel.css';
import 'spark-ui/lib/spark-ui.css';
import 'antd/dist/antd.css';
import './styles/app.css';
import 'react-vis/dist/style.css';
import 'highlight.js/styles/darcula.css';
import enGB from 'antd/es/locale-provider/en_GB';
import {LocaleProvider} from 'antd';

ReactDOM.render(
    <LocaleProvider locale={enGB}>
        <App />
    </LocaleProvider>,
    document.getElementById('app')
);
