import app from './app';
import database from './database';

database.sync();

app.listen(3000, () => console.log('Server is running...'));
