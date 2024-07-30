import {init} from './appFetch';
import * as userService from './userService.js';
import * as adminService from './adminService.js';
import * as contabilidadService from './contabilidadService.js';
import * as mercanciaService from './mercanciaService.js';
import * as configuracionService from './configuracionService.js';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, adminService, contabilidadService, mercanciaService, configuracionService};