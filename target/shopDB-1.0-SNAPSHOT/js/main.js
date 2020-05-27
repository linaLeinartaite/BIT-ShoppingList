
function loaded() {
    let HTML = ``;
    let main = document.getElementById("container");
    main.innerHTML = "";
    main.classList.add("p-4");
    main.classList.add("ml-5");
    main.classList.add("mr-5");
    HTML = ` <h1 class="mb-4">Shops</h1>                      
 <div>
    <button class="btn btn-outline-info mb-4" onclick="getFormS();">Add New Shop</button> 
</div>
    <table class="table table-striped">    
                            <thead>
                                <tr class="">
                                 <th class="">id</th>
                                 <th class="">Name</th>
                                 <th class="">Address</th>                                                             
                                <th class=""></th>                           
                                <th class=""></th>
                                <th class=""></th>
                                </tr>
                              </thead>
                            <tbody id="tbody">
    </tbody></table>`
    main.innerHTML = HTML;
    getShops();
    // getVidurkis();
}
function loadedP(id) {
    let HTML = ``;
    let main = document.getElementById("container");
    main.innerHTML = "";
    main.classList.add("p-4");
    main.classList.add("ml-5");
    main.classList.add("mr-5");


    HTML = ` <h1 class="mb-4" id="kieno"></h1>
    <button class="btn btn-outline-info mb-4" onclick="getFormP(${id});">Add New Product</button>
                    <button class="btn btn-outline-info mb-4" onclick="loaded();">Go Back</button>
    <table class="table table-striped">    
                            <thead>
                                <tr class="">
                                 <th class="">id</th>
                                 <th class="">Name</th>
                                 <th class="">Description</th>
                                <th class="">Price</th>
                                <th class="">Qantity</th>
                                <th class=""></th>                           
                                <th class=""></th>                       
                                </tr>
                              </thead>
                            <tbody id="tbody">
    </tbody></table> 
`
    main.innerHTML = HTML;
    getProducts(id);
}

function saveS(ids, event) {
    event.preventDefault();

    const idEl = document.getElementById("idS");
    const nEl = document.getElementById("name");
    const aEl = document.getElementById("address");

    if (nEl.value.trim() === "" || aEl.value.trim() === "") {
        alert("Please Fill Out All Required Fields!");
    } else {
        let name = "";
        nEl.value.split(" ").forEach(i => {
            if (i !== "") {
                name += i.concat(" ");
            }
        });
        let address = "";
        aEl.value.split(" ").forEach(i => {
            if (i !== "") {
                address += i.concat(" ");
            }
        });
        const shop = {
            name: name.trim(),
            address: address.trim()
        };

        if (ids !== undefined) {
            const id = parseInt(ids);

            updateShop(shop, id);
        } else {
            createShop(shop);
        }
    }
}
function saveP(event, ids, idPs) {
    event.preventDefault();
    const id = parseInt(ids);
    const nEl = document.getElementById("name");
    const dEl = document.getElementById("description");
    const prEl = document.getElementById("price");
    const qEl = document.getElementById("quantity");

    
    if (nEl.value.trim() === "" || prEl.value.trim() === "" || qEl.value.trim() === "") {
        alert("Please Fill Out All Required Fields!");
    } else       
    if ((parseFloat(prEl.value)).toString() === "NaN") {
        alert("Price must be a number!");
    } else
        
    if ((parseInt(qEl.value)).toString() === "NaN" || (parseFloat(qEl.value)%1) !== 0) {
        alert("Quantity must be a whole number!");
    } else {
        const product = {
            name: nEl.value.trim(),
            description: dEl.value.trim(),
            price: parseFloat(prEl.value),
            quantity: parseInt(qEl.value)
        };

        if (idPs !== undefined) {
            const idP = parseInt(idPs);
            updateProduct(product, idP);
        } else {
            createProduct(product);
        }
    }
}

function getFormS(id) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    let HTML = `
<form action="index.html" class="m-5 mb-0">
                <input  type="hidden" id="idS" value="${id}">
                <div class="form-group">    
                    <label class="form-group"> Shop Name <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="name">              
                    <label class="form-group">   Shop Address <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="address">                

                          </div>
                <button class="btn btn-success pl-5 pr-5" onclick="saveS(${id}, event);"> Save </button> 
                <button class="btn btn-info pl-5 pr-5 m-1 ml-3"  onclick="loaded();">Cancel</button> 
     <div class="mt-3"><span class="text-danger">*</span> = required fields</div> 
 </form>    
`;
    main.innerHTML = HTML;
    if (id === undefined) {
    } else {
        getShop(id);
    }
}
function getFormP(id, idP) {
    let main = document.getElementById("container");
    main.innerHTML = "";
    let HTML = `
<form action="index.html" class="m-5 mb-0">
              <input type="hidden" id="idP" value="${idP}">
             <input type="hidden" id="idS" value="${id}">
                <div class="form-group">    
                    <label class="form-group"> Product Name <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="name">              
                    <label class="form-group"> Description </label> <input type="text" class="form-group form-control" id="description">                
                    <label class="form-group"> Unit Price <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="price"> 
                    <label class="form-group"> Qantity <span class="text-danger">*</span> </label> <input type="text" class="form-group form-control" id="quantity">      
 </div>
                <button class="btn btn-success pl-5 pr-5" onclick="saveP(event, ${id}, ${idP});"> Save </button> 
                <button class="btn btn-info pl-5 pr-5 m-1 ml-3"  onclick="loadedP(${id});">Cancel</button>   
    <div class="mt-3"><span class="text-danger">*</span> = required fields</div>     
</form>
    
`;
    main.innerHTML = HTML;
    if (idP === undefined) {
    } else {
        getProduct();
    }
}



