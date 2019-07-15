// import { join } from 'lodash';
import './assets/css/common.scss';
import Icon from './assets/img/miao.jpg';
import Data from './data.xml';


function component() {
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    // element.innerHTML = join(['Hello', 'webpack'], ' ');
    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}
console.log('Data', Data);

document.body.appendChild(component());
