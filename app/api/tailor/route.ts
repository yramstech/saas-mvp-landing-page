import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {jobText, cvText} = await req.json();
    if(!jobText || !cvText){
        return NextResponse.json({error:"Both fields are required."},{status:400});
    }

    // PLACEHOLDER: echoes inputs. Replaced with Claude API call in Phase 2.

    const tailored = `[PHASE 1 PLACEHOLDER]\n\nJob posting received (${jobText.length} chars).\nCV received (${cvText.length} chars).\n\nClaude tailoring wires up in Phase 2.`;

    return NextResponse.json({tailored});
        
}