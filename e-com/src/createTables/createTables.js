import pg from "pg";

const DBURL = "postgresql://postgres:123ABCZYXmno..$@db.ydbpxpfdnatakhvofjyd.supabase.co:5432/postgres"
const conString = DBURL;
const poolConfig = {
  connectionString: conString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
const db = new pg.Pool(poolConfig);

const users = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        cart INTEGER [],
        password TEXT NOT NULL,
        img TEXT NOT NULL,
        description TEXT NOT NULL,
        isSeller BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT now()
    );
    `;    
const products = `
      CREATE TABLE IF NOT EXISTS products (
         id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
         userId UUID DEFAULT uuid_generate_v4() NOT NULL REFERENCES users(id),
         ProductName VARCHAR(50) NOT NULL,
         Price TEXT NOT NULL,
         img TEXT [] NOT NULL,
         categories TEXT[],
         description TEXT NOT NULL,
         created_at TIMESTAMP DEFAULT now()
        );
        `;

const reviews = `
      CREATE TABLE IF NOT EXISTS reviews (
         id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
         userId UUID DEFAULT uuid_generate_v4() NOT NULL REFERENCES users(id),
         ProductId UUID DEFAULT uuid_generate_v4() NOT NULL REFERENCES products(id), 
         review TEXT NOT NULL,
         rating INT NOT NULL check(rating >=1 and rating <=5),
         created_at TIMESTAMP DEFAULT now(),
         stockNumber INT DEFAULT 0
         
      );`;
      await db.connect();
      
   db.query(users, (err, res) => {
        try {
          console.log("User");
        } catch (error) {
          console.log(err);
        }
      });
  db.query(products, (err, res) => {
        try {
          console.log("Product");
        } catch (error) {
          console.log(err);
        }
      });
  db.query(reviews, (err, res) => {
        try {
          console.log("Review");
        } catch (error) {
          console.log(err);
        }
      });
      await db.end();

