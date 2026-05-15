# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: characterCreation.spec.ts >> Character Creation Flow >> Create My Character
- Location: tests/features/characterCreation.spec.ts:16:5

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1  | import type { APIRequestContext } from "@playwright/test";
  2  | 
  3  | export async function getToken( request : APIRequestContext) {
  4  |     
> 5  |     const response = await request.post('/api/auth/token', {
     |                                    ^ TypeError: apiRequestContext.post: Invalid URL
  6  |         data: {
  7  |             username: process.env.API_USERNAME,
  8  |             password: process.env.API_PASSWORD,
  9  |         },
  10 |     });
  11 | 
  12 |     const responseToken = await response.json();
  13 | 
  14 |     return responseToken.token;
  15 | }
```