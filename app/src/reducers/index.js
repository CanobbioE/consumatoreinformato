import {combineReducers} from 'redux';
import iscrizioneReducer from './iscrizioneReducer';
import loginReducer from './loginReducer';
import adminReducer from './adminReducer';
import articlesReducer from './articlesReducer';
import payReducer from './payReducer';
import filesReducer from './filesReducer';
import chatReducer from './chatReducer';

export default combineReducers({
	iscrForm: iscrizioneReducer,
	loginForm: loginReducer,
	home: articlesReducer,
	admin: adminReducer,
	payment: payReducer,
	files: filesReducer,
	chat: chatReducer,
});
