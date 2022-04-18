'use strict'

// shoeData = {data: [{shoe1}, {shoe2}], columnTitles: ["Sneaker", "Date Purchased", "Cost", "Sale price"], includeProfitColumn: true}

let shoevintoryFactory = new ShoevintoryFactory();

let shoevintory = shoevintoryFactory.create();
let shoevintory2 = shoevintoryFactory.create();
let shoevintory3 = shoevintoryFactory.create();
let shoevintory4 = shoevintoryFactory.create();
let shoevintory5 = shoevintoryFactory.create();
let shoevintory6 = shoevintoryFactory.create();
let shoevintory7 = shoevintoryFactory.create();
let shoevintory8 = shoevintoryFactory.create();

function initializeTable() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example1")
    shoevintory.insertTable(data, exampleElement)

}

function insertRowExample() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example2")
    shoevintory2.insertTable(data, exampleElement)

    shoevintory2.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
}

function example3() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example3")
    shoevintory3.insertTable(data, exampleElement)

    shoevintory3.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory3.makeDraggable();
}


function example4() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example4")
    shoevintory4.insertTable(data, exampleElement)

    shoevintory4.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory4.makeDraggable();
}

function deleteRowEx4(num) {
    shoevintory4.deleteRow(num)
}

function example5() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example5")
    shoevintory5.insertTable(data, exampleElement)

    shoevintory5.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory5.makeDraggable();
    
}

function editRowEx5() {
    shoevintory5.editRow(2, {img: "https://assets.adidas.com/images/w_600,f_auto,q_auto/3f8e50935dfd46ce81d5ac5500919520_9366/Ultraboost_4.0_DNA_Shoes_White_FY9122_01_standard.jpg"});
}

function example6() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example6")
    shoevintory6.insertTable(data, exampleElement)

    shoevintory6.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory6.makeDraggable();
    
}

function totalSalesEx6(e) {
    const newDiv = document.createElement('p')
    newDiv.textContent = shoevintory6.totalSales()
    e.insertAdjacentElement("afterend", newDiv)
}

function totalSpendingsEx6(e) {
    const newDiv = document.createElement('p')
    newDiv.textContent = shoevintory6.totalSpendings()
    e.insertAdjacentElement("afterend", newDiv)
}

function totalInventoryEx6(e) {
    const newDiv = document.createElement('p')
    newDiv.textContent = shoevintory6.totalInventory()
    e.insertAdjacentElement("afterend", newDiv)
}

function totalProfitsEx6(e) {
    const newDiv = document.createElement('p')
    newDiv.textContent = shoevintory6.totalProfits()
    e.insertAdjacentElement("afterend", newDiv)
}


function example7() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example7")
    shoevintory7.insertTable(data, exampleElement)

    shoevintory7.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory7.insertRow({img: "", name: "Adidas Yeezy", brand: "Adidas", date: "2022/01/01", cost: 265, salePrice: 320})
    shoevintory7.makeDraggable();
}

function filterEx7() {
    shoevintory7.filterByBrand("Adidas")

}

function sortBySaleAscEx7() {
    shoevintory7.sortBySalePrice("ascending")
}

function sortBySaleDescEx7() {
    shoevintory7.sortBySalePrice("descending")
}

function sortByCostAscEx7() {
    shoevintory7.sortByCost("ascending")
}

function sortByCostDescEx7() {
    shoevintory7.sortByCost("descending")
}

function filterResetEx7() {
    shoevintory7.filterReset()
}

function example8() {
    const data = {
        data: [
            {img: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777406", name: "Air Jordan 1", brand: "Jordan", date: "2022/04/17", cost: 300, salePrice: 340},
        ],
        columnTitles: ["", "Sneaker name", "Brand", "Date purchased", "Cost", "Sale price"],
        include: {
            profits: true,
        }
    }
    const exampleElement = document.getElementById("example8")
    shoevintory8.insertTable(data, exampleElement)

    shoevintory8.insertRow({img: "", name: "Ultraboosts", brand: "Adidas", date: "2022/01/01", cost: 255, salePrice: 300})
    shoevintory8.insertRow({img: "", name: "Adidas Yeezy", brand: "Adidas", date: "2022/01/01", cost: 265, salePrice: 320})
    shoevintory8.makeDraggable();
}

function chartEx8() {
    shoevintory8.chartSalesVsSpendings();
}