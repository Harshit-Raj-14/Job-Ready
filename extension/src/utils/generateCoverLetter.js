import React, { useEffect, useState } from "react";
import Generator from "./components/Generator";
import Profile from "./components/Profile";
import { ROUTES } from "./utils/routes";
import { loadData } from "./utils/localStorage";

export const GenerateCoverLetter = () => {
  const [page, setPage] = useState<string | undefined>(null);
  const [resume, setResume] = useState<string>("resume test");
  const [openAIKey, setOpenAIKey] = useState<string>("test key");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const fetchedResume = await loadData("resume");
        const fetchedAIKey = await loadData("openAIKey");
        setResume(fetchedResume || "No resume found");
        setOpenAIKey(fetchedAIKey || "No key found");
      } catch (e) {
        console.error("Error fetching local data:", e);
      }
    };
    fetchLocalData();
  }, []);

  const generateCoverLetter = async (prompt) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:8686/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          query: `
            mutation GenerateCoverLetter($prompt: String!, $resume: String!) {
              generateCoverLetter(prompt: $prompt, resume: $resume)
            }
          `,
          variables: { prompt, resume },
        }),
      });

      const result = await res.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setResponse(result.data.generateCoverLetter);
    } catch (e) {
      console.error("Error generating cover letter:", e);
      setError("Something went wrong while generating the cover letter.");
    } finally {
      setLoading(false);
    }
  };

  switch (page) {
    case ROUTES.GENERATOR:
      return (
        <Generator
          setPage={setPage}
          generateCoverLetter={generateCoverLetter}
          loading={loading}
          response={response}
          error={error}
        />
      );

    case ROUTES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          resume={resume}
          setResume={setResume}
          openAIKey={openAIKey}
          setOpenAIKey={setOpenAIKey}
        />
      );

    default:
      return (
        <Generator
          setPage={setPage}
          generateCoverLetter={generateCoverLetter}
          loading={loading}
          response={response}
          error={error}
        />
      );
  }
};

export default GenerateCoverLetter;
