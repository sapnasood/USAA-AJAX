// Get HTML elements by id attribute
const app = document.getElementById('root');
const getBtn = document.getElementById('get-btn');
const getName = document.getElementById('name');
const getCode = document.getElementById('code');

const cntryCodeHeader = document.createElement('h1');
cntryCodeHeader.id = "code-h1";
const getcntryCodeHeader = document.getElementById('code-h1');

const continueBtn = document.createElement('button');
var getcontinueBtn;
continueBtn.id = "continue-btn";
continueBtn.textContent = "Continue Search";


const exitBtn = document.createElement('button');
var getexitBtn;
exitBtn.id = "exit-btn";
exitBtn.innerText = "Exit";


const container = document.createElement('div');
container.id = 'cont';

app.append(container);

//This function is triggered when Get Data button is clicked and it makes a GET api call
// to fetch Capital from country name or country code given by the user
const getData = () => {
    var expression = /^[a-zA-Z]+$/;

    // Alert is thrown if user doesn't provide both country name and code
    if (!(getCode.value) && !(getName.value)) {
        alert("Enter either country name or country code !!");
    }
    // Add Continue Search and Exit buttons on the page  
    else {

        container.appendChild(continueBtn);
        container.appendChild(exitBtn);
        getcontinueBtn = document.getElementById('continue-btn');
        getcontinueBtn.style.visibility = "visible";
        getexitBtn = document.getElementById('exit-btn');
        getexitBtn.style.visibility = "visible";

        // Click event on Continue Search button
             getcontinueBtn.addEventListener('click', continueSrc);

       // Click Exit button to close the app
           getexitBtn.addEventListener('click', closeApp);
    }
    //  Axios Get call to the web service when country native or partial name is given by the user   

    if (getName.value) {
        if (getName.value.match(expression)) {
            axios.get('https://restcountries.eu/rest/v2/name/' + `${getName.value}`)
                .then((response) => {
                    console.log('Country native or partial name  : ' + getName.value);
                    const cntryHeader = document.createElement('h1');
                    cntryHeader.id = "country-h1";
                    cntryHeader.innerText = "Country native or partial name  : " + getName.value;
                    container.appendChild(cntryHeader);
                    response.data.forEach(element => {
                        console.log("Country====> :" + element.name + "   " + "Capital===>  : " + element.capital);
                        const capitalHeader = document.createElement('h2');
                        capitalHeader.id = "capital-h2";
                        capitalHeader.innerText = "Country :: " + element.name + "   " + "Capital :: " + element.capital;
                        container.appendChild(capitalHeader);
                        //    Hide search button  
                        getBtn.style.visibility = "hidden";
                    });


                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                    getName.value = "";
                    getcontinueBtn.style.visibility = "hidden";
                    getexitBtn.style.visibility = "hidden";
                })
                .finally(() => {
                    // always executed
                })
        }
        else {
            alert("Name cannot be alphanumeric");
            getName.value = "";
            getcontinueBtn.style.visibility = "hidden";
            getexitBtn.style.visibility = "hidden";
        }
    }


    // Axios Get call to the web service when country code is given by the user
    if (getCode.value) {
        if (getCode.value.match(expression) && getCode.value.length <= 3) {


            axios.get('https://restcountries.eu/rest/v2/alpha/' + `${getCode.value}`)
                .then((response) => {
                    console.log("Country code  : " + getCode.value)

                    cntryCodeHeader.innerHTML = "Country code  : " + getCode.value;
                    container.appendChild(cntryCodeHeader);

                    console.log(response.data.capital);

                    const capitalHeader = document.createElement('h2');
                    capitalHeader.innerHTML = "Capital :: " + response.data.capital;
                    container.appendChild(capitalHeader);
                    // Hide Search button
                    getBtn.style.visibility = "hidden";


                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                    getcontinueBtn.style.visibility = "hidden";
                    getexitBtn.style.visibility = "hidden";
                    getCode.value = "";
                })
                .finally(() => {
                    // always executed
                })
        }
        else {
            alert("Country code cannot be alphanumeric or more than 3 letters");
            getCode.value = "";
            getcontinueBtn.style.visibility = "hidden";
            getexitBtn.style.visibility = "hidden";


        }
    }

}

const continueSrc = () => {
    getBtn.style.visibility = "visible";
    getCode.value = "";
    getName.value = "";
    getcontinueBtn.style.visibility = "hidden";
    getexitBtn.style.visibility = "hidden";
    const getContainer = document.getElementById('cont');
    getContainer.innerHTML = "";



}

const closeApp = () =>{
  javascript:window.close('','_parent','');

}

// Click event on Get Data button
getBtn.addEventListener('click', getData);

