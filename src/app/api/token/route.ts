import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { getAuth } from "@/lib/auth";

export async function GET() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return Response.json({ message: "JWT is not configured" }, { status: 500 });
  }

  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const expiresIn = 3600;
  const token = jwt.sign(
    {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name || session.user.email,
    },
    secret,
    { expiresIn }
  );

  return Response.json({ token, expiresIn });
}
