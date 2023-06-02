var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice=document.getElementById("coursePrice");
var courseDescription=document.getElementById("courseDescription");
var courseCapacity=document.getElementById("courseCapacity");
var addBtn = document.getElementById("click");
var clrBtn = document.getElementById("restart");
var data = document.getElementById("data");
var search = document.getElementById("search");
var courses =[];
var currentIndex = 0;
var isNameValid = false;
var isCatigoryValid = false;
var isPriceValid = false;
var isDesValid = false;
var isCapacityValid = false;
var ubdate = document.getElementById("ubdate");
ubdate.style.display = "none";
if(JSON.parse(localStorage.getItem("courses")) == null){
    courses = [];
}else{
    courses = JSON.parse(localStorage.getItem("courses"));
}
document.querySelectorAll('input')[0].innerText='sds';
displayData();
checkInputs();
function checkInputs(){
    if(isNameValid&&isCatigoryValid&&isPriceValid&&isDesValid&&isCapacityValid){
        addBtn.removeAttribute("disabled");

    }
    else{
        addBtn.setAttribute("disabled","disabled");
    }
}
function checkForUpdate(){
    if(isNameValid&&isCatigoryValid&&isPriceValid&&isDesValid&&isCapacityValid){
       ubdate.removeAttribute("disabled");
    }
    else{
        ubdate.setAttribute("disabled","disabled");
    }
}



addBtn.onclick = function(e){
    e.preventDefault();
    addCourse();
    resetInput();
    checkInputs();
    displayData();
  
}

clrBtn.onclick = function(){
    
    resetInput();
    checkInputs();
    checkForUpdate();
}

//create course

function addCourse(){
    var course = {
        courseName : courseName.value,
        courseCategory : courseCategory.value,
        coursePrice :coursePrice.value,
        courseDescription : courseDescription.value,
        courseCapacity : courseCapacity.value
    }
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course added successfully',
        showConfirmButton: false,
        timer: 1500
      })   
}

//reset input

function resetInput(){
    courseName.value = "";
    courseCategory.value = "";
    coursePrice.value = "";
    courseDescription.value = "";
    courseCapacity.value = "";
    isNameValid = false;
    isCatigoryValid = false;
    isPriceValid=false;
    isDesValid=false;
    isCapacityValid=false;
    courseName.classList.remove("is-valid");
    courseCategory.classList.remove("is-valid");
    coursePrice.classList.remove("is-valid");
    courseDescription.classList.remove("is-valid");
    courseCapacity.classList.remove("is-valid");
}

//read data

function displayData(){
    var result = ``;
    for(var i=0 ; i<courses.length;i++){
        result += `
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].courseName}</td>
            <td>${courses[i].courseCategory}</td>
            <td>${courses[i].coursePrice}</td>
            <td>${courses[i].courseDescription}</td>
            <td>${courses[i].courseCapacity}</td>
            <td><button class = "btn btn-info" onclick="getCourse(${i})">Update</button></td>
            <td><button class = "btn btn-danger" onclick="deleteCourse(${i})" >Delete</button></td>
        </tr>
        `
        data.innerHTML = result;
    }
    
}

//delete course

function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem("courses",JSON.stringify(courses));
            displayData();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
          )
        }
      })
    
}

//delete all

document.getElementById("deleteBtn").onclick = function deleteAll(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",JSON.stringify(courses));
            displayData(); // or data.innerHTML =``;
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
          )
        }
      })
    
}

//search

search.onkeyup = function(){
    var result =`` ;
    for(var i=0;i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
            result += `
            <tr>
                <td>${i+1}</td>
                <td>${courses[i].courseName}</td>
                <td>${courses[i].courseCategory}</td>
                <td>${courses[i].coursePrice}</td>
                <td>${courses[i].courseDescription}</td>
                <td>${courses[i].courseCapacity}</td>
                <td><button class = "btn btn-info" onclick="getCourse(${i})">Ubdate</button></td>
                <td><button class = "btn btn-danger" onclick="deleteCourse(${i})" >Delete</button></td>
            </tr>
            `
        }
        data.innerHTML = result;
    }
    // data.innerHTML = result; ليش مش برا اللوب هاد السطر 
    
}

//Ubdate
function getCourse(index){
    isNameValid =true;
    isCatigoryValid=true;
    isPriceValid=true;
    isDesValid=true;
    isCapacityValid=true;
    console.log(index);
    currentIndex = index;
    var course = courses[index];
    console.log(course);
    courseName.value = course.courseName;
    courseCategory.value = course.courseCategory;
    coursePrice.value = course.coursePrice;
    courseDescription.value = course.courseDescription;
    courseCapacity.value = course.courseCapacity;
    ubdate.style.display = "inline";
    addBtn.style.display = "none";
    checkForUpdate();    
}

ubdate.onclick = function(e){
    e.preventDefault();
    ubdateCourse();
    displayData();
    ubdate.style.display = "none";
    addBtn.style.display = "inline";
    resetInput();
    checkInputs()
}

function ubdateCourse(){
    var course = {
        courseName : courseName.value,
        courseCategory : courseCategory.value,
        coursePrice : coursePrice.value,
        courseDescription : courseDescription.value,
        courseCapacity : courseCapacity.value,
    }
    var prevName= courses[currentIndex].courseName;
    courses[currentIndex].courseName = course.courseName;
    courses[currentIndex].courseCategory = course.courseCategory;
    courses[currentIndex].coursePrice = course.coursePrice;
    courses[currentIndex].courseDescription = course.courseDescription;
    courses[currentIndex].courseCapacity = course.courseCapacity;
    localStorage.setItem("courses",JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${prevName} Updated successfully`,
        showConfirmButton: false,
        timer: 1500
      })  
}

//validation

/**
 * name
 * start with capital
 * 3-10
 * no numbers
 * regex /^[A-Z][a-z]{2,10}$/
 */
var nameAlert = document.getElementById("nameAlert");
// nameAlert.style.display = "none";
courseName.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,10}$/;
    if(pattern.test(courseName.value)){
        isNameValid = true;
        if(courseName.classList.contains("is-invalid")){
            courseName.classList.replace("is-invalid","is-valid");
        }
        courseName.classList.add("is-valid");

        if(nameAlert.classList.contains("d-block")){
            nameAlert.classList.replace("d-block","d-none")
        }
        nameAlert.classList.add("d-none");
        // nameAlert.style.display = "none";
    }else{
        isNameValid = false;
        // nameAlert.style.display = "block";
        if(courseName.classList.contains("is-valid")){
            courseName.classList.replace("is-valid","is-invalid");
        }
        courseName.classList.add("is-invalid");

        if(nameAlert.classList.contains("d-none")){
            nameAlert.classList.replace("d-none","d-block")
        }
        nameAlert.classList.add("d-block");
    }
    checkInputs();
    checkForUpdate();
}

/**
 * category
 * start with capital
 * 3-20
 * no numbers
 * regex /^[A-Z][a-z]{2,20}$/
 */

var catAlert = document.getElementById("catAlert");
catAlert.style.display="none";

courseCategory.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,20}$/;
    if(pattern.test(courseCategory.value)){
        isCatigoryValid = true;
        catAlert.style.display="none";
        if(courseCategory.classList.contains("is-invalid")){
            courseCategory.classList.replace("is-invalid","is-valid");
        }
        courseCategory.classList.add("is-valid");
    }else{
        isCatigoryValid = false;
        catAlert.style.display="block";
        if(courseCategory.classList.contains("is-valid")){
            courseCategory.classList.replace("is-valid","is-invalid");
        }
        courseCategory.classList.add("is-invalid");
    }
    checkInputs();
    checkForUpdate();
}


/**
 * price
 * 3-4
 * numbers
 * regex /^[0-9]{3,4}$/
 */

var priceAlert = document.getElementById("priceAlert");
// priceAlert.style.display = "none";
coursePrice.onkeyup = function(){
    var pattern = /^[0-9]{3,4}$/;
    if(pattern.test(coursePrice.value) && coursePrice.value>=100){
        isPriceValid = true;
        // priceAlert.style.display = "none";
        priceAlert.innerHTML = ""
        if(coursePrice.classList.contains("is-invalid")){
            coursePrice.classList.replace("is-invalid","is-valid");
        }
        coursePrice.classList.add("is-valid");
    }else{
        isPriceValid = false;
        // priceAlert.style.display = "block";
        priceAlert.innerHTML = "*Please enter number from 100 to 9999"
        if(coursePrice.classList.contains("is-valid")){
            coursePrice.classList.replace("is-valid","is-invalid");
        }
        coursePrice.classList.add("is-invalid");
    }
    checkInputs();
    checkForUpdate();
}


/**
 * category
 * start with capital
 * 3-120
 * no numbers
 * regex /^[A-Z][A-Za-z0-9\s]{2,120}$/
 */
var desAlert=document.getElementById("desAlert");
courseDescription.onkeyup = function(){
    var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/;
    if(pattern.test(courseDescription.value)){
        isDesValid = true;
        desAlert.innerHTML = "";
        if(courseDescription.classList.contains("is-invalid")){
            courseDescription.classList.replace("is-invalid","is-valid");
        }
        courseDescription.classList.add("is-valid");
    }else{
        isDesValid = false;
        desAlert.innerHTML="*Please enter chars, numbers from 3 to 120 start with capital letter"
        if(courseDescription.classList.contains("is-valid")){
            courseDescription.classList.replace("is-valid","is-invalid");
        }
        courseDescription.classList.add("is-invalid");
    }
    checkInputs();
    checkForUpdate();
}

/**
 * capacity
 * 2-3
 * numbers
 * regex /^[0-9]{2,3}$/
 */
var capAlert=document.getElementById("capAlert");
courseCapacity.onkeyup = function(){
    var pattern = /^[0-9]{2,3}$/;
    if(pattern.test(courseCapacity.value) && courseCapacity.value>=10){
        isCapacityValid = true;
        capAlert.innerHTML="";
        if(courseCapacity.classList.contains("is-invalid")){
            courseCapacity.classList.replace("is-invalid","is-valid");
        }
        courseCapacity.classList.add("is-valid");
    }else{
        isCapacityValid = false;
        capAlert.innerHTML="*Please enter numbers between 10 to 999";
        if(courseCapacity.classList.contains("is-valid")){
            courseCapacity.classList.replace("is-valid","is-invalid");
        }
        courseCapacity.classList.add("is-invalid");
    }
    checkInputs();
    checkForUpdate();
}