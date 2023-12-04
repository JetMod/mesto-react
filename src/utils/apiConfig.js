const token = "3a0bc90b-66b6-4f48-8f85-65228044ae82";
const cohortId = "cohort-74";

export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};
