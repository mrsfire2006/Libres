export const STOREROUTES = {
  STORE: "/store",
  BOOKDETAILS: {
    path: "/store/:id",
    url: (id?: string | number) => `/store/${id || ""}`,
  },
};

export const APISTOREROUTES = {
  ALLCATEGORIES: "category/categories",
  BOOKS: "book/books",
  BOOKBYID: "book/id",
};
