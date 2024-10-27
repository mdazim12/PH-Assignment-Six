
 


  // Display Category list
const loadCategory = () => {
  const loadingSection = document.getElementById('loading-section');
  loadingSection.style.display = 'block'; // Show loading spinner

  fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then((res) => res.json())
   .then((data) => {
      displayCategory(data.categories);
      loadingSection.style.display = 'none';
  })
  .catch((err) => {
      console.log(err);
      loadingSection.style.display = 'none'; 
  });
};


 
  //display category
  const displayCategory = (categories) =>{
      const categoryContainer = document.getElementById('category-container');

      categories.forEach((items) => {
         //Create new button as a category

         const buttonContainer = document.createElement('div')
         buttonContainer.classList.add(
              'text-center', 'justify-center','mx-auto'
      );
         buttonContainer.innerHTML = `
             <button id ="btn-${encodeURIComponent(items.category) }" class ="category-btn text-center justify-center mx-auto flex items-center gap-2 border rounded-lg px-8 py-2"  onclick="loadCategoryVideos('${encodeURIComponent(items.category) }')" class="flex items-center justify-center gap-2 border rounded-lg px-8 py-4 text-center m-5"> 
              <img src="${items.category_icon}" alt="${items.category}">
              <h4 class="text-2xl font-bold text-mainblack">${items.category}</h4>
          </button>
         `
         categoryContainer.append(buttonContainer);

      })
  }

  // remove active class
  const removeActiveClass = () =>{
    const button = document.getElementsByClassName('category-btn')
    console.log(button)
    for(let btn of button){
      btn.classList.remove('active')
    }
  }


  
// Loaded pets by category

const loadCategoryVideos = (encodedCategory) => {
  // Show loading spinner and hide content
  const loadingSection = document.getElementById('loading-section');
  const allItems = document.getElementById('all-items');
  
  loadingSection.style.display = 'block';  
  allItems.style.display = 'none';         

  const decodedCategory = decodeURIComponent(encodedCategory); 

  
  setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${decodedCategory}`)
      .then((res) => res.json())
      .then((data) => {
          // Remove active class
          removeActiveClass();

          const activeBtn = document.getElementById(`btn-${decodedCategory}`);
          activeBtn.classList.add('active');

          displayPets(data.data);

          
          loadingSection.style.display = 'none';
          allItems.style.display = 'block';
      })
      .catch((err) => {
          console.log(err);
          // Hide spinner and show content in case of error
          loadingSection.style.display = 'none';
          allItems.style.display = 'block';
      });
  }, 2000); 
};




 
  const loadDetails = async (petId) =>{
     const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
     const res = await fetch(uri)
     const data = await res.json()
     displayDetails(data.petData) 

  }

  
  //display detais
  const displayDetails = (detais) =>{
      const modalContainer = document.getElementById('modal-content')
      modalContainer.innerHTML = `
          <div class="card bg-base-100 w-full shadow-xl">
            <figure class="px-10 pt-10">
              <img
                src="${detais.image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-mainblack text-2xl font-bold">${detais.pet_name}</h2>

              <div class="flex justify-between">
                <div>

                  <div class="flex items-center gap-x-2 text-gray-500">
                    <i class="fa-solid fa-grip"></i>
                    <p>Breed: ${detais.breed ? detais.breed : 'N/A'} </p>
                  </div>

                  <div class="flex items-center gap-x-2 text-gray-500">
                    <i class="fa-solid fa-transgender"></i>
                    <p>Gender:${detais.gender ? detais.gender: 'N/A' }</p>
                  </div>

                  <div class="flex items-center gap-x-2 text-gray-500">
                    <i class="fa-solid fa-transgender"></i>
                    <p>Vaccinated Status:${detais.vaccinated_status ? detais.vaccinated_status: 'N/A' }</p>
                  </div>

                </div>

                <div>

                  <div class="flex items-center gap-x-2 text-gray-500">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>Brith: ${detais.date_of_birth ? detais.date_of_birth : 'N/A' }</p>
                  </div>

                  <div class="flex items-center gap-x-2 text-gray-500">
                    <i class="fa-solid fa-dollar-sign "></i>
                    <p>Price:${detais.price ? detais.price : 'N/A'}</p>
                  </div>

                </div>
              </div>

             
              <div class="divider"></div>
              
              <div>
                <h3 class="font-bold text-xl text-mainblack">
                    Details Information
                </h3>
                <p class="text-gray-500 py-2">
                  ${detais.pet_details}
                </p>
              </div>

              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="w-full py-2 bg-emerald-100 text-primary font-bold rounded-lg">Cancel</button>
              </form>
              
            </div>
          </div>
      `
      document.getElementById('my_modal_5').showModal();
  }


  //Load single  Images
  const loadImages = async (images,button) =>{
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${images}`
     const res = await fetch(uri)
     const data = await res.json()
     displayImages(data.petData) 

     const icon = button.querySelector('i');
      button.classList.toggle('liked');
     icon.style.animation = 'bounce 0.5s';
 
     
     setTimeout(() => {
         icon.style.animation = '';
     }, 500);
  } 
  
  const displayImages = (imagesItems) =>{
    const imageContainer = document.getElementById('images-container');
    const singleImage = document.createElement('div')
    singleImage.innerHTML = `
               
                  <img class="mx-auto rounded-lg" src="${imagesItems.image}" alt="">
                
    `
    imageContainer.append(singleImage)
  }

  let intervalId = ""; 

  let closePopup = () => {
    let modal = document.getElementById('my_modal_2');
    modal.close();
    modal.style.display = "none";

    clearInterval(intervalId);
  }

  //Show adapt modal

  const adapt = () =>{
    const modal = document.getElementById('my_modal_2');
    modal.style.display = 'block'
    modal.showModal();

    let num = 3;
    const time = document.getElementById('time')
    time.innerText = num;

    clearInterval(intervalId);

    intervalId = setInterval(function () {
      num--;
      time.innerText = num;
  
      if (num <= 0) {
        clearInterval(intervalId); 
      }
    }, 700);

    setTimeout(function () {
      closePopup();
    }, 2000);

  }

  let isPriceSortedDescending = false;

// Load and display pets
const loadPeads = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => {
        let pets = data.pets;

        // Sort pets before displaying
        pets = sortByPrice(pets);
        displayPets(pets);
    })
    .catch((err) => console.log(err))
};

// Sort pets array by price (descending or ascending based on the toggle)
const sortByPrice = (pets) => {
  return pets.sort((a, b) => {
      const priceA = parseFloat(a.price) || 0; // handle cases where price is null or undefined
      const priceB = parseFloat(b.price) || 0;

      return isPriceSortedDescending ? priceB - priceA : priceA - priceB;
  });
};


// Display pets with the sorted order
const displayPets = (pets) => {
  const petContainer = document.getElementById('pets-container');
  petContainer.innerHTML = '';

  if (pets.length === 0) {
      petContainer.classList.remove('grid');
      petContainer.innerHTML = `
        <section class="bg-gray-100 rounded-2xl p-10 text-center m-5">
        <img class="mx-auto w-[120px]" src="assests/error.webp" alt="">
        <h3 class="text-2xl text-mainblack font-bold py-2">No Information Available</h3>
        <p class="text-base text-black">No Pet Found in this category</p>
      </section>
      `;
      return;
  }

  petContainer.classList.add('grid');
  pets.forEach((pet) => {
      const newPets = document.createElement('div');
      newPets.innerHTML = `
          <div class="card bg-base-100 w-full shadow-xl">
              <figure class="px-10 pt-10">
                  <img src="${pet.image}" alt="Shoes" class="rounded-xl" />
              </figure>
              <div class="card-body">
                  <h2 class="card-title text-mainblack text-2xl font-bold">${pet.pet_name}</h2>
                  <div class="flex items-center gap-x-2 text-gray-500">
                      <i class="fa-solid fa-grip"></i>
                      <p>Breed: ${pet.breed ? pet.breed : 'N/A'}</p>
                  </div>
                  <div class="flex items-center gap-x-2 text-gray-500">
                      <i class="fa-solid fa-calendar-days"></i>
                      <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'N/A'}</p>
                  </div>
                  <div class="flex items-center gap-x-2 text-gray-500">
                      <i class="fa-solid fa-transgender"></i>
                      <p>Gender: ${pet.gender ? pet.gender : 'N/A'}</p>
                  </div>
                  <div class="flex items-center gap-x-2 text-gray-500">
                      <i class="fa-solid fa-dollar-sign"></i>
                      <p>Price: ${pet.price ? pet.price : 'N/A'}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="card-actions">
                      <div>
                          <button onclick="loadImages(${pet.petId}, this)" class="text-md m-2 px-2 py-1 border rounded-lg text-gray-600 bg-white font-bold">
                              <i class="fa-solid fa-thumbs-up"></i>
                          </button>
                          <button onclick="adapt()" class="text-md m-2 px-2 py-1 border rounded-lg text-primary font-bold">Adopt</button>
                          <button onclick="loadDetails(${pet.petId})" class="text-md m-2 px-2 py-1 border rounded-lg text-primary font-bold">Details</button>
                      </div>
                  </div>
              </div>
          </div>
      `;
      petContainer.append(newPets);
  });
};

// Sort pets on button click
document.getElementById('sort-price-btn').addEventListener('click', () => {
  isPriceSortedDescending = !isPriceSortedDescending; // Toggle the sorting direction
  loadPeads(); // Reload and sort pets
});


loadPeads();

  

  loadCategory()
 