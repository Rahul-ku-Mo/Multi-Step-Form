import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prismaClient";
import { Preferences } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: Preferences & { userId: string } = await request.json();

    const requiredFields: (keyof Preferences)[] = [
      "theme",
      "language",
      "timezone",
      "currency",
      "bio",
      "emailNotifications",
      "smsNotifications",
      "pushNotifications",
      "newsletterFrequency",
    ];

    const missingFields = requiredFields.filter(
      (field) => body[field] === undefined
    );

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

    const preferences = await prisma.preferences.upsert({
      where: {
        userId: body.userId,
      },
      update: {
        theme: body.theme,
        language: body.language,
        timezone: body.timezone,
        currency: body.currency,
        bio: body.bio,
        emailNotifications: body.emailNotifications,
        smsNotifications: body.smsNotifications,
        pushNotifications: body.pushNotifications,
        newsletterFrequency: body.newsletterFrequency,
      },
      create: {
        theme: body.theme,
        language: body.language,
        timezone: body.timezone,
        currency: body.currency,
        bio: body.bio,
        emailNotifications: body.emailNotifications,
        smsNotifications: body.smsNotifications,
        pushNotifications: body.pushNotifications,
        newsletterFrequency: body.newsletterFrequency,
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Preferences saved successfully",
        data: preferences,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing preferences:", error);
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

  const preferences = await prisma.preferences.findUnique({
    where: {
      userId,
    },
  });

  return NextResponse.json({ success: true, data: preferences });
}
