import app from './app.js';
import config from './config';

app.listen(config.server.port, () => {
    console.log(`Server running on port: ${config.server.port}`);
});
