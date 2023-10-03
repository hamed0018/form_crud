// select element
const nameInpit = <HTMLInputElement>document.getElementById("name");
const familyInpit = <HTMLInputElement>document.getElementById("family");
const ageInpit = <HTMLInputElement>document.getElementById("age");
const btnSubmit = <HTMLButtonElement>document.getElementById("btn-submit");
const bodyTable = <HTMLTableElement>document.getElementById("tbody");
const form = <HTMLFormElement>document.getElementById("form");

// create type
type objuser = {
  id: string;
  name: string;
  family: string;
  age: string;
};
// create global var
let sort : boolean = true ;
const listUsers: objuser[] = [];
const newListUser : objuser[] = listUsers
let editemode: string | null = null;
// create function
const handelsubmit = ()=>{
    if(editemode){
        const edit = listUsers.find((item)=>item.id === editemode)!
        edit.name = nameInpit.value
        edit.family = familyInpit.value
        edit.age = ageInpit.value
        editemode = null
        renderUi(listUsers)
        form.reset()
        
    }
    else{
        const  users : objuser= {
        name : nameInpit.value ,
        family : familyInpit.value,
        age : ageInpit.value,
        id : `${listUsers.length}`,
        }
        
        listUsers.push(users)
        renderUi(listUsers)
        form.reset()
    }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handelsubmit()

})
const handeldelet = (id: string) => {
  const filter = listUsers.filter((item) => item.id !== id);
  renderUi(filter);
};
const handelEdite = (id: string) => {
  editemode = id;
  const edit: objuser = listUsers.find((item) => item.id === id)!;
  nameInpit.value = edit.name;
  familyInpit.value = edit.family;
  ageInpit.value = edit.age;
};
const renderUi = (users: Array<objuser>) => {
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
    editelement.addEventListener('click' , ()=> handelEdite(item.id))
    delletelement.setAttribute("class", "fa-solid fa-trash-can fa-sm");
    delletelement.setAttribute("id", "delete");
    delletelement.addEventListener("click", () => handeldelet(item.id));

    divElement.append(editelement);
    divElement.append(delletelement);
    divElement.setAttribute('class' , "icons")
    tdElement.appendChild(divElement)
    trElement.append(tdElement);

    nameElement.innerText = item.name;
    familyElement.innerText = item.family;
    ageElement.innerText = item.age;
    trElement.append(nameElement, familyElement, ageElement);

    bodyTable?.append(trElement);
  });
};

