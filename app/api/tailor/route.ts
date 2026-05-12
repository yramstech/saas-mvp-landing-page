import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an expert CV/resume tailorer. Given a job posting and a candidate's master CV, you produce a tailored version of the CV that:
    - Re-orders bullet points to put the most-relevant ones first within each role
    - Surfaces keywords and skills from the job posting THAT ALREADY APPEAR in the candidate's master CV (in any form). Use the EXACT wording from the job posting when both forms are present.
    - Removes or de-emphasizes lines that aren't relevant to this specific role
    - Preserves the original structure (Summary, Experience, Skills, Education) but optimizes content within each section
    - Returns ONLY the tailored CV text, no preamble or commentary

    CRITICAL RULES (do not violate):
    1. NEVER invent experience the candidate doesn't have. If a job requirement isn't reflected anywhere in the master CV, leave it out — do NOT fabricate.
    2. NEVER substitute a synonym for a keyword the job posting uses literally. If the job says 'Kubernetes' and the master CV says 'Docker orchestration', do not write 'Kubernetes' unless the master CV also explicitly mentions Kubernetes.
    3. NEVER inflate dates, scope, or seniority. Numbers and timeframes in the master CV are facts; preserve them exactly.

    Output format: plain text. Section headings on their own lines. Bullet points start with '- '. No markdown asterisks for bold.`
;

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