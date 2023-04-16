import axios from "axios";

export async function getQuizzes(PageParam: string | null = null): Promise<Quiz> {
  
  let endPoint = "api/quiz";
  
  if (PageParam != "undefined") {
    endPoint = `api/quiz?cursor=${PageParam}`;
  }

  const { data } = await axios.get(endPoint);

  if (!data.cursor) {
      delete data['cursor']
  }
  return data;
}