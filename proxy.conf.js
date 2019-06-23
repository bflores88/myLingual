const PROXY_CONFIG = [
  {
    context: ['/api', '/socket.io'],
    target: 'http://localhost:8080',
    secure: false,
    ws: true,
  },
];

module.exports = PROXY_CONFIG;
