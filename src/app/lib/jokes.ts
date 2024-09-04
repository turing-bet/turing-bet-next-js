async function getJoke(): Promise<string> {
  const res = await fetch("https://official-joke-api.appspot.com/jokes/random");
  const joke = await res.json();
  const question = joke.setup;
  return question;
}
