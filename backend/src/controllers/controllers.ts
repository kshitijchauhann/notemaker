import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { addUser, findUser } from "../storage/queries.js";
import { PythonShell } from 'python-shell';
import * as fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse';
import { LlamaParseReader } from "llamaindex";
import { writeFileSync, unlinkSync } from 'fs';
import dotenv from "dotenv";

dotenv.config()


export const signUpPost = async(req: Request, res: Response) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  const existingUser = await findUser(email);

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
    }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await addUser(name, email, hashedPassword);
    res.status(201).json({ message: "Signup Successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
  };


export const signInPost = async(req: Request, res: Response) => {
  const {email, password} = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const hashedPassword = await findUser(email);

    if (!hashedPassword) {
      res.status(404).json({ message: "User not found"});
      return
    }
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }
    res.status(200).json({ message: "Login Successful"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }

};

export const uploadPDF = async (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer) {
    res.status(400).json({ error: "No file uploaded" });
    return
  }

  try {
    const pdfBuffer = req.file.buffer;

    const tempFilePath = "./src/upload/temp_uploaded.pdf";
    writeFileSync(tempFilePath, pdfBuffer);
    const reader = new LlamaParseReader({ resultType: "markdown"})
    const pdfData = await reader.loadData(tempFilePath);

    unlinkSync(tempFilePath);

    const extractedText = pdfData.map(doc => doc.text).join("\n");


    if (!extractedText) {
      res.status(400).json({ error: "Could not extract text from PDF" });
      return
    }

    // Summarize with Gemini
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing environment variable: GEMINI_API_KEY");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(extractedText).toString("base64"),
          mimeType: "text/plain",
        },
      },
"Summarize the content into clear, plain text notes without any special formatting like bold (**), lists, or Markdown syntax.",
    ]);

    const summary = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      res.status(500).json({ error: "Failed to generate summary" });
      return
    }

    res.status(200).json({ notes: summary });

  } catch (error) {
    console.error("PDF Summarization Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

