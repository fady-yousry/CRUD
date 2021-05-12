//Global Vairiables
let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescInput = document.getElementById("productDescInput");
let submitBtn = document.getElementById("submitBtn");
let updateBtn = document.getElementById("updateBtn");
let productNameAlert = document.getElementById("productNameAlert");
let productPriceAlert = document.getElementById("productPriceAlert");
let productCategoryAlert = document.getElementById("productCategoryAlert");
let productDescAlert = document.getElementById("productDescAlert");
let updateIndex;
let productsContainer;
//End Of Global Variables 

//check if there is any items in local storage , display it 
if (localStorage.getItem("myProducts") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}

function addProduct() {
    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true) {

        let product =
        {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);

        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        clearForm();
        displayProducts();
    }
    else {

        validateProductName() == false && validateProductPrice() == false && validateProductCategory() == false && validateProductDesc() == false;
    }
}

// clear all input values that will be called after add or update product
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescInput.classList.remove("is-valid");
}

function displayProducts() {
    let container = ``;
    for (let i = 1; i < productsContainer.length; i++) {
        container += `
     <tr>
     <td>${i}</td>
     <td>${productsContainer[i].name}</td>
     <td>`+ productsContainer[i].price + `</td>
     <td>${productsContainer[i].category}</td>
     <td>${productsContainer[i].desc}</td>
     <td><button onclick="updateForm(${i})" class="btn btn-outline-warning">Update</button></td>
     <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
     </tr>`;
    }
    document.getElementById("tableBody").innerHTML = container;
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
}

function searchProduct(searchTerm) {
    let container = ``;
    for (let i = 1; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true
            || productsContainer[i].price.includes(searchTerm) == true
            || productsContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true
        ) {
            container += `
                <tr>
                <td>${i}</td>
                <td>${productsContainer[i].name.replace(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1), `<span class="bg-danger text-white">${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}</span>`)}</td>
                <td>${productsContainer[i].price.replace(searchTerm, `<span class="bg-info text-white">${searchTerm}</span>`)}</td>
                <td>${productsContainer[i].category.replace(searchTerm, `<span class="bg-light text-dark">${searchTerm}</span>`)}</td>
                <td>${productsContainer[i].desc}</td>
                <td><button onclick="updateForm(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr>`;
        }
        document.getElementById("tableBody").innerHTML = container;
    }
}

function updateForm(productIndex) {
    productNameInput.value = productsContainer[productIndex].name;
    productPriceInput.value = productsContainer[productIndex].price;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescInput.value = productsContainer[productIndex].desc;
    updateIndex = productIndex;
    updateBtn.style.display = "block";
    submitBtn.style.display = "none";
    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true) {
        productNameInput.classList.remove("is-invalid");
        productPriceInput.classList.remove("is-invalid");
        productCategoryInput.classList.remove("is-invalid");
        productDescInput.classList.remove("is-invalid");
    }
}

function updateProduct(updateIndex) {
    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true) {
        let updatedProduct = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.splice(updateIndex, 1, updatedProduct);
        localStorage.setItem("myProducts", JSON.stringify(productsContainer));
        displayProducts();
        clearForm();
    }
    else {
        validateProductName() == false || validateProductPrice() == false || validateProductCategory() == false || validateProductDesc() == false;

    }
}

updateBtn.addEventListener("click", function () {

    if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true) {
        updateProduct(updateIndex);
        updateBtn.style.display = "none";
        submitBtn.style.display = "block";

    }
});

submitBtn.addEventListener("click", function () {

    addProduct();
});

// validation

function validateProductName() {
    let regex = /^[A-Z][A-za-z0-9]{3,15}$/;
    if (regex.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        productNameAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
productNameInput.addEventListener("keyup", validateProductName);

function validateProductPrice() {
    let regex = /^[0-9]{2,6}$/;
    if (regex.test(productPriceInput.value) == true) {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        productPriceAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        productPriceAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
productPriceInput.addEventListener("keyup", validateProductPrice);

function validateProductCategory() {
    let regex = /^[A-Za-z ]{3,10}$/;
    if (regex.test(productCategoryInput.value) == true) {
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        productCategoryAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        productCategoryAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
productCategoryInput.addEventListener("keyup", validateProductCategory);

function validateProductDesc() {
    let regex = /^[A-za-z0-9 ]{3,100}$/;
    if (regex.test(productDescInput.value) == true) {
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        productDescAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        productDescAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
productDescInput.addEventListener("keyup", validateProductDesc);
