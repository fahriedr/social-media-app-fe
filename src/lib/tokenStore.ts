let currentToken: string | null = null;

export const getAccessToken = () => currentToken;
export const setAccessToken = (token: string | null) => {
  currentToken = token;
};
