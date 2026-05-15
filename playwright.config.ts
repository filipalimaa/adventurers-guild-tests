import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

export default defineConfig({
    testDir: './tests/features',
    use: {
        baseURL: process.env.BASE_URL,
    },
    reporter: 'html',
});