import app from './app.js';
import sequelize from './database/config/database.js';

const PORT = process.env.PORT || 5000;
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.log('Unable to connect to the database', error);
    console.log(error);
  }
};

connectToDatabase();

app.listen(PORT, () => console.log(`Server is learning on port ${PORT}`));
