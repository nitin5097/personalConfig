import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonChip,
} from "@ionic/react";
import {
  addCircleOutline,
  logOutOutline,
  personCircleOutline,
} from "ionicons/icons";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";
import logo from "../images/logo.gif";

const CouponDetail: React.FC = () => {
  const { authValues, logout, setShowTabs, couponDetail } = React.useContext(AuthContext);
  const coupons = couponDetail;
  useEffect(()=>{
      setShowTabs(false);
      return ()=>{
          setShowTabs(true);
      }
  })

  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid className="ion-text-center">
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
          </IonGrid>
        </IonToolbar>
        <IonItem>
          <IonLabel color="medium">
            <h1>Coupon Detail</h1>
          </IonLabel>
        </IonItem>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard key={coupons.id}>
          <IonCardHeader>
            <IonCardSubtitle>{coupons.title}</IonCardSubtitle>
          </IonCardHeader>
          <IonItem>
            <IonImg src={coupons.imgSrc} />
          </IonItem>

          <IonCardContent>
            <IonItem>
              <IonLabel className="ion-text-center">
                {coupons.pointLabel}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center">
                {coupons.descLabel}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center" color="secondary">
                Add to Basket
              </IonLabel>
              <IonIcon icon={addCircleOutline} slot="end" color="secondary" />
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center ion-text-wrap">
                {coupons.detailDescLabel}
              </IonLabel>
            </IonItem>
            <IonItem >
            <IonLabel onClick={()=> {
                  history.goBack()
              }} color="secondary" className="ion-text-center">
                Back to Coupon
              </IonLabel>
              
            </IonItem>
          </IonCardContent>
          
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default CouponDetail;
