import React from "react";

export const Context = React.createContext<any>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    authentication: false,
    user: null,
    basketInfo: null,
    errors: null,
    initialized: null,
  });
  const [showTabs, setShowTabs] = React.useState<any>(true);
  const [couponDetail, setCouponDetail] = React.useState<any>(null);
  
  const login = ({ user, password }: { user: string; password: string }) => {
    return new Promise((resolve) => {

      if (user === "Admin@gmail.com" && password === "Admin1") {
        setAuthValues({
          authentication: true,
          user: { user: user, id: "Admin101" },
          basketInfo:[{
            id: 1,
            title: "Markwest Red Wine",
            imgSrc:
              "https://media.glamour.com/photos/585c388e677d21ef4ec648e5/master/w_1600%2Cc_limit/Mark%252520West%2525202014%252520Pinot%252520Noir%252520Black.jpg",
            pointLabel: "30 Points",
            descLabel: "8 year old 750 ml",
            storeNames: ["sakaeKu"],
            category: "foodBeverage",
            expireDate:"2021/06/21",
          },
          {
            id: 2,
            title: "First Anniversary Wine",
            imgSrc:
              "https://www.thedottedi.in/pub/media/catalog/product/cache/c9e0b0ef589f3508e5ba515cde53c5ff/f/i/first_anniversary_wine_bottle-dottedi.jpg",
            pointLabel: "50 Points",
            descLabel: "12 year old 750 ml",
            storeNames: ["sakaeKu"],
            category: "foodBeverage",
            expireDate:"2021/06/21",
            // expireDate:"2021年 06月 21日",
          },],
        });
        resolve(true);
      } else {
        setAuthValues({
          authentication: false,
          user: null,
        });
        return Promise.resolve(false);
      }
    });
  };

  const signup = ({ user, password }: { user: string; password: string }) => {
    return new Promise((resolve) => {
      try {
        if (user === "Admin@gmail.com" && password === "Admin1") {
          setAuthValues({
            authentication: true,
            user: { user: user, id: "Admin101" },
          });
          resolve(true);
        } else {
          setAuthValues({
            authentication: false,
            user: null,
          });
          resolve(false);
        }
      } catch (e){
        setAuthValues({
            authentication: false,
            user: null,
            errors:{e}
          });
          resolve(false);
      }
    });
  };

  const logout = () => {
    setAuthValues({
      authentication: false,
      user: null,
    });
    return Promise.resolve(true);
  };

  let state = {
    authValues,
    login,
    logout,
    signup,
    showTabs,
    setShowTabs,
    couponDetail,
    setCouponDetail,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;
