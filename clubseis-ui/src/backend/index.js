import {init} from './appFetch';
import * as userService from './userService.js';
import * as adminService from './adminService.js';
import * as contabilidadService from './contabilidadService.js';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, adminService, contabilidadService};