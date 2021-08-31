import { useMutation } from "react-query";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function updateData(updatedData) {
  return await fetch(baseUrl + `products/${updatedData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}

export const useUpdateData = () => {
  const { mutateAsync } = useMutation(updateData);
  return { mutateAsync };
};
