import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
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
  IonSelect,
  IonSelectOption,
  IonCardTitle,
} from "@ionic/react";
import { logOutOutline, personCircleOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";
import logo from "../images/logo.gif";
import HeaderControls from "../components/headerComponent";

const stores = [
  {
    id: 1,
    code: "minamiKu",
    name: "Minami Ku Shimizugaoka",
  },
  {
    id: 2,
    code: "sakaeKu",
    name: "Sakae Ku Sakuragicho",
  },
];
type Store = typeof stores[number];
const compareStoresWith = (o1: Store, o2: Store) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const categories = [
  {
    id: 1,
    code: "all",
    name: "All",
  },
  {
    id: 2,
    code: "foodBeverage",
    name: "Food & Beverage",
  },
  {
    id: 3,
    code: "hairBeauty",
    name: "Hair & Beauty",
  },
  {
    id: 4,
    code: "homeKitchen",
    name: "Home & Kitchen",
  },
];
type Category = typeof categories[number];
const compareCategoriesWith = (o1: Category, o2: Category) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const coupons = [
  {
    id: 1,
    title: "Markwest Red Wine",
    imgSrc:
      "https://media.glamour.com/photos/585c388e677d21ef4ec648e5/master/w_1600%2Cc_limit/Mark%252520West%2525202014%252520Pinot%252520Noir%252520Black.jpg",
    pointLabel: "30 Points",
    descLabel: "8 year old 750 ml",
    storeNames: ["sakaeKu"],
    category: "foodBeverage",
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
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
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
  },
  {
    id: 3,
    title: "Markwest Red Wine",
    imgSrc:
      "https://media.glamour.com/photos/585c388e677d21ef4ec648e5/master/w_1600%2Cc_limit/Mark%252520West%2525202014%252520Pinot%252520Noir%252520Black.jpg",
    pointLabel: "30 Points",
    descLabel: "8 year old 750 ml",
    storeNames: ["sakaeKu"],
    category: "foodBeverage",
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
  },
  {
    id: 4,
    title: "First Anniversary Wine",
    imgSrc:
      "https://www.thedottedi.in/pub/media/catalog/product/cache/c9e0b0ef589f3508e5ba515cde53c5ff/f/i/first_anniversary_wine_bottle-dottedi.jpg",
    pointLabel: "50 Points",
    descLabel: "12 year old 750 ml",
    storeNames: ["sakaeKu"],
    category: "foodBeverage",
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
  },
  {
    id: 5,
    title: "Markwest Red Wine",
    imgSrc:
      "https://media.glamour.com/photos/585c388e677d21ef4ec648e5/master/w_1600%2Cc_limit/Mark%252520West%2525202014%252520Pinot%252520Noir%252520Black.jpg",
    pointLabel: "30 Points",
    descLabel: "8 year old 750 ml",
    storeNames: ["sakaeKu"],
    category: "foodBeverage",
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
  },
  {
    id: 6,
    title: "First Anniversary Wine",
    imgSrc:
      "https://www.thedottedi.in/pub/media/catalog/product/cache/c9e0b0ef589f3508e5ba515cde53c5ff/f/i/first_anniversary_wine_bottle-dottedi.jpg",
    pointLabel: "50 Points",
    descLabel: "12 year old 750 ml",
    storeNames: ["sakaeKu"],
    category: "foodBeverage",
    detailDescLabel:
      "This is a 8 year old good wine coupon. Although this coupon is quite exciting but you can awail this benefit till end of this month only",
  },
];
type Coupons = typeof coupons[number];

const Coupon: React.FC = () => {
  const { authValues, logout, setCouponDetail } = React.useContext(AuthContext);
  const [selectedStore, setSelectedStore] = useState<Store>({
    id: 1,
    code: "minamiKu",
    name: "Minami Ku Shimizugaoka",
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 1,
    code: "all",
    name: "All",
  });
  const [selectedCoupons, setSelectedCoupons] = useState<Coupons[]>([]);
  const [responseData, setResponseData] = useState(coupons);
  //   const mountedRef = useRef(true);

  React.useEffect(() => {
    if (coupons && coupons.length > 0) {
      setSelectedCoupons(coupons);
      setCouponDetail(null);
      let filteredData: React.SetStateAction<Coupons[]> = [];
      filteredData = coupons.filter(
        (result) =>
          result.storeNames.includes(selectedStore.code) &&
          (result.category.includes(selectedCategory.code) ||
            selectedCategory.code === "all")
      );
      setResponseData(filteredData);
      return () => {
        // mountedRef.current = false;
      };
    }
  }, [selectedCategory.code, selectedStore.code, setCouponDetail]);

  function categoryFilter(value: any) {
    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedCoupons);
    } else {
      filteredData = selectedCoupons.filter((entry) =>
        entry.category.includes(value.code)
      );
      setResponseData(filteredData);
    }
    setSelectedCategory(value);
  }

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

  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <HeaderControls/>
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel color="medium">
                  <h1>Coupons</h1>
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
                  key={selectedStore.id}
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
            <IonCol>
              <IonItem>
                <IonLabel>Select a Category</IonLabel>
                <IonSelect
                  compareWith={compareCategoriesWith}
                  key={selectedCategory.id}
                  value={selectedCategory}
                  // onIonChange={categoryFilter}
                  onIonChange={(e) => categoryFilter(e.detail.value)}
                >
                  {categories.map((category) => (
                    <IonSelectOption key={category.id} value={category}>
                      {category.name}
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
        {responseData.length < 1 && (
          <IonGrid style={{ padding: "20%", paddingTop:"1%" }}>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel className="ion-text-wrap ion-text-center">
                    <h1 style={{fontFamily:"initial"}}>How to Use? So Easy!</h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonCard >
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 1
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://risparmiare.info/wp-content/uploads/2018/05/come-risparmiare-con-i-buoni-sconto-da-stampare-800x445.jpg"
                      style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Add Coupon to the Basket
                    </IonLabel>
                  </IonItem>
                </IonCard>
              
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 2
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://indyme.com/wp-content/uploads/2020/11/shopping-cart-icon.png"
                      style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Buy the selected coupon product at the store
                    </IonLabel>
                  </IonItem>
                </IonCard>
              
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 3
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhWxwnKWQS7G6wmtZAU-p-at2Lk-EkA2d49zLWLTF8_jFxER1MCQzoCJJu3NuA0uqIWY&usqp=CAU"
                       style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Get the points to a later date
                    </IonLabel>
                  </IonItem>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        <IonGrid>
          <IonRow>
            {responseData.map((coupon) => (
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
                  <IonItem
                    onClick={() => {
                      history.push("/coupon/detail");
                      setCouponDetail(coupon);
                    }}
                  >
                    <IonLabel className="ion-text-wrap ion-text-center">
                      {coupon.descLabel}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel
                      className="ion-text-wrap ion-text-center"
                      color="secondary"
                    >
                      Add to Basket
                    </IonLabel>
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

export default Coupon;
