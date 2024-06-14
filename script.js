const inputField = document.querySelector("input");
const button = document.querySelector("button");
const infoCard = document.querySelector(".info-card");
const img = document.querySelector("img");
const countryNames = document.querySelector(".country-name");
const capital = document.querySelector(".capital");
const continent = document.querySelector(".continent");
const population = document.querySelector(".population");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".languages");
const errorMessage = document.querySelector(".error-message");
const credits = document.querySelector(".credits");

const countryinfo = () => {
    let countryName = inputField.value.toLowerCase();
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    const fetchCountryInfo = async () => {
        try{
            const response = await fetch(URL);
            if(!response.ok){
                throw new Error("Contry Not Found!");
            }
            const data = await response.json();

            img.src = data[0].flags.svg;
            countryNames.innerHTML = data[0].name.common;
            capital.innerHTML = data[0].capital;
            continent.innerHTML = data[0].continents;
            population.innerHTML = data[0].population;
            for(let currencyName in data[0].currencies){
                currency.innerHTML = currencyName;
            }
            const commonLanguages = Object.values(data[0].languages).toString().split(",").join(", ");
            languages.innerHTML = commonLanguages;

            errorMessage.style.display = "none";
            infoCard.style.display = "block";

            setTimeout(()=>{
                credits.style.opacity = "1";
            }, 3000);
        }catch (error){
            if(inputField.value == ""){
                errorMessage.innerHTML = "Please enter country name!";
                errorMessage.style.display = "block";
                infoCard.style.display = "none";
            }else{
                errorMessage.innerHTML = error.message;
                errorMessage.style.display = "block";
                infoCard.style.display = "none";
            }
        }
    }
    fetchCountryInfo();
}

button.addEventListener("click", e => {
    e.preventDefault();
    countryinfo();
});