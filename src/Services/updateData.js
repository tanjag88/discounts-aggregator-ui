const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default async function updateData(updatedData) {
  await fetch(baseUrl + `products/${updatedData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}
