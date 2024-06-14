var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var dataWrapper = document.getElementById("tBody");
var updateBtn = document.getElementById('updateBtn');
var searchInput = document.getElementById('search');
//console.log(siteNameInput);
//console.log(siteUrlInput);
var allbookMarks = [];
var BookMarkToBeUpdated;
console.log(updateBtn);

if (localStorage.getItem("userData")) {  ///////////////////////////////////////////////////
  allbookMarks = JSON.parse(localStorage.getItem("userData"));
  displayData(allbookMarks)
}



// //updateBtn.addEventListener('click', function addBookMark () {   // update & add 
// console.log("addBookMark");
// var newBookMark = {

//   siteName: siteNameInput.value,
//   siteUrl: siteUrlInput.value,
// };
// allbookMarks.push(newBookMark);
// localStorage.setItem('allBookMarks', JSON.stringify(allbookMarks));
// console.log(allbookMarks);
// displayData(allbookMarks)
//  })


function diplayUpdateBtn() {
  document.getElementById("submitBtn").classList.replace('d-none', 'd-block');
  document.getElementById("updateBtn").classList.replace('d-block', 'd-none');
}


var addBookMark; /////////////////////

document.getElementById('submitBtn').addEventListener("click", function (e) {   // update & add 
  //validateUrl()
  if (validateUrl() == true && siteNameInput.value != "") {


    console.log("addBookMark");
    var newBookMark = {

      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    console.log(newBookMark);

    allbookMarks.push(newBookMark);
    localStorage.setItem('userData', JSON.stringify(allbookMarks));
    console.log(allbookMarks);
    displayData(allbookMarks);
    // clearInputs()
  } else {
    //alert('not valid')

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${siteNameInput.value == "" ? "please enter site name" : " "} ${validateUrl() == true ? "" : "A nd enter valid url"}`,
      footer: '<a href="#">Why do I have this issue?</a>'
    });

  }
})



function displayData(arr) {
  var cartoona = `
    `;

  for (var i = 0; i < arr.length; i++) {
    cartoona += ` 
<tr>
<td> ${i + 1}</td>  
<td> ${arr[i].siteName}</td>
<td> <a class="btn btn-primary" href= "${arr[i].siteUrl}" target="-blank" >visit</a></td>
<td> <button class="btn btn-success"  onclick="preupdate(${i})">update</button></td>
<td> <button class="btn btn-danger"   onclick="deleteBookMark(${i})"> Delete</button></td>
</tr>
` ;
  }

  dataWrapper.innerHTML = cartoona

}



submitBtn.addEventListener('click', function () {
  console.log("hello");

})



function preupdate(index) {
  addBookMarkToUpdated = index
  siteNameInput.value = allbookMarks[index].siteName;
  siteUrlInput.value = allbookMarks[index].siteUrl;
  displayUpdateBtn()
  console.log(BookMarkToBeUpdated);
}


function displayUpdateBtn() {
  document.getElementById("submitBtn").classList.replace('d-block','d-none');
  document.getElementById("updateBtn").classList.replace('d-none','d-block');

}

function displaysubmitBtn() {
  document.getElementById("submitBtn").classList.replace('d-none','d-block');
  document.getElementById("updateBtn").classList.replace('d-block','d-none');

}

function finalUpdate() {
  var newBookBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value
  };
  allbookMarks.splice(BookMarkToBeUpdated, 1, newBookBookMark)
  localStorage.setItem('allBookMarks', JSON.stringify(allbookMarks));
  displayData(allbookMarks);
  displaysubmitBtn()
  clearInputs()
}
function deleteBookMark(index) {
  allbookMarks.splice(index, 1);
  localStorage.setItem('userData', JSON.stringify(allbookMarks));
  displayData(allbookMarks)
}
function clearInputs() {
  siteNameInput.value = ''
  siteUrlInput.value = ''
}

/*
searchInput.addEventListener('input',function(e){
  console.log(e.target.value); 
  var result=[];
for(var i=0;i<allbookMarks.length;i++){
if(allbookMarks[i].siteName.tolowercase().include(e.target.value.tolowercase())){

result.push(allbookMarks[i])

}
}
displayData (result);
})
*/
searchInput.addEventListener('input', function (e) {
  console.log(allbookMarks[0].siteName.toLowerCase().includes(e.target.value.toLowerCase()));
  var resultOfSearch = [] 

  for (var i = 0; i < allbookMarks.length; i++) {

    if (allbookMarks[i].siteName.toLowerCase().includes(e.target.value.toLowerCase())) {
      console.log(allbookMarks[i]);
      resultOfSearch.push(allbookMarks[i])



    }
  }
  displayData(resultOfSearch)
})
// ''.includes(''.toLowerCase)

function validateUrl() {

  var pattern = /^(fttp|https|http):\/$/; 
  

  console.log(pattern.test(siteUrlInput.value));
  return pattern.test(siteUrlInput.value);

}
