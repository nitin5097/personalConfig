import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/login";
import Point from "./pages/point";
import Basket from "./pages/basket";
import Coupon from "./pages/coupon";
import AuthContext from "./my-context";
import React from "react";
import Signup from "./pages/signup";
import CouponDetail from "./pages/couponDetail";
import { cartOutline, newspaperOutline, starOutline } from "ionicons/icons";

const App: React.FC = () => {
  const { authValues,showTabs } = React.useContext(AuthContext);

  let tabBarStyle = showTabs ? undefined : { display: "none" };
  return (
    <IonApp>
      {!authValues.authentication ? (
        <IonReactRouter>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/signup" component={Signup} exact={true} />
          <Route
            exact
            path="/"
            render={() => <Redirect to="/login" exact={true} />}
          />
          <Route
            exact
            path="*"
            render={() => <Redirect to="/login" exact={true} />}
          />
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/coupon" component={Coupon} exact={true} />
              <Route
                path="/coupon/detail"
                component={CouponDetail}
                exact={true}
              />
              <Route path="/basket" component={Basket} exact={true} />
              <Route path="/point" component={Point} exact={true} />
            </IonRouterOutlet>

            <IonTabBar
              slot="bottom"
              style={tabBarStyle}
            >
              <IonTabButton tab={"coupon"} href="/coupon">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>Coupon</IonLabel>
              </IonTabButton>
              <IonTabButton tab={"basket"} href="/basket">
                <IonBadge color="warning">{authValues.basketInfo.length}</IonBadge>
                <IonIcon icon={cartOutline} />
                <IonLabel>Basket</IonLabel>
              </IonTabButton>
              <IonTabButton tab={"point"} href="/point">
                {/* <IonBadge color="warning">P</IonBadge> */}
                <IonIcon icon={starOutline} />
                <IonLabel>Point</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
