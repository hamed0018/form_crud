"use strict";
// select element
const nameInpit = document.getElementById("name");
const familyInpit = document.getElementById("family");
const ageInpit = document.getElementById("age");
const btnSubmit = document.getElementById("btn-submit");
const bodyTable = document.getElementById("tbody");
const form = document.getElementById("form");
const btnsort = document.getElementById('sort');
// create global var
let sort = true;
const listUsers = [];
const newListUser = listUsers;
let editemode = null;
// create function
const handelsubmit = () => {
    if (editemode) {
        const edit = listUsers.find((item) => item.id === editemode);
        edit.name = nameInpit.value;
        edit.family = familyInpit.value;
        edit.age = ageInpit.value;
        editemode = null;
        renderUi(listUsers);
        form.reset();
    }
    else {
        const users = {
            name: nameInpit.value,
            family: familyInpit.value,
            age: ageInpit.value,
            id: `${listUsers.length}`,
        };
        listUsers.push(users);
        renderUi(listUsers);
        form.reset();
    }
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    handelsubmit();
});
const handeldelet = (id) => {
    const filter = listUsers.filter((item) => item.id !== id);
    renderUi(filter);
};
const handelEdite = (id) => {
    editemode = id;
    const edit = listUsers.find((item) => item.id === id);
    nameInpit.value = edit.name;
    familyInpit.value = edit.family;
    ageInpit.value = edit.age;
};
const renderUi = (users) => {
    bodyTable.innerHTML = "";
    users.forEach((item) => {
        const trElement = document.createElement("tr");
        const thElement = document.createElement("th");
        const tdElement = document.createElement("td");
        const editelement = document.createElement("i");
        const delletelement = document.createElement("i");
        const nameElement = document.createElement("td");
        const familyElement = document.createElement("td");
        const ageElement = document.createElement("td");
        const divElement = document.createElement('div');
        // thElement?.setAttribute("scope", "row"),
        (thElement.innerHTML = `${item.id}`);
        trElement.appendChild(thElement);
        editelement.setAttribute("class", "fa-regular fa-pen-to-square fa-sm");
        editelement.setAttribute("id", "edit");
        editelement.addEventListener('click', () => handelEdite(item.id));
        delletelement.setAttribute("class", "fa-solid fa-trash-can fa-sm");
        delletelement.setAttribute("id", "delete");
        delletelement.addEventListener("click", () => handeldelet(item.id));
        divElement.append(editelement);
        divElement.append(delletelement);
        divElement.setAttribute('class', "icons");
        tdElement.appendChild(divElement);
        trElement.append(tdElement);
        nameElement.innerText = item.name;
        familyElement.innerText = item.family;
        ageElement.innerText = item.age;
        trElement.append(nameElement, familyElement, ageElement);
        bodyTable === null || bodyTable === void 0 ? void 0 : bodyTable.append(trElement);
    });
};
function compareByName(a, b) {
    return a.name.localeCompare(b.name);
}
btnsort.addEventListener('click', () => {
    if (sort) {
        newListUser.sort(compareByName);
        renderUi(newListUser);
        sort = false;
    }
    else {
        listUsers.reverse();
        renderUi(listUsers);
        sort = true;
    }
});
