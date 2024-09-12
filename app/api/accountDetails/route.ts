import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prismaClient";
import { AccountDetails } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 }
    );
  }

  const accountDetails = await prisma.accountDetails.findUnique({
    where: {
      userId,
    },
  });

  return NextResponse.json({ success: true, data: accountDetails });
}

export async function POST(request: NextRequest) {
  try {
    const body: AccountDetails & { userId: string } = await request.json();

    const requiredFields: (keyof AccountDetails)[] = [
      "username",
      "email",
      "password",
      "dateOfBirth",
      "phoneNumber",
      "securityQuestion",
      "securityAnswer",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: missingFields.map((field) => ({
            field,
            message: `${field} is required`,
          })),
        },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match",
          errors: [
            { field: "confirmPassword", message: "Passwords do not match" },
          ],
        },
        { status: 400 }
      );
    }

    const accountDetails = await prisma.accountDetails.upsert({
      where: { userId: body.userId },
      update: {
        username: body.username,
        email: body.email,
        password: body.password,
        dateOfBirth: body.dateOfBirth,
        phoneNumber: body.phoneNumber,
        securityQuestion: body.securityQuestion,
        securityAnswer: body.securityAnswer,
      },
      create: {
        username: body.username,
        email: body.email,
        password: body.password,
        dateOfBirth: body.dateOfBirth,
        phoneNumber: body.phoneNumber,
        securityQuestion: body.securityQuestion,
        securityAnswer: body.securityAnswer,
        user: {
          connect: { id: body.userId },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account details updated successfully",
        data: accountDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing account details:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
