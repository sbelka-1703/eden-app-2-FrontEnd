import { ChangeEvent, FormEvent, useState } from "react";

const LinkedInScraper = () => {
  const [profileLink, setProfileLink] = useState("");
  const [linkedInText, setLinkedInText] = useState("");

  const handleProfileLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileLink(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({ url: profileLink }).toString();
    const response = await fetch(
      `/api/linkedin_scraper/linkedin_scraper?${queryParams}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const { profileText } = await response.json();

      setLinkedInText(profileText);
      console.log(profileText);
    } else {
      const { error } = await response.json();

      console.log("error aaa", error);
    }
  };

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
      <label>LinkedIn Profile</label>
      <input
        className="border-2 border-black"
        onChange={handleProfileLinkChange}
        placeholder="https://www.linkedin.com/in/example/"
      />
      <button type="submit">Submit</button>
      {linkedInText !== "" ? linkedInText : null}
    </form>
  );
};

export default LinkedInScraper;
