import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes'
import taskRoutes from './routes/tasks.routes'
import tagRoutes from './routes/tags.routes'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/tags', tagRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})