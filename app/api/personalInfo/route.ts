import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prismaClient";
import { PersonalInfo } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: PersonalInfo & { userId: string } = await request.json();

    const requiredFields: (keyof PersonalInfo)[] = [
      "firstName",
      "lastName",
      "email",
      "country",
      "streetAddress",
      "city",
      "region",
      "postalCode",
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

    const personalInfo = await prisma.personalInfo.upsert({
      where: { userId: body.userId },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        country: body.country,
        streetAddress: body.streetAddress,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
      },
      create: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        country: body.country,
        streetAddress: body.streetAddress,
        city: body.city,
        region: body.region,
        postalCode: body.postalCode,
        user: { connect: { id: body.userId } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Personal information updated successfully",
        data: personalInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing personal information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 }
    );
  }

  const personalInfo = await prisma.personalInfo.findUnique({
    where: {
      userId,
    },
  });

  return NextResponse.json({ success: true, data: personalInfo });
}
