import {io} from 'socket.io-client';

const URL = 'https://rocket-type-backend.onrender.com';

export const socket = io(URL);