export const msalConfig = {
  auth: {
    clientId: "305107dc-aba6-4a82-958d-ca5c881d8de1", // จาก Microsoft Entra
    authority: "https://login.microsoftonline.com/8a12ec8d-a0b2-401f-8170-68b3eb9792af", // ถ้าต้องการให้เฉพาะองค์กร ต้องใส่ tenant id ตรงนี้
    redirectUri: "http://localhost:5173",// หรือ production domain
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};