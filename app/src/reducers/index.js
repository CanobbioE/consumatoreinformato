import {combineReducers} from 'redux';
import iscrizioneReducer from './iscrizioneReducer';
import loginReducer from './loginReducer';
import adminReducer from './adminReducer';
import articlesReducer from './articlesReducer';
import payReducer from './payReducer';
import filesReducer from './filesReducer';

export default combineReducers({
	iscrForm: iscrizioneReducer,
	loginForm: loginReducer,
	home: articlesReducer,
	admin: adminReducer,
	payment: payReducer,
	files: filesReducer,
});
