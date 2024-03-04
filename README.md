# Running API in Local

1. Running install package
```
npm install
```

2. Set env file
```
cp .env.example .env
```

3.Create database in postgresql 

Setup in `.env` file in below line

```
DATABASE_URL="postgresql://postgres:root@localhost:5432/medic-clinic?schema=public"
```

4. Run Prisma Migration
```
npx prisma migrate dev
```

5. Run seeding
```
npx prisma db seed
```

You can check Docs in
[Prisma Seeding](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).

6. Run App
```
npm run dev
```

7. Access
```
http://localhost:3000
```