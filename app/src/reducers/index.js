import {combineReducers} from 'redux';
import iscrizioneReducer from './iscrizioneReducer';
import loginReducer from './loginReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
	iscrForm: iscrizioneReducer,
	loginForm: loginReducer,
	home: articlesReducer,
});
