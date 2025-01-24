import dotenv from 'dotenv';
import app from './app';

dotenv.config();
import { envService } from './common/config';

async function startServer(): Promise<void> {
  const PORT = envService.env.PORT;

  if (envService.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.info(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer().catch((error) => {
  console.error('Error starting the server:', error.message);
  process.exit(1);
});
