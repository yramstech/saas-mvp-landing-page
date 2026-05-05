import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an expert CV/resume tailorer. Given a job posting and a candidate's master CV, you produce a tailored version of the CV that:
- Re-orders bullet points to put the most-relevant ones first within each role
- Surfaces keywords and skills that match the job posting
- Removes or de-emphasizes lines that aren't relevant to this specific role
- Keeps the candidate's exact factual claims (don't fabricate experience)
- Preserves the original structure (Summary, Experience, Skills, Education) but optimizes content within each section
- Returns ONLY the tailored CV, no preamble or commentary

Output format: plain text, with section headings on their own lines and bullet points starting with '- '. No markdown asterisks for bold.`;

export async function POST(req: Request) {
    const {jobText, cvText} = await req.json();
    if(!jobText || !cvText){
        return NextResponse.json({error:"Both fields are required."},{status:400});
    }

    //Phase 2: Claude API call.

    try{
        const message = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages:
            [
                {
                role: "user",
                content: `JOB POSTING:\n\n${jobText}\n\n---\n\nMASTER CV:\n\n${cvText}\n\n---\n\nReturn the tailored CV.`
            },
        ],

        });

        const tailored = message.content
        .filter((b)=>b.type==="text")
        .map((b)=>(b as {text:string}).text)
        .join("\n")

        return NextResponse.json({tailored});

    }catch(err){
        console.error("Claude API error:",err);
        return NextResponse.json({error: "Tailoring failed. Try again."},{status:500});
    }

    // const tailored = `[PHASE 1 PLACEHOLDER]\n\nJob posting received (${jobText.length} chars).\nCV received (${cvText.length} chars).\n\nClaude tailoring wires up in Phase 2.`;

    // return NextResponse.json({tailored});
        
}