import { clientFetch } from "@/lib/client/api-client";
import type { ResultOfBookResponse } from "../store/type";
import { APIAUTHORROUTES } from "./paths";
import type {
  EditBookRequestCommand,
  ResultOfBookBioResponse,
  ResultOfIEnumerableOfAuthorBookResponse,
} from "./type";
import type { Result } from "@/schemas/api-schema";

export const AuthorService = {
  uploadFile: async (formData: FormData) => {
    const response: ResultOfBookResponse = await clientFetch(
      APIAUTHORROUTES.UPLOAD,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    return response;
  },
  // getEarningsStats: async () => {
  //   return {
  //     value: mockEarnings,
  //   };
  // },

  // getAuthorBooks: async () => {
  //   return {
  //     value: mockBooks,
  //   };
  // },

  // getRecentActivity: async () => {
  //   return {
  //     value: mockRecentActivity,
  //   };
  // },
  getBookBio: async () => {
    const result: ResultOfBookBioResponse = await clientFetch(
      `${APIAUTHORROUTES.BOOKBIO}`,
      {
        method: "GET",
      },
    );
    return result;
  },

  getAuthorBooks: async () => {
    const result: ResultOfIEnumerableOfAuthorBookResponse = await clientFetch(
      `${APIAUTHORROUTES.AUTHORBOOKS}`,
      {
        method: "GET",
      },
    );
    return result;
  },
  updateAuthorBook: async (command: EditBookRequestCommand) => {
    const formData = new FormData();

    formData.append("BookId", command.BookId!);
    formData.append("Title", command.Title ?? "");
    formData.append("Description", command.Description ?? "");
    formData.append("Price", command.Price?.toString() ?? "0");
    formData.append("CategoryId", command.CategoryId ?? "");

    const result: Result = await clientFetch(
      `${APIAUTHORROUTES.EDITAUTHORBOOK}`,
      {
        method: "POST",
        body: formData,
      },
    );
    return result;
  },
};
