import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ status:405, error: "Method Not Allowed" }); // Ensure only POST method is allowed
  }

  const transactionId = req.nextUrl.searchParams.get('transactionId');
  const serverKey = process.env.NEXT_PUBLIC_SECRET;
  const encodedKey = Buffer.from(`${serverKey}:`).toString("base64");

  if (!transactionId) {
    return NextResponse.json({ status: 400, error: "Transaction ID is required" });
  }

  try {
  
    const response = await fetch(`https://api.sandbox.midtrans.com/v2/${transactionId}/cancel`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedKey}`,
      },
    })

      return NextResponse.json({ status: 200, ok: true, data: response});
  } catch (error) {
    console.error("Failed to get payment status:", error);
    return NextResponse.json({ status: 500, error: "Failed to cancel payemnt" });
  }
}
