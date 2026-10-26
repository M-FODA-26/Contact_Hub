let lightContainer = document.getElementById('lightContainer')
let closeX = document.getElementById('closeX')
let rowData=document.getElementById('rowData')
let update=document.getElementById('update') 
let save=document.getElementById('save')

let totalContact = document.getElementById('totalContact')
let favCount = document.getElementById('favCount')
let emergCount = document.getElementById('emergCount')


let img = document.getElementById('img')
let fullName = document.getElementById('fullName')
let phone = document.getElementById('phone')
let email = document.getElementById('email')
let address = document.getElementById('address')
let groub = document.getElementById('groub')
let notes = document.getElementById('notes')
let favoritesChecked = document.getElementById('favoritesChecked')
let emergencyChecked = document.getElementById('emergencyChecked')
let favSection=document.getElementById('favSection')
let emergSection=document.getElementById('emergSection')


let contactList =JSON.parse(localStorage.getItem('contacts')) ||[]
let favoriteList=JSON.parse(localStorage.getItem('favorite'))||[]
let emergencyList=JSON.parse(localStorage.getItem('emergency'))||[]
let searchList=[]
displayContact()
displayFavorites()
displayEmergency()

let imgUpdate=''
let updatePhone=''





function setproduct() {
  lightContainer.classList.remove('d-none')

}


function addContact() { 
  if (validation(fullName) && validation(phone) && validation(email) && !isDuplicate(phone.value)) {
   let imgName = ''
    if (img.files.length === 0) {
      let names = fullName.value.trim().split(" ")
      let first = names[0][0].toUpperCase()
      let last = names[names.length - 1][0].toUpperCase()
      imgName = first + last


    }
    else {
      imgName =`./images/${img.files[0].name}`
    }
    let contact = {
      img: imgName,
      fullName: fullName.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      address: address.value,
      groub: groub.value,
      notes: notes.value,
      favoritesChecked: favoritesChecked.checked,
      emergencyChecked: emergencyChecked.checked


    }
    contactList.push(contact)
    console.log(contactList);
    saveLocal('contacts', contactList)



    if(contact.favoritesChecked){
      favoriteList.push(contact)
      saveLocal('favorite', favoriteList)
      displayFavorites()
    }

     if(contact.emergencyChecked){
      emergencyList.push(contact)
      saveLocal('emergency', emergencyList)
      displayEmergency()
    }

    displayContact()

    clear()
    close()

console.log(imgName);

  }



}

function displayContact (){
  if(contactList.length===0){
 rowData.innerHTML=` <div class="row" id="rowData">
                   <div class="no-found col-md-12 d-flex flex-column align-items-center  ">
                  <div class="d-flex align-items-center justify-content-center icon"><i class="fa-solid fa-address-book"></i></div>
                  <p class=" m-0 one"> No contacts found</p>
                  <p class="two">Click "Add Contact" to get started</p></div>
`
return;
  }
  let cartona=''
  for (let index = 0; index < contactList.length; index++) {
    let contact = contactList[index];
    cartona+=`<div class="col-md-6 mb-3 ">
                  <div class="call rounded-4">
                    <div class="bg-white p-3 rounded-top-4">
                      <div class="d-flex column-gap-3">
                        <!-- image -->
                        <div class="position-relative images">
                          <span class="position-absolute heart d-none" id="fav">
                            <i class="fa-solid fa-heart-pulse text-white"></i
                          ></span>
                          <span class="position-absolute star d-none" id="emerg"
                            ><i class="fa-solid fa-star text-white"></i
                          ></span>
                         ${contact.img.includes('/') ? `<img src=${contact.img} class='w-100 rounded-3'/>` : contact.img}
                        </div>
                        <div>
                          <h5 class="name">${contact.fullName}</h5>
                          <p class="number text-secondary fw-semibold">
                            <span><i class="fa-solid fa-phone me-1"></i></span>
                          ${contact.phone}
                          </p>
                        </div>
                      </div>
                      <!-- email -->
                      <div class="d-flex align-items-center email pt-3">
                        <div></div>
                        <p class="text-secondary email-text">
                          <span class="email-icon me-2"
                            ><i class="fa-solid fa-envelope"></i
                          ></span>
                          ${contact.email}
                        </p>
                      </div>
                      <div class="d-flex align-items-center location">
                        <div></div>
                        <p class="text-secondary loc-text m-0 mb-2">
                          <span class="loc-icon me-2"
                            ><i class="fa-solid fa-location-dot"></i
                          ></span>
                          ${contact.address}
                        </p>
                      </div>
                      <div>
                        <span class="${contact.groub} ">${contact.groub}</span>
                       

                        <span class="emergen"
                          ><i class="fa-solid fa-heart-pulse"></i>
                          Emergency</span
                        >
                      </div>
                    </div>
                    <div class="bottom-conect p-3 rounded-bottom-4">
                      <div class="d-flex align-items-center">
                        <div class="conect-email">
                          <a href="tel" class="tel"
                            ><i class="fa-solid fa-phone"></i
                          ></a>
                          <a href="mailto" class="ms-2 mailto"
                            ><i class="fa-solid fa-envelope"></i
                          ></a>
                        </div>
                        <div
                          class="d-flex ms-auto column-gap-3 conection align-items-center "
                        >
                        ${contact.favoritesChecked ?` <div class="star-1 " onclick='remove(${contact.phone},this)'>
                            <i class="fa-solid fa-star"></i>

                          </div>`:` <div class="star" onclick='addToFav(${contact.phone},this)'>
                            <i class="fa-regular fa-star"></i>

                          </div>`}
                         ${contact.emergencyChecked ? `<div class="heart-1 " onclick='removeEmergency(${contact.phone},this)'>
                            <i class="fa-solid fa-heart-pulse"></i>
                          </div>`: `<div class="heart" onclick='addToEmergency(${contact.phone},this)'>
                            <i class="fa-regular fa-heart"></i>
                          </div>`}

                         
                          <div class="pen" onclick='getUpdateContact(${contact.phone})'>
                            <i class="fa-solid fa-pencil"></i>
                          </div>
                          
                          <div class="trash" onclick='removeContact(${contact.phone})'>
                            <i class="fa-solid fa-trash"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`
  }
  totalContact.innerHTML=`${contactList.length}`
  rowData.innerHTML=cartona
}
function addToFav(phone,element){
  console.log('1');
  
  let contact=contactList.find((con)=>con.phone==phone)
   contact.favoritesChecked=true
  saveLocal('contacts',contactList)
  displayContact()
  element.classList.add('star-1')
  favoriteList.push(contact)
  saveLocal('favorite',favoriteList)

  displayFavorites()

  
}
function remove(phone,element){
  
  let contact=contactList.find((con)=>con.phone==phone)
   contact.favoritesChecked=false
  saveLocal('contacts',contactList)
  displayContact()

  element.classList.remove('star-1')

  let index=favoriteList.findIndex((fav)=>fav.phone==phone)
  favoriteList.splice(index,1)
  saveLocal('favorite',favoriteList)

  displayFavorites()

}
function addToEmergency(phone,element){
  let contact=contactList.find((con)=>con.phone==phone)
  contact.emergencyChecked=true
  saveLocal('contacts',contactList)
  displayContact()
  element.classList.add('heart-1')
  emergencyList.push(contact)
  saveLocal('emegency',emergencyList)
  displayEmergency()
}
function removeEmergency(phone,element) {
   let contact=contactList.find((con)=>con.phone==phone)
  contact.emergencyChecked=false
  saveLocal('contacts',contactList)
  displayContact()
  element.classList.remove('heart-1')
  let indexOf=emergencyList.findIndex((emerg)=>emerg.phone==phone)
  emergencyList.splice(indexOf,1)
  saveLocal('emegency',emergencyList)
  displayEmergency()
  
}
function removeContact(phone){
  let contactDelet=contactList.filter((con)=>con.phone!=phone)
  contactList=contactDelet
  saveLocal('contacts',contactList)
  displayContact()

  let favAfterDelet=favoriteList.filter((fav)=>fav.phone!=phone)
  favoriteList=favAfterDelet
  saveLocal('favorite',favoriteList)
  displayFavorites()


  let emergAfterDelet=emergencyList.filter((emerg)=>emerg.phone!=phone)
  emergencyList=emergAfterDelet
  saveLocal('emergency',emergencyList)
  displayEmergency()
}
function getUpdateContact(phones){
  lightContainer.classList.remove('d-none')
update.classList.remove('d-none')
save.classList.add('d-none')
  let contact=contactList.find((con)=>con.phone==phones)
  fullName.value=contact.fullName
  phone.value=contact.phone
  email.value=contact.email
  address.value=contact.address
  groub.value=contact.groub
  notes.value=contact.notes
  favoritesChecked.checked=contact.favoritesChecked
  emergencyChecked.checked=contact.emergencyChecked
  imgUpdate=contact.img
  updatePhone=contact.phone

}
function updateContact(){
  let indexContact=contactList.findIndex((con)=>phone==updatePhone)
  let indexOfFav=contactList.findIndex((con)=>phone==updatePhone)
  let indexOfEmerg=contactList.findIndex((con)=>phone==updatePhone)

  if (validation(fullName) && validation(phone) && validation(email) ) {
   let imgName = ''
    if (img.files.length === 0) {
      let isExistImg=imgUpdate.includes('/')
      if(isExistImg){
        imgName=imgUpdate
      }else{let names = fullName.value.trim().split(" ")
      let first = names[0][0].toUpperCase()
      let last = names[names.length - 1][0].toUpperCase()
      imgName = first + last}
      


    }
    else {
      imgName =`./images/${img.files[0].name}`
    }
    let contact = {
      img: imgName,
      fullName: fullName.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      address: address.value,
      groub: groub.value,
      notes: notes.value,
      favoritesChecked: favoritesChecked.checked,
      emergencyChecked: emergencyChecked.checked


    }
    contactList[indexContact]=contact
    saveLocal('contacts',contactList)
    displayContact()


    if (indexOfFav != -1) {
      if (!contact.favoritesChecked) {
        favoriteList.splice(indexOfFav,1)
        saveLocal('favorite',favoriteList)
        displayFavorites()
        
      }
      
    }else{
      if (contact.favoritesChecked) {
        favoriteList.push(contact)
         saveLocal('favorite',favoriteList)
        displayFavorites()
        
      }
    }



        if (indexOfEmerg != -1) {
      if (!contact.emergencyChecked) {
        emergencyList.splice(indexOfEmerg,1)
        saveLocal('emergency',emergencyList)
        displayEmergency()
        
      }
      
    }else{
      if (contact.emergencyChecked) {
        emergencyList.push(contact)
         saveLocal('emergency',emergencyList)
        displayEmergency()
        
      }
    }
    update.classList.add('d-none')
    save.classList.remove('d-none')
    clear()
   close()
  }
}
function displayFavorites(){
  let  section=''
  for (let index = 0; index < favoriteList.length; index++) {
    const fav = favoriteList[index];
    section+=`   <div class="d-flex align-items-center p-2 rounded-3 detal">
                    <div class="image">
                     ${fav.img.includes('/')? `{img surc= ${fav.img} class='w-100 rounded-2'/>}`:fav.img}
                    </div>
                    <div class="px-2">
                      <p class="m-0 fw-semibold">${fav.fullName}</p>
                      <p class="text-secondary m-0 num">${fav.phone}</p>
                    </div>
                    <a href="tel" class="ms-auto"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>`
    
  }
  favCount.innerHTML=`${favoriteList.length}`
  favSection.innerHTML=section
}
function displayEmergency(){
  let section=''
  for (let index = 0; index < emergencyList.length; index++) {
    const emerg = emergencyList[index];
    section+=`            <div
                    class=" d-flex align-items-center p-2 rounded-3 detal-emergency"
                  >
                    <div class="image">
                   ${emerg.img.includes('/')?`<img src=${emerg.img} class='w-100 rounded-2'/>`:emerg.img}
                    </div>
                    <div class="px-2">
                      <p class="m-0 fw-semibold">${emerg.fullName}</p>
                      <p class="text-secondary m-0 num">${emerg.phone}</p>
                    </div>
                    <a href="tel" class="ms-auto"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>`
    
  }

  emergCount.innerHTML=`${emergencyList.length}`
  emergSection.innerHTML=section
}
function saveLocal(key, value) {
  localStorage.setItem('key', JSON.stringify(value))

}


function validation(input) {
  let regex = {
    fullName: /^[\u0621-\u064A a-zA-Z]{3,30}$/,
    phone: /^01[0125][0-9]{8}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  }
  let message = {
    fullName: 'name must be start capital letter and than',
    phone: 'phone must be egyption',
    email: 'email examble:mhmdthfwdh@gmail.com',
  }
  if (input.value === '') {
    Swal.fire({
      title: `missing ${input.id}`,
      text: `please enter a ${input.id} for the contact`,
      icon: "error"
    });
    return false
  }
  if (!regex[input.id].test(input.value)) {

    Swal.fire({
      title: `invalid ${input.id}`,
      text: `${message[input.id]}`,
      icon: "error"
    });
    return false
  }
  return true

}
function isDuplicate(phoneNumber) {
  let isDuplicate = contactList.find((con) =>con&& con.phone == phoneNumber)
  if (Boolean(isDuplicate)) {
    Swal.fire({
      title: `duplicate phon`,
      text: 'enter new phone number',
      icon: "error"
    });
  }
  return Boolean(isDuplicate)
}
function clear() {
  fullName.value = ''
    phone.value = ''
    email.value = ''
    address.value = ''
    notes.value = ''
    groub.value = ''
    favoritesChecked.checked = false
    emergencyChecked.checked = false
}
function close() {
  lightContainer.classList.add("d-none")

}
function closeModel() {
  lightContainer.classList.add("d-none")
  console.log('false');
  

}