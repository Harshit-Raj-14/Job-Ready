import { http, models } from "@hypermode/modus-sdk-as";
import { OpenAIChatModel, ResponseFormat, SystemMessage, UserMessage} from "@hypermode/modus-sdk-as/models/openai/chat";

/**
 * Generate a tailored cover letter.
 * @param resume - The user's resume.
 * @param jobDescription - The job description.
 * @returns - Generated cover letter, or an empty string on failure.
 */

const resume = `
    Harshit Raj
    Software Engineer
    ...
    (Provide your resume text here)
  `;

const jobDescription = `Software Engineer`;

export function generateCoverLetter(resume: string, jobDescription: string, openAIKey: string): string {
    //const model = models.getModel<OpenAIChatModel>("text-generator"); //for hugging face
    const model = models.getModel<OpenAIChatModel>("llm");  //for open ai chatgpt
    const prompt = `
    Write a professional cover letter tailored for the following job description. Use the provided resume for context about the candidate's experience and skills.
    
    Resume: 
    ${resume}

    Job Description:
    ${jobDescription}

    The tone should be formal, highlighting relevant experience and skills in alignment with the job description.
  `;

  const input = model.createInput([
    new SystemMessage("You are a career advisor specializing in creating impactful cover letters."),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);
  return output.choices[0].message.content.trim();
}





