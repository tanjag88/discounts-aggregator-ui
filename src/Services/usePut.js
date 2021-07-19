
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default async function updateData(url, updatedData) {
  const response = await fetch(baseUrl + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (response.ok) {
    const json = await response.json();
   
  } else {
    throw response;
  }
}
