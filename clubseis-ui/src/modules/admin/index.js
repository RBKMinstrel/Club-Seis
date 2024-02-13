import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as MainAdmin} from "./components/MainAdmin";
export {default as UserForm} from "./components/UserForm";
//export {default as UpdateUser} from "./components/UpdateUser";

export default {actions, actionTypes, reducer, selectors};