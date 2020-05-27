function getShops() {

    fetch("rest/shops")
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                    console.log(Error.message);
                }
            })
            .then(data => {
                let tbody = document.querySelector("#tbody");
                tbody.innerHTML = "";
                data.forEach(item => {

                    let tr = document.createElement("tr");
                    tr.setAttribute("id", `row${item.id}`);
                    //  tr.setAttribute("class", `d-flex`);
                    tbody.appendChild(tr);

                    let row = document.getElementById(`row${item.id}`);

                    let td = document.createElement("td");
                    let t = document.createTextNode(item.id);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.name);
                    td.setAttribute("class", "name");

                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.address);
                    td.setAttribute("class", "address");
                    td.appendChild(t);
                    row.appendChild(td);
                    
                    td = document.createElement("td");
                    //  td.innerHTML = `<a class="btn btn-link " href="addresses.html?id=${item.id}&fn=${item.firstName}&ln=${item.lastName}";">Addresses</a>`;
                    td.innerHTML = `<button class="btn btn-link " onclick="loadedP(${item.id});">Products</button>`;
                    row.appendChild(td);


                    td = document.createElement("td");
                    td.innerHTML = `<button class="btn btn-danger btn-sm delete" onclick="removeShop(${item.id});">Delete</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<td> <button class="btn btn-success  btn-sm pl-3 pr-3 edit" onclick="getFormS(${item.id});">Edit</button> </td>`;
                    row.appendChild(td);
                });
            })
            .catch(err => {
                alert(err.message);
            })
            ;
}

function getShop(id) {

    let shop = {};
    fetch("rest/shops/" + id,
            {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json;charset=UTF-8",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then(async data => {
                if (data.ok) {
                    try {
                        return await data.json(); //laukia kol promisas pasidarys resolved arba rejected
                        //tam kad galima butu naudotis situo daiktu funkcija turi buti async
                    } catch (err) {
//                        return {
//                            name: "",
//                            address: "",//                           
//                        };
                    }
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                const nEl = document.getElementById("name");
                const aEl = document.getElementById("address");                
                nEl.value = data.name;
                aEl.value = data.address;                
                shop = {
                    id: id,
                    name: data.name,
                    address: data.address
                };
            })

            .catch(err => {
                alert(err.message);
            });
    return shop;
}

function removeShop(id) {
    let main = document.getElementById("container");
    main.innerHTML = "";
  //  const inputEl = document.getElementById("idS");
    fetch("rest/shops/" + id, {
        method: "DELETE",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
           // [csrfHeaderName]: csrfToken
        }
    })
            .then(data => {
                if (data.ok) {
                    console.log("Deleted");
                } else {
                    throw new Error(data.status);
                }
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loaded();
            })
            ;
}

function createShop(shop) {

    fetch("rest/shops", {
        method: "POST",
        cache: "no-cache", // cia info narsyklei kad nekeshuotume,
        // nes norimgauti duomenis kurie yra tuo metu duomenu bazeje del to nekeshuojam
        credentials: "same-origin", //cia default'ine reiksme
        headers: {// t.y. kokio tipo mes tikimes ir koki tipa mes siunciam
            "Accept": "application/json;charset=UTF-8", // tai ko tikimes normaliai text.html
            "Content-Type": "application/json" //tai ka siunciam normaliai buna text.html
//            [csrfHeaderName]: csrfToken // [csrf_headerName] >>taireski kad property pavadinias bus toks pats kaip reiksme
//                    //t.y. tos properties pavadinimas yra dinaminis >> mes nezinom kokia bus reiksme jo; >> 
//                    //taigi spring'ui iheader 
        },
        body: JSON.stringify(shop)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loaded();
            })
            ;
}

function updateShop(shop, id) {
    
    fetch("rest/shops/" + id, {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
//            [csrfHeaderName]: csrfToken
        },
        body: JSON.stringify(shop)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                //   console.log(data);            
            })
            .catch(err => {
                //   alert(err.message); 
            })
            .then(data => {
                loaded();
            })
            ;
//    }
}