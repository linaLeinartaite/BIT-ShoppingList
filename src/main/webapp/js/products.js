function getProducts(id) {

    fetch("rest/shops/" + id + "/products")
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
                if (data[0] !== undefined) {
                    document.getElementById("kieno").innerHTML = `Products in (${data[0].shop.name})`;
                }else {
                    alert("This Shop Has No Listed Products!");
                }
                data.forEach(item => {

                    let tr = document.createElement("tr");
                    tr.setAttribute("id", `row${item.id}`);
                    tbody.appendChild(tr);

                    let row = document.getElementById(`row${item.id}`);

                    let td = document.createElement("td");
                    let t = document.createTextNode(item.id);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    t = document.createTextNode(item.name);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    if(item.description === null || item.description.trim() === "" || item.description.trim() === "null"){
                      t = document.createTextNode("* * * * *");   
                    }else{
                    t = document.createTextNode(item.description);
                    }
                    td.appendChild(t);
                    row.appendChild(td);
                    

                    td = document.createElement("td");
                    t = document.createTextNode(item.price);
                    td.appendChild(t);
                    row.appendChild(td);


                    td = document.createElement("td");
                    t = document.createTextNode(item.quantity);
                    td.appendChild(t);
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<button class="btn btn-danger btn-sm delete" onclick="removeProduct(${item.id}, ${id} );">Delete</button>`;
                    row.appendChild(td);

                    td = document.createElement("td");
                    td.innerHTML = `<td> <button class="btn btn-success  btn-sm pl-3 pr-3 edit" onclick="getFormP( ${id}, ${item.id});">Edit</button> </td>`;
                    row.appendChild(td);
                });

            })
            .catch(err => {
                alert(err.message);
            })
            ;
}

function getProduct() {
    let product = {};
    const sEl = document.getElementById("idS");
    const pEl = document.getElementById("idP");
    fetch("rest/shops/" + sEl.value + "/products/" + pEl.value, {
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
                        return await data.json();
                    } catch (err) {
                        return null;
                    }
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
                const sEl = document.getElementById("idS");
                const pEl = document.getElementById("idP");
                const nEl = document.getElementById("name");
                const dEl = document.getElementById("description");
                const prEl = document.getElementById("price");
                const qEl = document.getElementById("quantity");

                nEl.value = data.name;
                dEl.value = data.description;
                prEl.value = data.price;
                qEl.value = data.quantity;

                product = {
                    id: pEl.value,
                    name: nEl.value,
                    description: dEl.value,
                    price: prEl.value,
                    quantity: parseFloat(qEl.value),
                    //   shopId: sEl.value
                };

            })
            .catch(err => {
                alert(err.message);
            });
    return product;
}

function removeProduct(idP, id) {

    let main = document.getElementById("container");

    fetch("rest/shops/" + id + "/products/" + idP, {
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
            .then(
                    () =>
            {
                main.innerHTML = "";
                //getAddresses(id);
                loadedP(id);
            })
            ;
}

function createProduct(product) {
    const sEl = document.getElementById("idS");

    fetch("rest/shops/" + sEl.value + "/products", {
        method: "POST",
        cache: "no-cache", // cia info narsyklei kad nekeshuotume,
        // nes norimgauti duomenis kurie yra tuo metu duomenu bazeje del to nekeshuojam
        credentials: "same-origin", //cia default'ine reiksme
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
                    //    [csrfHeaderName]: csrfToken
        },
        body: JSON.stringify(product)
    })
            .then(data => {
                if (data.ok) {
                    return data.json();
                    console.log("OKKKK");
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
                loadedP(sEl.value);
            })
            ;
}

function updateProduct(product, idP) {
    // let aidEl = document.getElementById("addressId");
    let sEl = document.getElementById("idS");

    fetch("rest/shops/" + sEl.value + "/products/" + idP, {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8"
                    //  [csrfHeaderName]: csrfToken
        },
        body: JSON.stringify(product)
    })
            .then(data => {
                if (data.ok) {
                    console.log("OKKK");
                    return data.json();
                } else {
                    throw new Error(data.status);
                }
            })
            .then(data => {
            })
            .catch(err => {
                alert(err.message);
            })
            .then(data => {
                loadedP(sEl.value);
            })
            ;
}



