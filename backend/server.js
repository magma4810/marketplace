import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { userRouter } from './routes/user.routes.js';
import { sequelize } from './database.js';
import SequelizeStore from 'connect-session-sequelize';

const SequelizeSessionStore = SequelizeStore(session.Store);
const sessionStore = new SequelizeSessionStore({
  db: sequelize,
  tableName: 'Sessions',
  checkExpirationInterval: 6 * 60 * 60 * 1000, // Очистка просроченных сессий каждые 6 часов
  expiration: 12 * 60 * 60 * 1000 // Время жизни сессии 12 часов
});

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  "https://marketplace-frontend-vannesals-projects.vercel.app",
  "http://localhost:5173",
];

// Улучшенная CORS конфигурация
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'Cache-Control', // Добавляем поддержку Cache-Control
    'X-Requested-With'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['set-cookie'] // Важно для работы с куками
};

app.use(cors(corsOptions));

// Явная обработка OPTIONS запросов
app.options('*', cors(corsOptions));

// Применяем CORS ко всем роутам
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Настройки сессии

// Настройки сессии
app.use(
  session({
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: true, 
    cookie: { 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      domain: 'localhost'
    }
  })
);

// Роуты
app.use('/api', userRouter);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS not allowed' });
  }
  res.status(500).json({ error: 'Server error' });
});

// Запуск сервера
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

startServer();

export default app;