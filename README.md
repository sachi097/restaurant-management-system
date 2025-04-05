This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Database setup

You can choose to have local postgres db set-up or postgres docker container
- Navigate to src/docker and update docker-compose.yml file with your user, password and db name
```
    POSTGRES_USER: myuser
    POSTGRES_PASSWORD: mypassword
    POSTGRES_DB: mydb
```

## Getting Started

1. Install the dependencies
```
npm install
```

2. Setup .env
```
DATABASE_URL="dbUrl"
NEXTAUTH_SECRET="This is an example"
GOOGLE_ID = google_secrete_id
GOOGLE_SECRET = google_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = public_key
STRIPE_SECRET_KEY = strip_secret_key
```

3. Start the postgres db datamodel migration using prisma
```
npx prisma migrate dev --name init
```

4. Generate prisma client
```
npx prisma generate
```

5. Run the prisma interface to interact with database (Optional)
```
npx prisma studio

ps: use this interface to create table records in Category table
```

6.  First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Api

1. To create food items either you can do it via prisma interface or using below api enddpoint
```
    http://localhost:3000/api/products
```

- Sample post body - "catSlug" represent category which needs to be created first before creation of food items
```
    {
    "title": "Fried Rice Veg",
    "desc": "Enjoy the wholesome goodness of Fried Rice Vegetable – a delightful medley of stir-fried rice, fresh vegetables, and aromatic seasonings, creating a light yet flavorful dish.",
    "img": "/tmp/p9.png",
    "price": 24.9,
    "options": [
      {
        "title": "Small",
        "additionalPrice": 0
      },
      {
        "title": "Medium",
        "additionalPrice": 4
      },
      {
        "title": "Large",
        "additionalPrice": 6
      }
    ],
    "catSlug": "rice"
  }
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.