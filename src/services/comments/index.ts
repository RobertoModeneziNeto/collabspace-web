import api from "../Api/api";
import { ICreateCommentRequest, ICreateCommentResponse } from "./types";

const createComment = async ({
  postId,
  content,
}: ICreateCommentRequest): Promise<ICreateCommentResponse> => {
  const response = await api
    .post(`/comments/${postId}`, { content })
    .then((res) => res)
    .catch((err) => err);

  return response.data;
};

export { createComment };
