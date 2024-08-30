// START PART SHOP
let shop = document.querySelectorAll(".shop");
let noneOrYes = document.querySelector(".noneOrder");
let category = 0;
let obj = {};
shop.forEach((el) => {
  el.addEventListener("click", function () {
    el.parentElement.querySelector(".img").style.cssText =
      "outline:solid 3px red";
    let back = el.querySelector(".back");
    let spanInBack = back.querySelector("span");
    let theTexts = el.parentElement.querySelector(".text");
    let nameOfFood = el.parentElement
      .querySelector(".text")
      .querySelector("p").innerHTML;
    spanInBack.innerHTML = "1";
    back.style.zIndex = "1";
    obj[nameOfFood] = { name: theTexts, count: 1 };
    noneOrYes.remove();
  });
});
// END PART SHOP AND FOR EACH
// ============================================================================
// START BACKED
let backed = document.querySelectorAll(".back");
let card = document.querySelector(".card");
backed.forEach((el) => {
  el.addEventListener("click", function (e) {
    let nameOfMeal = el.parentElement.parentElement
      .querySelector(".text")
      .querySelector("p").innerHTML;
    if (e.target.className == "plus") {
      e.target.previousElementSibling.innerHTML++;
      obj[nameOfMeal]["count"] = e.target.previousElementSibling.innerHTML;
      noneOrYes.remove();
    } else if (e.target.className == "minus") {
      if (e.target.nextElementSibling.innerHTML > 1) {
        e.target.nextElementSibling.innerHTML--;
        obj[nameOfMeal]["count"] = e.target.nextElementSibling.innerHTML;
      } else {
        delete obj[nameOfMeal];
        category = 0;
        e.target.parentElement.style.zIndex = "-1";
        e.target.nextElementSibling.innerHTML = "0";
        card.appendChild(noneOrYes);
        el.parentElement.parentElement.querySelector(".img").style.cssText =
          "outline:none";
      }
    }
    document.dispatchEvent(new Event("click"));
    e.stopPropagation();
  });
});
// END BACKED
// ============================================================================
// START ADD DATA TO CARD
let title = document.querySelector(".card h2");
let spans = document.querySelectorAll(".back span");
// Make Content
let content = document.createElement("div");
content.className = "content";
// Make The List
let list = document.createElement("div");
list.className = "list";
// Add List To Content
content.appendChild(list);
// Make Total
let total = document.createElement("div");
total.className = "total";
// Make Span Of Total
let spanOfTotal = document.createElement("span");
spanOfTotal.append("Order Total");
// Add SpanOfTotal To Total
total.appendChild(spanOfTotal);
total.style.cssText = "position:relative;margin-bottom:20px";
// Make Final Price
let finalPrice = document.createElement("span");
// Add finalPrice To Total
total.appendChild(finalPrice);
finalPrice.style.cssText =
  "font-weight:bold;position:absolute;right:0px;font-size:25px;top:-5px";
// Add Total To Content
content.appendChild(total);
let totalNum = 0;
// Make Delivery
let delivery = document.createElement("div");
delivery.style.cssText =
  "padding:15px;background-color: antiquewhite;border-radius:15px";
// Make Img
let imgOfDelivery = document.createElement("img");
imgOfDelivery.style.cssText = "margin-right:10px";
imgOfDelivery.src = "./img/icon-carbon-neutral.svg";
// Add Img To delivery
delivery.appendChild(imgOfDelivery);
// Add delivery content
// Make p
let pDelivery = document.createElement("span");
pDelivery.style.cssText = "font-size:14px;position:relative;top:-5px";
pDelivery.append("This is a carbon-neutral delivery");
// Add p to delivery
delivery.appendChild(pDelivery);
// Make confirm
let but = document.createElement("button");
but.append("Confirm Order");
but.style.cssText =
  "width:100%;margin-top:15px;height:40px;background-color:red;color:white;border:none;border-radius:15px;cursor:pointer;font-size:16px";
content.appendChild(delivery);
content.appendChild(but);

document.addEventListener("click", function (e) {
  totalNum = 0;
  finalPrice.innerHTML = "";
  if (e.target.className == "deleteItem") {
    let theName =
      e.target.parentElement.parentElement.querySelector("p").innerHTML;
    let classed = theName.replaceAll(" ", "-");
    let span = document.getElementsByClassName(classed)[0];
    span.parentElement.style.zIndex = "-1";
    span.innerHTML = "0";
    let h2 =
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
        "h2"
      ).innerHTML;

    span.parentElement.parentElement.parentElement.querySelector(
      ".img"
    ).style.outline = "none";
    delete obj[theName];
    if (!Object.keys(obj).length) {
      card.appendChild(noneOrYes);
    }
  }
  category = 0;
  list.innerHTML = "";
  spans.forEach((el) => {
    category += +el.innerHTML;
  });

  title.innerHTML = `Your Cart (${category})`;

  if (Object.keys(obj).length) {
    noneOrYes.remove();
    for (let val in obj) {
      // Make Name Of Meal
      let NameMeal = obj[val]["name"].querySelector("p").innerHTML;
      let counted = obj[val]["name"].parentElement
        .querySelector(".shop")
        .querySelector(".back")
        .querySelector("span").innerHTML;
      // Make The Price
      let theP = obj[val]["name"].querySelector("span:last-child").innerHTML;
      // Make The Num
      let num = obj[val]["count"];
      // Make ListChild
      let divOfList = document.createElement("div");
      divOfList.className = "listChild";
      divOfList.style.cssText =
        "margin-bottom:20px;border-bottom:solid 1px rgb(230, 230, 230);padding-bottom:15px;position:relative";
      // Make Paragraph
      let p = document.createElement("p");
      p.append(NameMeal);
      p.style.cssText = "font-weight:bold;margin-bottom:15px";
      // Add p To ListChild
      divOfList.appendChild(p);
      // Make Prices
      let prices = document.createElement("div");
      prices.className = "prices";
      // Make Count
      let counter = document.createElement("span");
      counter.append(counted + "x");
      counter.style.cssText = "color:red;margin-right:25px";
      // Add Counter To Prices
      prices.appendChild(counter);
      // Make The Price
      let thePrice = document.createElement("span");
      thePrice.append("@" + theP);
      thePrice.style.cssText = "color:silver;margin-right:20px";
      // Add thePrice To Prices
      prices.appendChild(thePrice);
      // Make The TotalPrice
      let TotalPrice = document.createElement("span");
      TotalPrice.append(`$` + (theP.slice(1) * +num).toFixed(2));
      TotalPrice.style.cssText = "color:silver";
      TotalPrice.className = "theTotal";
      // Add Total Price To Prices
      prices.append(TotalPrice);
      // Make Button Delete
      let deleted = document.createElement("span");
      deleted.append("x");
      deleted.className = "deleteItem";
      deleted.style.cssText =
        "position:absolute;right:0;display:inline-flex;border:solid 1px silver;border-radius:100px;width:25px;height:25px;justify-content:center;align-items:center;color:silver;cursor:pointer";
      // Add deleted To Prices
      prices.appendChild(deleted);
      // Add Prices To ListChild
      divOfList.appendChild(prices);
      // Add ListChild To List
      list.appendChild(divOfList);
    }
    // Add Content To Card
    card.appendChild(content);
    document.querySelectorAll(".theTotal").forEach((el) => {
      let theP = el.innerHTML.slice(1);
      totalNum += +theP;
    });
    finalPrice.append(`$` + totalNum.toFixed(2));
  } else {
    content.remove();
  }
});
// END CARD
// SART BUT

let confirmed = document.createElement("div");
confirmed.style.cssText = `
  background-color: white;
  padding:15px;
  width: 400px;
  max-height: 600px;
  position: fixed;
  bottom:-450px;
  left: 50%;
  transform: translate(-50%);
  border-radius:15px;
  transition-duration:500ms;
  z-index:999;
  overflow:auto;
  `;

document.body.appendChild(confirmed);
but.addEventListener("click", function () {
  let landing = document.createElement("div");
  landing.style.cssText =
    "width:100%;height:100%;position:fixed;background-color:#00000030;left:0;top:0;";
  document.body.appendChild(landing);
  // Make DivImg
  let img = document.createElement("img");
  img.src = "./img/icon-order-confirmed.svg";
  confirmed.appendChild(img);
  img.style.cssText = "margin-bottom:15px;width:35px";
  // End DivImg
  // Make h1
  let h1 = document.createElement("h1");
  h1.append("Order Confirmed");
  confirmed.appendChild(h1);
  // End h1
  // Make p
  let p = document.createElement("p");
  p.append("We hope you enjoy your food");
  p.style.cssText = "margin:10px 0px 20px";
  confirmed.appendChild(p);
  // End p
  // Make List
  let list = document.createElement("div");
  list.className = "list";
  let nums = 0;
  list.style.cssText =
    "background-color:#eee;border-radius:15px 15px 0px 0px;margin-bottom:20px";
  let Total = document.createElement("div");
  Total.className = "totaled";
  Total.style.cssText = "padding:15px;position:relative";
  let spanTotal = document.createElement("span");
  spanTotal.innerHTML = "Order Total";
  Total.appendChild(spanTotal);
  let finalPrices = document.createElement("span");
  for (let value in obj) {
    let childList = document.createElement("div");
    childList.className = "childList";
    childList.style.cssText =
      "margin-bottom:20px;position:relative;padding:15px;border-bottom:1px solid rgb(230, 230, 230)";
    let classes = value.replaceAll(" ", "-");
    // Make Img
    let img = document
      .querySelector(`.${classes}`)
      .parentElement.parentElement.parentElement.querySelector("img")
      .cloneNode(true);
    img.style.cssText = "width:50px;margin-right:10px";
    childList.appendChild(img);
    // End Img
    // Make Texts
    let texts = document.createElement("div");
    texts.style.cssText = "display:inline-block";
    let firstSpan = document.createElement("span");
    firstSpan.append(obj[value]["name"].querySelector("p").innerHTML);
    firstSpan.style.cssText = "display:block;margin-bottom:10px";
    texts.appendChild(firstSpan);
    let cou = document.createElement("span");
    cou.style.cssText = "color:red;margin-top:10px;margin-right:15px";
    cou.append("x" + obj[value]["count"]);
    let prices = obj[value]["name"].querySelector("span:last-child").innerHTML;
    texts.appendChild(cou);
    let price = document.createElement("span");
    price.style.cssText = "color:silver";
    price.append("@" + prices);
    texts.appendChild(price);
    let Finalprice = document.createElement("span");
    Finalprice.style.cssText = "position:absolute;right:10px;font-weight:bold";
    let theFinalNum = obj[value]["count"] * +prices.slice(1);
    Finalprice.append("$" + theFinalNum);
    texts.appendChild(Finalprice);
    // Start Totaled
    nums += theFinalNum;
    finalPrices.innerHTML = "$" + nums;
    finalPrices.style.cssText =
      "font-weight:bold;position:absolute;right:10px;bottom:10px;font-size:25px;";
    childList.appendChild(texts);
    list.appendChild(childList);
  }
  Total.appendChild(finalPrices);
  list.appendChild(Total);
  confirmed.appendChild(list);
  // End List
  // Make Button
  let button = document.createElement("button");
  button.append("Start New Order");
  button.style.cssText = `width:100%;height:50px;background-color:red;color:white;font-size:16px;border:none;border-radius:15px;cursor:pointer`;
  confirmed.appendChild(button);
  button.addEventListener("click", function () {
    location.reload();
  });
  // End Button

  confirmed.style.bottom = "50%";
  confirmed.style.transform = "translate(-50%,50%)";
  const mediaQuery = window.matchMedia("(max-width: 600px)");
  function query() {
    if (mediaQuery.matches) {
      confirmed.style.width = "100%";
      confirmed.style.bottom = "0";
      confirmed.style.left = "0";
      confirmed.style.transform = "";
    } else {
      confirmed.style.width = "400px";
      confirmed.style.bottom = "50%";
      confirmed.style.left = "50%";
      confirmed.style.transform = "translate(-50%,50%)";
    }
  }
  mediaQuery.addEventListener("change", query);
  query();
});
// راجع انك تمنع المستخدم يسكرول
// راجع لما تختار عنصر وتنسقه وتطبعه
