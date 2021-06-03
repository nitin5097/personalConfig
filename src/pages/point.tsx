import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonLabel,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonChip,
  IonImg,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonSelect,
  IonSelectOption,
  IonList,
} from "@ionic/react";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";
import logo from "../images/logo.gif";

const couponHistoryRecords = [
  {
    id: 1,
    date: "2020/09/21",
    point: 15,
  },
  {
    id: 2,
    date:"2020/04/21", 
    // "2020年 04月 26日",
    point: 25,
  },
  {
    id: 3,
    date: "2021/04/26",
    point: 30,
  },
];

const period = [
  {
    id: 1,
    code: 6,
    name: "6 months",
  },
  {
    id: 2,
    code: 3,
    name: "3 months",
  },
  {
    id: 3,
    code: 12,
    name: "1 year",
  },
];
type Period = typeof period[number];
const compareStoresWith = (o1: Period, o2: Period) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const Point: React.FC = () => {
  const { authValues, logout } = React.useContext(AuthContext);
  const history = useHistory();
  
  type Coupons = typeof couponHistoryRecords[number];
  const [selectedRecords, setSelectedRecords] = useState<Coupons[]>([]);
  const [responseData, setResponseData] = useState(couponHistoryRecords);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>({
    id: 1,
    code: 6,
    name: "6 months",
  });
  

  function storeFilter(value: any) {
    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedRecords);
    } else {
      filteredData = couponHistoryRecords.filter((entry) =>  new Date(entry.date) > new Date(new Date().setMonth(new Date().getMonth() - value.code)));
      setResponseData(filteredData);
    }
    setSelectedPeriod(value);
  }

  React.useEffect(() => {
    console.log(new Date("2020/09/21").toLocaleString()>new Date(new Date().setMonth(new Date().getMonth() - 6)).toLocaleString());
    console.log(new Date(new Date().setMonth(new Date().getMonth() - 6)).toLocaleString());
    console.log(new Date("2020/09/21").toLocaleString());

    if (couponHistoryRecords && couponHistoryRecords.length > 0) {
      setSelectedRecords(couponHistoryRecords);
      let filteredData: React.SetStateAction<Coupons[]> = [];
     
      filteredData = couponHistoryRecords.filter(
        (result) =>
          new Date(result.date) > new Date(new Date().setMonth(new Date().getMonth() - selectedPeriod.code))
      );
      setResponseData(filteredData);
      return () => {
        // mountedRef.current = false;
      };
    }
  }, [selectedPeriod.code]);

  let sumOfHistoryPoints = 0;
  responseData.forEach(
    (result) => (sumOfHistoryPoints += result.point)
  );
  
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
        </IonToolbar>
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel color="medium">
                  <h1>Points History</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle className="ion-text-center">
              <h3>You have {sumOfHistoryPoints} points</h3>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel className="ion-text-wrap ion-text-center">
                The records shown are from past 6 months
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel>Select a Period</IonLabel>
              <IonSelect
                compareWith={compareStoresWith}
                value={selectedPeriod}
                onIonChange={(e) => storeFilter(e.detail.value)}
              >
                {period.map((period) => (
                  <IonSelectOption key={period.id} value={period}>
                    {period.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {responseData.map((coupon) => (
          <IonList>
          <IonItem>
            <IonLabel className="ion-text-start">
              <h3> {new Date(coupon.date).getFullYear()} 年  {new Date(coupon.date).getMonth()} 月 {new Date(coupon.date).getDate()} 日</h3>
            </IonLabel>
            <IonLabel className="ion-text-end">
              <h3>{coupon.point} points</h3>
            </IonLabel>
          </IonItem>
          </IonList>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Point;
