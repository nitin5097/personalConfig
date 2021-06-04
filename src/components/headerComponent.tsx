import { IonChip, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonToolbar } from '@ionic/react';
import AuthContext from "../my-context";
import React from 'react';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import logo from "../images/logo.gif";

const HeaderControls: React.FC<{}> = props => {
    
    const { authValues, logout } = React.useContext(AuthContext);
    const history = useHistory();
    return(
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
    );
};

export default HeaderControls;