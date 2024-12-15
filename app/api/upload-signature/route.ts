import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create path if it doesn't exist
    const signaturePath = path.join(process.cwd(), "public/images/signatures");

    // Save the file
    const filename = `signature_${Date.now()}.png`;
    const filepath = path.join(signaturePath, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      filename: `/images/signatures/${filename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file." },
      { status: 500 }
    );
  }
}
