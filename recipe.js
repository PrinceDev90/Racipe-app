const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const msg = document.querySelector("#msg");
const recipeContainer = document.querySelector("#recipeContainer");
const racipeDetailsContant = document.querySelector(".racipe_details_content");
const racipeDetails = document.querySelector(".recipe_details");
const racipeCloseBtn = document.querySelector("#racipe_closeBtn");

const fetchIngredients = (Ingredents) => {
  console.log(Ingredents);
  let ingredentList = "";  
  for(let i = 1; i<=20; i++){
    const ingredent = Ingredents[`strIngredient${i}`];
    if(ingredent){
      const measure = Ingredents[`strMeasure${i}`];
      ingredentList += `<li>[${i}] ${measure} 👉 ${ingredent}</li>`;
    }else{
      break;
    }
  }
  return ingredentList;
};

const viewRacipeDetails = (Details) => {
  racipeDetailsContant.innerHTML = `
    <h1 class='recipeName'>${Details.strMeal}</h1>
    <h3>Ingredents:</h3>
    <ul class='IngredentsList'>${fetchIngredients(Details)}</ul>
    <div class='recipeInstruction'>
      <h3>Instruction : </h3>
      <p>${Details.strInstructions}</p>
    </div>
  `;

  racipeDetailsContant.parentElement.style.display = "block";
};

racipeCloseBtn.addEventListener("click",()=>{
  racipeCloseBtn.parentElement.style.display="none";
})


const recipeApiFun = async (searchText) => {
  try {
    msg.innerText = "Fetching Data....";
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    let response = await fetch(URL);
    let data = await response.json();
    msg.innerText = "";
    recipeContainer.innerHTML = "";
    data.meals.forEach((meal) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-aos", "zoom-out-up");
      card.innerHTML = `
      <img class='cardImg' src='${meal.strMealThumb}' alt='Recipe Image' />
      <div class="cardContent">
        <h2 class="cardTitle" data-aos='slide-up'>${meal.strMeal}</h2>
        <p class="cardsubDesc" data-aos='slide-up'><b>Dish</b> : ${meal.strArea}</p>
        <p class="cardsubDesc" data-aos='slide-up'><b>Category</b> : ${meal.strCategory}</p>
      </div>
    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      button.setAttribute("data-aos", "slide-up");
      button.addEventListener("click", () => {
        viewRacipeDetails(meal);
      });
      card.appendChild(button);
      recipeContainer.appendChild(card);
    });
  } catch (err) {
    const imgGit = document.createElement("img");
    imgGit.src = "Nodata.svg";
    imgGit.classList.add("set_img_not");
    recipeContainer.appendChild(imgGit);
    msg.innerText = "Ooops!!! Recipe Not Found Search Other Thing";
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchVal = searchInput.value.trim();
  if (searchVal === "") {
    msg.innerText = "Enter Valid Racipe";
  } else {
    recipeApiFun(searchVal);
  }
});
