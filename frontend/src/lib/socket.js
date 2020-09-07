import io from 'socket.io-client';
const NODE_ENV = process.env.NODE_ENV
export default io(NODE_ENV === 'production' ? 'https://api.standup.rocks' : 'http://localhost:3000');
