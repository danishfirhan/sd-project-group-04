
|                |                                                          |
| -------------- | -------------------------------------------------------- |
| Tech           | Next.js, PostgreSQL, Drizzle Orm, Shadcn, PayPal, Stripe |
| UI             | Tailwind, Shadcn, recharts                               |
| Database       | PostgreSQL, Drizzle Orm                                  |
| Payment        | PayPal, Stripe                                           |
| Deployment     | Github, Vercel                                           |
| Authentication | Auth.js, Google Auth, Magic Link                         |
| Others         | uploadthing, resend, zod                                 |


## Run Locally

1. Clone repo

   ```shell
    $ git clone git@github.com:danishfirhan/sd-project-group-4.git
    $ cd danishfirhan/sd-project-group-4
   ```

2. Create .env.local File

   - duplicate .env.example and rename it to .env.local

3. Setup PostgreSQL

   - Vercel PostgreSQL
     - Create database at https://vercel.com/docs/storage/vercel-postgres
     - In .env.local file update POSTGRES_URL to db url
   - OR Local PostgreSQL
     - Install it from https://www.postgresql.org/download
     - In .env.local file update POSTGRES_URL to db url

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   ```shell
     npx tsx ./db/seed
   ```

6. Admin Login

   - Open http://localhost:3000
   - Click Sign In button
   - Enter admin email "admin@example.com" and password "123456" and click Sign In

7. View Database

   - Run npx drizzle-kit studio in terminal
   - Open https://local.drizzle.studio/ in your browser

## Contact Developer

Email: danishfirhan05@gmail.com
