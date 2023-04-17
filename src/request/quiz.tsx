import axios from "axios";

//GET /api/quiz   or
//GET /api/quiz?cursor=:id
export async function getQuizzes(PageParam: string | null = null): Promise<Quiz> {
    const endPoint = (PageParam) ? `api/quiz?cursor=${PageParam}` : "api/quiz";
    const { data } = await axios.get(endPoint);
    return data;
}