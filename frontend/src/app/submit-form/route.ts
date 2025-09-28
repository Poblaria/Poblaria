// poblaria/next/app/api/submit-form/route.ts
import { NextResponse } from "next/server";

export async function POST(/*request: Request*/) {
    try {
        // TODO: save to a database or send an email
        // const body = await request.json();

        return NextResponse.json({
            success: true,
            message: "Form submitted successfully"
        });
    } catch {
        return NextResponse.json(
            { success: false, message: "Error submitting form" },
            { status: 500 }
        );
    }
}
