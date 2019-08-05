import { bottomSwiper } from "./touches";
import { directionsDisplay } from "./google_maps";
import { checkFavouriteJourneys } from './favourites';

const topDrawer = document.querySelector(".drawer__container--top");
const bottomDrawer = document.querySelector(".drawer__container--bottom");
const searchButton = document.querySelector(".search-button");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-input");
export const sightInput = document.querySelector("#search-sightseeing");
export const dateInput = document.querySelector("ion-datetime");
export const dateContainer = document.querySelector("#departing-container");
export const submitButton = document.querySelector("#sub-button");
export const controller = document.querySelector('ion-toast-controller');

export let showContainer= document.querySelector("#show-container") ;
export let cardShowing = false;

export function changeCardShowing() {
    cardShowing = false;
    showContainer.style.display = "none";
    directionsDisplay.set('directions', null);
}

export let selectedTab = $("ion-tab-button#tab-button-journey");
export const jpFormInputs = $(".journey-planner__form__input");
export const fromInput = document.querySelector("#from");
export const fromContainer = document.querySelector("#from-container");
export const toInput = document.querySelector("#to");

const allInputs = document.querySelectorAll("input");

allInputs.forEach(input => input.addEventListener('click', (e => e.target.select())))

let jpInputs = [fromInput, toInput];

// jpInputs.forEach(input => {
//     input.addEventListener('change', () => {
//         if (document.querySelector('.journey-planner').classList.contains('converted')){
//             checkFavouriteJourneys();
//         }
//     })
// })

let body = document.body, 
html = document.documentElement;
export let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );


export const drawers = {
  top: topDrawer,
  bottom: bottomDrawer
};

export function switchUpText() {
  let selection = [
    "Take me for a ride!",
    "Bus me!",
    "Vroom vroom!",
    "The wheels on the bus...",
    "Let's go!",
    "Trip me!",
    "Go public transport!",
    "Let's bus!",
    "RT_Trips gave my CPU a stroke"
  ];

  let num = Math.floor(Math.random() * selection.length);
  let relText = selection[num];
  submitButton.innerHTML = relText;
}

let collectionOfRoutes = []

export class Route {
  constructor(routeData) {
    this.routeData = routeData;
    this.nodeHTML = Route.cardBuilder(
      routeData.routeDescription,
      routeData.departureTime,
      routeData.id,
      routeData.full_travel_time,
      routeData.leavingIn,
      routeData.leavingInValue
    );

    
    this.domNode = null;
    this.showContainer = document.querySelector("#show-container");
    this.routeInfo = routeData.route;
    this.directions = routeData.directions;
    this.routeDescription = routeData.routeDescription; 
    this.leavingIn = routeData.leavingIn;
    this.leavingInValue = routeData.leavingInValue


  }

  

  static addClick(route) {
    route.domNode.addEventListener("click", () => {
      route.showContainer.innerHTML = Route.journeyShowCard(
        route.routeData.routeDescription,
        route.nodeHTML,
        route.routeData.id
      );
      route.showContainer.style.display = "block";
      bottomSwiper.changeState(bottomSwiper.IN_STATE, null);
    //   remove color add to show journey planner is still in use
      bottomSwiper.tabs.removeClass("color-add");
      cardShowing = true;
      directionsDisplay.setDirections(route.directions.directions);
      let showCardOpen = false;
      const infoText = document.querySelector("#infoText");
      const mic = document.querySelector("#moreInfo-click");
      const showContainer = document.querySelector("#show-container");
      const card = document.querySelector("#stretchCard");


      const backToRoutes = document.querySelector("#backToRoutes");
      mic.addEventListener("click", () => {
        
        showContainer.classList.toggle("moreInfoToggled");
        card.classList.toggle("card-extended");
        
        let tabsHeight = document.querySelector('.tabbar-container').getBoundingClientRect().height;

        
        if (showContainer.classList.contains('moreInfoToggled')){
            document.querySelector('#stretchCard').style.height = (height - tabsHeight - (height * 0.03)) + "px";
        } else {
            document.querySelector('#stretchCard').style.height = "160px";
        }
       
        
        if (!showCardOpen) {
          showCardOpen = true;
          infoText.innerHTML = "Show Less";
        } else {
          showCardOpen = false;
          infoText.innerHTML = "More Info";
        }
      });

      backToRoutes.addEventListener("click", () => {
        bottomSwiper.changeState(bottomSwiper.OUT_STATE);
        if (showCardOpen) {
          showCardOpen = false;
          infoText.innerHTML = "More Info";
          showContainer.classList.toggle("moreInfoToggled");
          card.classList.toggle("card-extended");
        }
        document.querySelector("#show-container").style.display = "none";
      });
    });
  }

  static appendToDom(route) {
    collectionOfRoutes.push(route)
  }

  static signalAppend() {

        collectionOfRoutes.sort((a,b) => {
            return a.leavingIn > b.leavingIn
        })

      collectionOfRoutes.forEach(route => {
        $("#routesHere").append(
            Route.jpDisplayCard(route.nodeHTML, route.routeData.id)
          );
          route.domNode = document.querySelector(`#route-${route.routeData.id}`);
          Route.addClick(route);
      })

      collectionOfRoutes = []
  }

  static cardBuilder(routeDescription, departureTime, id, full_travel_time, leavingIn, leavingInValue) {

        // <p>${leavingInValue}</p>
    const card = `
            <div class="journey-planner__card__container">
       
              <div class="journey-planner__card__left">
                <div class="journey-planner__card__left__depTitle">
                  <h2
                    class="journey-planner__card__title journey-planner__card__title--departingTitle"
                  >
                    Departing in: 
                  </h2>
                </div>
                <div class="journey-planner__card__left__minsTitle">
                 
                 
                  <h1 class="journey-planner__card__timeTitle">${leavingIn === "N/A" ? "N/A" : `${leavingIn} mins`}</h1>
                </div>
              </div>
              <div class="journey-planner__card__right">
                <div class="journey-planner__card__right__travelTime">
                  <h2
                    class="journey-planner__card__title journey-planner__card__title--departingTitle"
                  >
                    Travel time:
                    <span
                      class="journey-planner__card__timeNumber"
                      id="jp-travel-time"
                      >${Math.round(full_travel_time / 60)}</span
                    >
                    minutes
                  </h2>
                </div>
                <div
                  class="journey-planner__card__right__descriptionContainer" id="route-descriptions"
                > 
              
                ${Route.iconsBuilder(routeDescription)}
    
                  
                </div>
              </div>
            </div>
          `;

    return card;
  }

  static iconsBuilder(routeDescription) {
    let counter = 0;
    let finString = "";
    routeDescription.forEach(routeSection => {
      let icon;
      let finalArr;
      let walkTimeOrBusNo;
      if (routeSection[0] == "walking") {
        walkTimeOrBusNo = Math.round(routeSection[1] / 60) + " mins";
        icon = `<ion-icon class="journey-planner__card__icon journey-planner__card__icon--walk" name="walk"></ion-icon>`;
      } else {
        walkTimeOrBusNo = routeSection[1];
        icon = `<ion-icon class="journey-planner__card__icon journey-planner__card__icon--bus" name="bus"></ion-icon>`;
      }

      if (counter + 1 == routeDescription.length) {
        finalArr = "";
      } else {
        finalArr = `<ion-icon class="journey-planner__card__icon journey-planner__card__icon--arrow" name="arrow-forward"></ion-icon>`;
      }

      counter++;

      finString =
        finString +
        `<div class="journey-planner__card__right__iconContainer">
                          ${icon}
                          <div class="journey-planner__card__numberbox journey-planner__card__numberbox">${walkTimeOrBusNo}</div>
                          ${finalArr}
                    </div>`;
    });
    return finString;
  }

  static moreInfoBuilder(routeDescription) {

    let icon;

    let finString = "";
    let travelText;
    let destinationText;
    let four = "DESTINATION";
    let whereWeAre;
    let whereWeAreGoing;
    routeDescription.forEach((routeSection, index) => {
      // if (index === 0) {
      //     whereWeAre = routeSection[4]
      // } else if (index === routeDescription.length - 1) {
      //     whereWeAreGoing = routeSection[5]
      // } else {
      //     whereWeAre = routeSection[4]
      //     whereWeAreGoing = routeDescription[index + 1][4]
      // }

      if (index === 0) {
        whereWeAre = routeSection[4];
      }

      destinationText = routeSection[2];

      finString += `
          <div class="more-route-info__locationDiv">
          <div class="more-route-info__icon">

          
          `;
      if (routeSection[0] == "walking") {
        icon = `<ion-icon class="more-route-info__icon__internal" name="walk"></ion-icon>`;
        travelText = "Walk";
      } else {
        icon = `<ion-icon class="more-route-info__icon__internal" name="bus"></ion-icon>`;
        travelText = `Take the ${routeSection[1]}`;
      }

      finString += icon;

      finString += `
         </div>
         <div class="more-route-info__locationText">
          ${
            index === 0
              ? `<h2>${routeSection[5]}</h2>`
              : routeSection[0] === "bus"
              ? `<h2>${routeSection[3]}</h2>`
              : `<h2>${routeDescription[index - 1][4]}`
          }
         </div>
         <div class="more-route-info__distanceText">
             <h2><span class="type-span">${travelText}</span> ${destinationText} (${
        routeSection[7]
      })</h2>
         </div>
         ${
           index === routeDescription.length - 1
             ? `<div class='more-route-info__finalCircle'></div>
            <div class="more-route-info__finalText"><h2>${
              routeSection[6]
            }</h2></div>
            `
             : ``
         }
          </div>
          `;
    });

    return finString;
  }

  static jpDisplayCard(innerText, id) {
    return `<div class="journey-planner__routes__card routeCard" id="route-${id}">
       <div class="customCard">
          ${innerText}
       </div>
        </div>`;
  }

  static journeyShowCard(routeDescription, innerText, id) {

    return `<div class="journey-planner__routes__card routeCard showCard" id="route-${id}">
    <div class="customCard" id="stretchCard">
    <div class="showCard__toggleButtonsContainer">
                    <div class="showCard__backToRoutesContainer" id="backToRoutes">
                      <ion-icon
                        name="md-arrow-back"
                        class="showCard__backArrow"
                      ></ion-icon>
                      <h2 class="showCard__routeText showText">Choose another route</h2>
                    </div>
                    <div class="showCard__moreInfoContainer" id="moreInfo-click">
                      <ion-icon
                        name="arrow-dropup-circle"
                        class="showCard__moreInfoButton"
                      ></ion-icon>
                      <h2 class="showCard__infoText showText" id="infoText">More Info</h2>
                    </div>
                  </div>
       ${innerText}
       <div class="more-route-info">
           
       ${Route.moreInfoBuilder(routeDescription)}
           
       </div>
    </div>
     </div>`;
  }
}

export const search = {
  searchButton,
  searchContainer,
  searchInput
};
