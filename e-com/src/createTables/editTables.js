import pg from "pg";

const DBURL =
  "postgresql://postgres:123ABCZYXmno..$@db.ydbpxpfdnatakhvofjyd.supabase.co:5432/postgres";
const conString = DBURL;
const dbConfig = {
  connectionString: conString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const client = new pg.Client(dbConfig);

async function alterTable() {
  try {
    // Connect to the database
    await client.connect();

    // ALTER TABLE command
    const alterQuery = `
     ALTER TABLE products
     ADD COLUMN stockNumber INT DEFAULT 0; 
    `;

    // Execute the ALTER TABLE command
    await client.query(alterQuery);

    console.log("Table altered successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    await client.end();
  }
}

// Call the function to alter the table
alterTable();
