const Anthropic = require("@anthropic-ai/sdk");
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY});

async function scoreResume(resumeText, jobDescription){

    const prompt = `
    You are an expert HR recruiter. Score the following resume against the job description.
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    RESUME:
    ${resumeText}
    
    Respond with ONLY a valid JSON object in this exact format:
    
    {
        "score": <number between 0 and 100>,
        "summary": "<one sentence about the candidate>",
        "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
        "gaps": ["<gap 1>", "<gap 2>"],
        "verdict": "<Strong Match | Good Match | Partial Match | Poor Match>"
    }
    `;

    const message = await client.messages.create({

        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        messages: [{role: "user", content: prompt }],
    });

    const raw = message.content[0].text;

    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
}

module.exports = { scoreResume };