'use strict'

let shoevintory = new Shoevintory();

document.body.innerHTML += `
    <br>
    <h2>Insert and initialize a custom table, with static headers (custom headers coming soon)</h2>
    <pre>
        <code>
            shoevintory.insertTable();
        </code>
    </pre>
`
shoevintory.insertTable();

document.body.innerHTML += `
    <br>
    <h2>Insert a row into the table</h2>
    <pre>
        <code>
            shoevintory.insertRow(new Shoe("Air Jordan 1", "2022/01/01", 255, 320));
            shoevintory.insertRow(new Shoe("Nike Dunk Low UNC", "2022/02/01", 155, 250));
            shoevintory.insertRow(new Shoe("Adidas Yeezy 350 Black", "2022/02/01", 305, 420));
            shoevintory.insertRow(new Shoe("Air Jordan 4 Black", "2022/03/01", 265, 370));
        </code>
    </pre>
`
let shoevintory2 = new Shoevintory();
shoevintory2.insertTable();
shoevintory2.insertRow(new Shoe("Air Jordan 1", "2022/01/01", 255, 300));
shoevintory2.insertRow(new Shoe("Nike Dunk Low UNC", "2022/02/01", 155, 250));
shoevintory2.insertRow(new Shoe("Adidas Yeezy 350 Black", "2022/02/01", 305, 280));
shoevintory2.insertRow(new Shoe("Air Jordan 4 Black", "2022/03/01", 265, 370));

document.body.innerHTML += `
    
    <h2>Calculate various statistics</h2>
    <pre>
        <code>
            console.log(shoevintory.totalSpendings());
            console.log(shoevintory.totalInventory());
            console.log(shoevintory.totalSales());
        </code>
    </pre>
`

document.body.innerHTML += `
    <br>
    <h2>Make the rows draggable. Then, drag the row to another row in the same shoeventory. 
        <br/>Alternatively, I have initialized another shoevintory to the right. You can drag a row from shoevintory on the left here, vice versa.
        <br/> Also create a plot of spendings and sales based on your shoevintory. Hover over a circle to view the data information.
        </h2>
    <pre>
        <code>
            shoevintory.table.makeDraggable();
            // let shoevintory2 = new Shoevintory();
            // shoevintory2.insertTable();
            // ...
            // shoevintory2.makeDraggable();
            // Now you can drag from table 1 to table 2
            
            // Create a plot
            shoevintory.chartSpendingsAndProfits()
        </code>
    </pre>
`
let shoevintory3 = new Shoevintory();
shoevintory3.insertTable();
shoevintory3.insertRow(new Shoe("Air Jordan 1", "2022/01/01", 255, 320));
shoevintory3.insertRow(new Shoe("Nike Dunk Low UNC", "2022/02/01", 155, 250));
shoevintory3.insertRow(new Shoe("Adidas Yeezy 350 Black", "2022/02/01", 305, 420));

let shoevintory4 = new Shoevintory();
shoevintory4.insertTable();
shoevintory4.insertRow(new Shoe("Air Jordan 1", "2022/01/01", 255, 320));
shoevintory4.insertRow(new Shoe("Nike Dunk Low UNC", "2022/02/01", 155, 250));
shoevintory3.table.makeDraggable();
shoevintory4.table.makeDraggable();

// shoevintory.insertRow(new Shoe("Nike Dunk Low Panda", "2022/30/22", 150, 255));

// document.body.innerHTML += `
//     <div>
//     <h2>Create a plot of spendings and sales based on your shoevintory.
//     Hover over a circle to view the data information. </h2>
//     </div>
// `

shoevintory2.chartSpendingsAndProfits()
