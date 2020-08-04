require("dotenv-safe").config();

const app = require('./app');
const PORT = 3333;

app.listen(PORT, () => {
    console.log('Server ON na porta ' + PORT);
});
