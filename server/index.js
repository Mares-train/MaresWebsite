
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

// import postRoutes from './routes/posts.js';
import studentRoutes from './routes/student.js';
import companyRoutes from './routes/company.js';
import evaluationRoutes from './routes/evaluation.js';
import opportunityRoutes from './routes/opportunity.js';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
// Use import.meta.url to get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/student', studentRoutes);
app.use('/company', companyRoutes);
app.use('/evaluation', evaluationRoutes);
app.use('/opportunity', opportunityRoutes);


const CONNECTION_URL = process.env.DB_URL 
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}\nDataBase Running on: ${CONNECTION_URL}`)))
  .catch((error) => console.log(`${error} => did not connect`));

mongoose.set('useFindAndModify', false);

