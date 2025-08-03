import { db } from 'lib/db';

export async function GET() {


  const sql = `
    SELECT 
      pr.product_id,
      pr.product_name,
      pr.product_brand,
      CASE 
        WHEN (
          SELECT COUNT(*) 
          FROM products_owners 
          WHERE products_id = pr.product_id
        ) = 1
        THEN (
          SELECT ow.owner_name
          FROM products_owners po2
          JOIN owners ow ON po2.owners_id = ow.id
          WHERE po2.products_id = pr.product_id
          LIMIT 1
        )
        ELSE NULL
      END AS product_owner
    FROM products pr;
  `;

  try {
    const [rows] = await db.query(sql); 
    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
