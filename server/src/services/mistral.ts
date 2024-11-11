// TODO refactoring
const analyzeImage = async (imageUrl: string) => {
  // TODO create dataFetcher for it.
  const token = process.env.MISTRAL_TOKEN;
  console.log(`url - ${process.env.MISTRAL_API}/v1/chat/completions`);
  console.log(`Token: ${token}`);

  try {
    const response = await fetch(
      `${process.env.MISTRAL_API}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'pixtral-12b-2409',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'What’s in this image? Please provide answer in Ukrainian',
                },
                {
                  type: 'image_url',
                  image_url: imageUrl,
                },
              ],
            },
          ],
          max_tokens: 300,
        }),
      },
    );
    if (response.ok) {
      // TODO return only needed data
      return await response.json();
    }
    console.log('response', response);
    throw new Error(`API request failed with status ${response.status}`);
  } catch (error) {
    console.log('error', error);
    return `Error occurred. ${error?.toString()}`;
  }
};

export default {
  analyzeImage,
};
