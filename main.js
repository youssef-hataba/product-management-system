const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
const searchbtn = document.getElementById('search');

let mood = 'create';
let searchMood = '';
let temp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        if (+total.innerHTML < 0) {
            total.classList.add('error');
            total.style.backgroundColor = 'rgb(171, 0, 0)';
        } else {
            total.classList.remove('error');
            total.style.backgroundColor = 'green';
        }
    } else {
        total.innerHTML = '';
    }
}

let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.product);
} else {
    data = [];
}

submit.onclick = function () {
    let newdata = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && count.value != '' && count.value <= 100 && category.value != '') {
        if (mood === 'create') {
            if (newdata.count > 1) {
                for (let i = 0; i < newdata.count; i++) {
                    data.push(newdata);
                }
            } else {
                data.push(newdata);
            }
        } else {
            data[temp] = newdata;
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            mood = 'create';
            total.style.backgroundColor = 'rgb(171, 0, 0)';
        }
        clearData();
    }


    localStorage.setItem('product', JSON.stringify(data));
    showData();
    total.style.backgroundColor = 'rgb(171, 0, 0)';
}


function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let deleteAllBtn = document.getElementById('deleteAll');
    if (data.length > 0) {
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${data.length})</button>`;
    } else {
        deleteAllBtn.innerHTML = ``;
    }
    getTotal();
}

function deleteData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showData();
}

function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData();
}

function updateData(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    getTotal();
    category.value = data[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

function getSearchMood(type) {
    if (type == 'title') {
        searchMood = 'title';
        searchbtn.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        searchbtn.placeholder = 'Search By Category';
    }
    searchbtn.focus();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < data.length; i++) {
        if (searchMood == 'title') {
            if (data[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        } else {
            if (data[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

showData();