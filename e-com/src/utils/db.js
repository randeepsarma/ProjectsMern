import pg from 'pg'


export const DBURL = process.env.DATABASE_URL

const conString = DBURL
        const poolConfig = {
        connectionString: conString,
        max:20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:2000
      } 
const db = new pg.Pool(poolConfig)


export const connectPostgress =async (text,params)=>{
   console.log(text,params)
   const conString = process.env.DATABASE_URL
        const poolConfig = {
        connectionString: conString,
        max:20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:30000
      } 
   const db = new pg.Pool(poolConfig)
   const client = await db.connect()
   try{
      
      
      const result = await client.query(text,params)
      
      return result
       
    } catch (error) {
      throw error
    }finally{
        if(client){
         client.release()
        }
    }
}