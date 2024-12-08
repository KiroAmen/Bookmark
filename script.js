var websiteName = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("websiteUrl");
var submitBtn = document.querySelector("#submitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var myData = document.querySelector("#myData");
var rows = [];

if (localStorage.getItem("rows") != null) {
  rows = JSON.parse(localStorage.getItem("rows"));
  displayRow();
}

// ************************************** Validation **************************************
function validateWebsiteName() {
  var regex1 = /^[A-Za-z]{3,}$/gm;
  var regex2 = /^[0-9]{3,}$/gm;

  if (regex1.test(websiteName.value)) {
    websiteName.classList.add("is-valid");
    websiteName.classList.remove("is-invalid");
    return true;
  } else if (regex2.test(websiteName.value)) {
    websiteName.classList.add("is-valid");
    websiteName.classList.remove("is-invalid");
    return true;
  } else {
    websiteName.classList.remove("is-valid");
    websiteName.classList.add("is-invalid");
    return false;
  }
}

function validateWebsiteUrl() {
  var regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})/gm;

  if (regex.test(websiteUrl.value)) {
    websiteUrl.classList.add("is-valid");
    websiteUrl.classList.remove("is-invalid");
    return true;
  } else {
    websiteUrl.classList.remove("is-valid");
    websiteUrl.classList.add("is-invalid");
    return false;
  }
}

function createRow() {
  if ((validateWebsiteName() == true, validateWebsiteUrl() == true)) {
    var website = {
      name: websiteName.value,
      url: websiteUrl.value,
    };
    rows.push(website);
    displayRow();
    addToLocalStorage();
    clearForm();
  }
}

function displayRow() {
  var cartona = "";
  for (var i = 0; i < rows.length; i++) {
    var currentIndex = rows.indexOf(rows[i]);
    cartona += `<tr>
          <td>${currentIndex + 1}</td>
          <td style="font-weight: 400;">${rows[i].name}</td>
          <td>
            <a target="_blank" class="btn text-white visit-hover" href="${
              rows[i].url
            }">
              <i class="fa-solid fa-eye me-2" style="color: #ffffff"></i>
              Visit
            </a>
          </td>
          <td>
            <button
              class="btn text-white delete-hover my-2"
              onclick="deleteRow(${i})"
              id="deleteBtn"
            >
              <i class="fa-solid fa-trash-can me-1" style="color: #ffffff"></i>
              Delete
            </button>
          </td>
        </tr>`;
  }

  myData.innerHTML = cartona;
}

submitBtn.addEventListener("click", function () {
  createRow();
});

//Add to Local Storage
function addToLocalStorage() {
  localStorage.setItem("rows", JSON.stringify(rows));
}

//Delete Row
function deleteRow(index) {
  rows.splice(index, 1);
  localStorage.setItem("rows", JSON.stringify(rows));
  displayRow();
}

//Clear Inputs
function clearForm() {
  websiteName.value = "";
  websiteUrl.value = "";
  websiteName.classList.remove("is-valid")
  websiteUrl.classList.remove("is-valid")
}
