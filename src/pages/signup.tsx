import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
// import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { eye, personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import AuthContext from "../my-context";

function validateEmail(email: string) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}
function validatePasswordMatch(password: string, confirmPassword:string) {
  return (String(password).toLowerCase())===(String(confirmPassword).toLowerCase());
}

const Signup: React.FC = () => {

  const { signup, user } = React.useContext(AuthContext);

  const history = useHistory();
  const [email, setEmail] = useState<string>("Admin@gmail.com");
  const [password, setPassword] = useState<string>("Password.1");
  const [confirmPassword, setConfirmPassword] = useState<string>("Password.1");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);


  const handleSignup = async () => {
    if (!email) {
      setMessage("Please enter a valid email");
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage("Your email is invalid");
      setIserror(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Please enter your password");
      setIserror(true);
      return;
    }

    if (validatePasswordMatch(password,confirmPassword) === false) {
      setMessage("Your Password does not match");
      setIserror(true);
      return;
    }

    setShowLoading(true);
    let result = await signup({ user: email, password: password });
    setShowLoading(false);
    if (result) {
      history.push("/coupon");
    } else {
      setMessage("Auth failure! Please create an account");
      setIserror(true);
    }
    // .then((res: any) => {
    //     history.push("/dashboard/" + email);
    //  })
    //  .catch((error: any)=>{
    //     setMessage("Auth failure! Please create an account");
    //     setIserror(true)
    //  })

    // const api = axios.create({
    //     baseURL: `https://reqres.in/api`
    // })
    // api.post("/login", loginData)
    //     .then((res: any) => {
    //         history.push("/dashboard/" + email);
    //      })
    //      .catch((error: any)=>{
    //         setMessage("Auth failure! Please create an account");
    //         setIserror(true)
    //      })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
      <IonLoading
          message="Creating User"
          isOpen={showLoading}
          onDidDismiss={() =>
            user !== null ?? history.replace("/dashboard/:id")
          }
        />
        <IonGrid>
        <IonRow>
          {/* <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol> */}
        </IonRow>
        <IonRow>
          <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
            />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
              <IonIcon slot="end" name={eye}></IonIcon>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p> */}
              <IonButton expand="block" onClick={()=>{handleSignup()}}>Signup</IonButton>
              <p style={{ fontSize: "medium" }}>
                  Already have an account? <a onClick={()=>{history.goBack()}}>Login!</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                duration={2000}
                // buttons={["Dismiss"]}
              />
    </IonPage>
  );
};

export default Signup;
