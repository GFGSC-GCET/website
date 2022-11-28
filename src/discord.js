export const sendResponse = (content, category) => {
  const discord = {
    content: `You got a new Message form GFG Website`,
    embeds: [
      {
        title: category,
        description: `${content}`,
      },
    ],
  };

  fetch(
    "https://discord.com/api/webhooks/1046678770267996200/vtjHl-5atnP3ao3Tzuuhvv8c0fPTE3Xk4P1UT-xK7Ju7R03wLjASdVJ7LRbG01WFL50h",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(discord),
    }
  );
};
