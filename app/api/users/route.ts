import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prismaClient";

export async function GET() {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const newUser = await prisma.users.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!newUser) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json(newUser);
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.users.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "User deleted" });
}
