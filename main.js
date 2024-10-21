
// Get Countries // 
 function  getCountries(){
    Cards = document.getElementById("Cards")
    Cards.innerHTML = "";
    toggleLoader(true);
    axios.get("data.json")
    .then(response=>{
        toggleLoader(false);
      let data = response.data
      for( data of data){
         Cards.innerHTML += `
         <div class="card col-md-3 col-2 mx-md-5 mx-2 mb-md-5 mb-4 mt-md-4 mt-2 border-1  shadow" style="width: 16.5rem;  padding: 0; cursor:pointer;" onclick="getCountry('${data.alpha3Code}')">
                  <img src="${data.flags.png}" class="m-0 " style="height:150px">
                  <div class="card-body mt-1" style="height:180px">
                      <h2 class="card-title mb-3 fs-5 fw-bolder" > ${data.name}</h2>
                      <p class="m-1 fs-6"><strong class="fw-bold">Population:</strong> ${data.population}</p>
                      <p class="m-1 fs-6"><strong class="fw-bold">Region:</strong> ${data.region}</p>
                      <p class="m-1 fs-6"><strong class="fw-bold">Capital:</strong> ${data.capital}</p>
                  </div>
              </div>` 
      }
      
        modeTheme();
    })
}
//--- Get Countries--- // 




//  get counytry by name //
 function getcountryByname(nameOfcountry){
    let details = document.getElementById("details");
    toggleLoader(true);
    details.innerHTML = "";
    axios.get(`data.json`)
    .then(response => {
        toggleLoader(false);
           const data = response.data;     
           const country = data.find(country => country.alpha3Code.toLowerCase() === nameOfcountry.toLowerCase());
        if(country){
            
            // borders //

            let border = ``;
               if (country.borders) {
                   country.borders.forEach((borderCountry) => {
                       border += `
                           <button class="btn btn-outline-light mb-1 me-1 shadow theme" style="color: black;" onclick="getBorderCountry('${borderCountry}')">${borderCountry}</button>
                       `;
                   });
               } else {
                   border = "No border countries!";
               }
               
            // borders //

            //language //

               let language ='';
               let languages = country.languages ;
               for(let i=0 ; i< languages.length ; i++){
                 language += `
                   ${languages[i].name},
                 `
               }
            //language //
              
            // currencies // 
                 if(country.currencies){
                    curr = `${country.currencies[0].name }`;
                 } else {
                    curr = "No currencies available" ;
                 }

            // currencies //

            details.innerHTML = `
            <!-- Flag Section -->
                 <div class="col-md-6 text-center mb-5 mb-md-0">
                     <img src="${country.flag}" class="img-fluid shadow" alt="Belgium Flag" >
                 </div>

        <!-- Information Section -->
                <div class="col-md-6  ">
                  <div class="ms-md-5  fs-md-4 ">
                      <h1 class="mb-5 fw-bolder">${country.name}</h1>
                      <div class="row mb-md-5 mb-3">
                          <div class="col-md-6 col-12 mb-3 mb-md-0">
                              <p><strong class="fw-bold">Native Name:</strong> ${country.nativeName}</p>
                              <p><strong class="fw-bold">Population:</strong> ${country.population}</p>
                              <p><strong class="fw-bold">Region:</strong> ${country.region}</p>
                              <p><strong class="fw-bold">Sub Region:</strong> ${country.subregion}</p>
                              <p><strong class="fw-bold">Capital:</strong> ${country.capital}</p>
                          </div>
                      
                          <div class="col-md-6 col-12">
                              <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
                              <p><strong>Currencies:</strong> ${curr}</p>
                              <p><strong>Languages:</strong>${language}</p>
                          </div>
                </div>
                
            

                 <!-- Border Countries -->
                  <p class="m-1"><strong>Border Countries:</strong></p>
                  ${border}
            </div>
            
        </div>
           `
        }
        modeTheme();
    })
 }
 
//--- get counytry by name ---//





// get country in New Page //
   function getCountry(nameOfcountry){
         window.location.href=`CountryPage.html?name=${nameOfcountry}`;
   }
// ---get country in New Page ---//




// get border country // 
    function getBorderCountry(nameOfcountry){
        getCountry(nameOfcountry)
         getcountryByname(nameOfcountry)
    }

// ---get border country--- //

// Back function //
  function backPage(){
    window.location.href = "index.html";
  }
// ---Back function--- //


// getCountryBySearch //
   
   function getCountryBySearch(nameOfcountry){
    getCountry(nameOfcountry)
    getcountryByname(nameOfcountry)
   }
   
// getCountryBySearch //


// theme //
  let ModeTheme = "light" ;
  let page ;
  function changetheme(a){
        if( ModeTheme === "light" ){
            ModeTheme = "night" ;
            sessionStorage.clear();
            sessionStorage.setItem("mode",ModeTheme);
            page = a ;
            modeTheme();
        } else {
            ModeTheme = "light" ;
            sessionStorage.clear();
            sessionStorage.setItem("mode",ModeTheme);
            page = a ;
            modeTheme();
        }
  }



  function modeTheme() {
    ModeTheme = sessionStorage.getItem("mode") ;
      if (ModeTheme == "light") {
          document.body.style.background = "hsl(0, 0%, 98%)";
          document.body.style.color = "hsl(200, 15%, 8%)";
          document.querySelector(".navbar").style.background = "hsl(0, 0%, 100%)";
          document.querySelector(".navbar").style.color = "hsl(200, 15%, 8%)";
           

            if( window.location.href.includes("index")){
              document.querySelectorAll(".card").forEach(function(card) {
              card.style.background = "hsl(0, 0%, 100%)";
              card.style.color = "hsl(200, 15%, 8%)";
          });
                
                document.querySelector(".form-select").classList.remove("night-2");
                document.querySelector(".srch").classList.remove("night-1");
            }
            document.querySelectorAll(".theme").forEach(function(inputt){
                inputt.style.background = "hsl(0, 0%, 100%)";
                inputt.style.color = "hsl(200, 15%, 8%)";
                inputt.style.border = "hsl(0, 0%, 100%)";
            })
          
      } else {
          document.body.style.background = "hsl(207, 26%, 17%)";
          document.body.style.color = "hsl(0, 0%, 100%)";
          document.querySelector(".navbar").style.background = "hsl(209, 23%, 22%)";
          document.querySelector(".navbar").style.color = "hsl(0, 0%, 100%)";



          if( window.location.href.includes("index")){
          document.querySelectorAll(".card").forEach(function(card) {
              card.style.background = "hsl(209, 23%, 22%)";
              card.style.color = "hsl(0, 0%, 100%)";
              
          });
          
        document.querySelector(".form-select").classList.add("night-2");
        document.querySelector(".srch").classList.add("night-1");
      }
      document.querySelectorAll(".theme").forEach(function(inputt){
        inputt.style.backgroundColor = "hsl(209, 23%, 22%)";
        inputt.style.color = "hsl(0, 0%, 100%)";
        inputt.style.border = "hsl(209, 23%, 22%)";
        
    })     
             }
}

// <--- theme ---> //

// <--- loder ---> //
      let loader = document.getElementById("loader");
      
      function toggleLoader(loder = false) {
        if (loder) {
          loader.style.visibility = "visible";
          loader.style.top = "10px";
         
        } else {
          loader.style.top = "0px";
         loader.style.visibility = "hidden";
        } 
    }
// <--- loder ---> //