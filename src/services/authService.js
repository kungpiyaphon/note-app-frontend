import api from "./api";

export const loginUser = async (email, password) => {
    const response = await api.post("/mongo/auth/cookie/login", {
        email,
        password,
    });
    return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/mongo/auth/logout");
  return response.data;  
};

export const signupUser = async ({fullName, email, password}) => {
    const response = await api.post("/mongo/auth/register",{
        fullName,
        email,
        password,
    });
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/mongo/auth/profile");
    return response.data;
};

export const signupWithMicrosoft = async(accessToken) => {
    
    const response = await api.post("/mongo/auth/cookie/microsoft",{
        accessToken,
    });
    return response.data;
};

export const loginWithMicrosoft = async(accessToken) => {
    const response = await api.post("/mongo/auth/microsoft",{
        accessToken,
    });
    return response.data;
}