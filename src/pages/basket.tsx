import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
  IonChip,
} from "@ionic/react";
import {
  logOutOutline,
  personCircleOutline,
  closeCircleOutline,
} from "ionicons/icons";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.gif";
import AuthContext from "../my-context";

const stores = [
  {
    id: 1,
    code: "all",
    name: "All",
  },
  {
    id: 2,
    code: "minamiKu",
    name: "Minami Ku Shimizugaoka",
  },
  {
    id: 3,
    code: "sakaeKu",
    name: "Sakae Ku Sakuragicho",
  },
];
type Store = typeof stores[number];
const compareStoresWith = (o1: Store, o2: Store) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const Basket: React.FC = () => {
  const { authValues, logout } = React.useContext(AuthContext);
  const [coupons] = useState(authValues.basketInfo);
  type Coupons = typeof coupons[number];
  const [selectedCoupons, setSelectedCoupons] = useState<Coupons[]>([]);
  const [responseData, setResponseData] = useState(coupons);
  const [selectedStore, setSelectedStore] = useState<Store>({
    id: 1,
    code: "all",
    name: "All",
  });

  function storeFilter(value: any) {
    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedCoupons);
    } else {
      filteredData = selectedCoupons.filter((entry) =>
        entry.storeNames.includes(value.code)
      );
      setResponseData(filteredData);
    }
    setSelectedStore(value);
  }
//   const mountedRef = useRef(true);
  React.useEffect(() => {
    if (coupons && coupons.length > 0) {
      setSelectedCoupons(coupons);
      let filteredData: React.SetStateAction<Coupons[]> = [];
      filteredData = coupons.filter(
        (result: { storeNames: string | string[]; category: string | any[] }) =>
          result.storeNames.includes(selectedStore.code) ||
          selectedStore.code === "all"
      );
      setResponseData(filteredData);
      return () => {
        // mountedRef.current = false;
      };
    }
  }, [coupons, selectedStore.code]);

  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonGrid className="ion-text-center">
            <IonRow>
              <IonCol
                className="ion-text-left"
                style={{ width: "80%", height: "100%" }}
              >
                <IonImg
                  src={logo}
                  //   style={{ width: "100%", height: "40px" }}
                ></IonImg>
              </IonCol>
              <IonCol
                className="ion-text-right"
                style={{ width: "20%", height: "10%" }}
              >
                <IonChip
                //  style={{ width: "60%", height: "100%" }}
                >
                  <IonIcon
                    //  style={{ width: "100%", height: "100%" }}
                    icon={personCircleOutline}
                  />
                  <IonLabel>{authValues.user.id}</IonLabel>
                  <IonIcon
                    //  style={{ width: "100%", height: "100%" }}
                    className="ion-text-end"
                    icon={logOutOutline}
                    onClick={() => {
                      logout();
                      history.replace("/login");
                    }}
                  />
                </IonChip>
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* <IonGrid className="ion-text-center">
            <IonRow>
              <IonCol className="ion-text-left">
                <IonImg
                  src={logo}
                  style={{ width: "220px", height: "40px" }}
                ></IonImg>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonChip style={{ width: "140px", height: "40px" }}>
                  <IonIcon
                    style={{ width: "120px", height: "40px" }}
                    icon={personCircleOutline}
                  />
                  <IonLabel>{authValues.user.id}</IonLabel>
                  <IonIcon
                    style={{ width: "120px", height: "40px" }}
                    className="ion-text-end"
                    icon={logOutOutline}
                    onClick={() => {
                      logout();
                      history.replace("/login");
                    }}
                  />
                </IonChip>
              </IonCol>
            </IonRow>
          </IonGrid> */}
        </IonToolbar>
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel color="medium">
                  <h1>Basket</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Select a Store</IonLabel>
                <IonSelect
                  compareWith={compareStoresWith}
                  value={selectedStore}
                  onIonChange={(e) => storeFilter(e.detail.value)}
                >
                  {stores.map((store) => (
                    <IonSelectOption key={store.id} value={store}>
                      {store.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <br />
        <br />
        {responseData.length < 1 && (
          <IonLabel color="danger">Sorry! No record</IonLabel>
        )}

        <IonGrid>
          <IonRow>
            {responseData.map((coupon: any) => (
              <IonCol>
                <IonCard key={coupon.id}>
                  <IonCardHeader>
                    <IonCardSubtitle className="ion-text-wrap">
                      {coupon.title}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src={coupon.imgSrc}
                      style={{ width: "100px", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      {coupon.pointLabel}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      {coupon.descLabel}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel
                      className="ion-text-wrap ion-text-left"
                      style={{ fontSize: "12px", height: "20px" }}
                    >
                      Valid until {coupon.expireDate}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel
                      className="ion-text-wrap ion-text-left"
                      color="secondary"
                      style={{ fontSize: "12px", height: "20px" }}
                    >
                      Delete Coupon
                    </IonLabel>
                    <IonIcon
                      icon={closeCircleOutline}
                      slot="end"
                      style={{ fontSize: "20px" }}
                    />
                  </IonItem>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Basket;
