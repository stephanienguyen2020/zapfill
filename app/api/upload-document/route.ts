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
    const documentsPath = path.join(process.cwd(), "public/documents");

    // Save the file
    const filename = `document_${Date.now()}_${file.name}`;
    const filepath = path.join(documentsPath, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      filename: `/documents/${filename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file." },
      { status: 500 }
    );
  }
}
