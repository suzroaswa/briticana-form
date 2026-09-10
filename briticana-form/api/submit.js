/**
 * Optional Vercel Serverless API route.
 * Stores a lightweight log; primary storage is Google Sheets via WEBHOOK_URL.
 * To enable durable storage here, connect Vercel KV / Postgres / Supabase later.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    // Strip large base64 to keep response small
    const { ['Resume Base64']: _b64, ...safe } = body || {};
    console.log('[Briticana Application]', JSON.stringify(safe));
    return res.status(200).json({
      ok: true,
      message: 'Received. Primary storage is Google Sheets when WEBHOOK_URL is set.'
    });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
}
