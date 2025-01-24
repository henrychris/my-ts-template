import express from 'express';
import { test } from './placeholder.controller';

const router = express.Router();

router.get('/', test);

export default router;
