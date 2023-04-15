import type { NextApiRequest, NextApiResponse } from 'next';
// import axios, { AxiosResponse } from 'axios';

export default async function viewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    
  // Only allow GET requests
  if (req.method !== "GET") {
    res.status(405).json({ err: "Method not allowed" });
    return;
  }

  console.log(req)
  console.log(res)
}