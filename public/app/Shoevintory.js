'use strict'

const log = console.log;

(function (global, document) {
    /*
        sneakers: List[Shoe]
    */
    function Shoevintory() {
        this.sneakers = []
        this.table = null;
        this.plot = null;
    }

    Shoevintory.prototype.insertTable = function () {
        this.table = new Table();
    }

    Shoevintory.prototype.insertRow = function (shoeData) {
        this.sneakers.push(shoeData)
        this.table.insertRow(shoeData)
    }

    Shoevintory.prototype.totalSales = function () {
        const total = this.sneakers.reduce((total,shoe) => {
            return total + shoe.salePrice
        }, 0)

        return total
    }

    Shoevintory.prototype.totalSpendings = function () {
        const total = this.sneakers.reduce((total, shoe) => {
            return total += shoe.cost
        }, 0)

        return total;
    }

    Shoevintory.prototype.totalInventory = function () {
        this.sneakers.reduce((total) => {
            return total + 1
        }, 0)
    }

    Shoevintory.prototype.chartSpendingsAndProfits = function () {
        const plot = new Plot()
        let x1 = 0
        let y2 = 0
        this.sneakers.map((shoe, i) => {
            i++
            plot.plotPoint(
                i, shoe.cost, "black"
            )
        })
        plot.x1 = 0; // fix later, hardcoded for now
        plot.y1 = 500;

        this.sneakers.map((shoe, i) => {
            i++
            plot.plotPoint(
                i, shoe.salePrice, "blue"
            )
        })

        
    }

    class Shoe { 
        constructor(sneaker, purchaseDate, cost, salePrice) {
            this.sneakerName = sneaker;
            this.purchaseDate = purchaseDate;
            this.cost = cost;
            salePrice ? this.salePrice = salePrice : null;
        }
    }

    class Plot {
        constructor() {
            this.plot = document.createElement('div')
            this.x1 = 0;
            this.y1 = 500;
            this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            this.i = 0;
            this.init()

        }

        init() {
            this.plot.className = "plot"
            this.plot.innerHTML = `
                <div class="title">
                    <p>Spendings and Profits</p>
                </div>
                <div class="chart">
                   
                </div>
                <div class="legend">
                    <span class="blue"></span>Sales <br/>
                    <span class="black"></span>Spendings
                    
                </div>

            `

            document.body.appendChild(this.plot)
            this.svg.setAttribute("height", "500")
            this.svg.setAttribute("width", "800")  
            // Hardcoded for now will fix later
            // this.plotPoint(1, 150, this.svg)
            // this.plotPoint(2, 250, this.svg)

        }
        
        plotPoint(x, y, color) {
            const chart = document.querySelector(".chart");
            // const body = document.body.getBoundingClientRect()
            // const plotBorder = chart.getBoundingClientRect()
            
            // // borders of plot should be max x y value of data...

            // const x_pos_width = 100; // if x is discrete
            
            // // Origin 
            // const offsetY = plotBorder.bottom - body.top 
            // const offsetX = plotBorder.left - body.left
            
            // const y2 = offsetY - y 
            // const x2 = offsetX + x*x_pos_width

            // const point = document.createElement('div')
            // point.style = 'position: absolute; width: 5px; height: 5px; border-radius: 50%; background-color: black;'
            // point.style.left = `${x2}px`
            // point.style.top = `${y2}px`
            
            // chart.appendChild(point)
            this.drawLine(this.x1, this.y1, x, y, color)
            chart.appendChild(this.svg)
            
        }
        
        drawLine(x1, y1, x2, y2, color) {
            const SVGHEIGHT = 500;
            const SVGWIDTH = 800;
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle.setAttribute('cx', x2*100);            
            circle.setAttribute('cy', SVGHEIGHT - y2);
            circle.setAttributeNS(null, 'r', 5);
            circle.setAttribute("id", `circle${this.i}`)
            this.i++;

            this.hoverCircle(x2, y2, circle)
            //circle.setAttributeNS('style', 'fill: black; stroke: blue; stroke-width: 1px;' )

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', x1)
            line.setAttribute('y1', y1)
            line.setAttribute('x2', x2*100)
            line.setAttribute('y2', SVGHEIGHT - y2)
            line.setAttribute("stroke", color)
            log(color)
            line.setAttribute("stroke-width", "2")
            
            this.svg.appendChild(circle)
            this.svg.appendChild(line)
            // console.log(this.x1)
            // console.log(this.y1)

            this.x1 = x2*100
            this.y1 = SVGHEIGHT - y2
        }  
        
        hoverCircle(x, y, circle) {
            const chart = document.querySelector('.plot');

            circle.addEventListener('mouseenter', () => {
                log(x, y)
                let div = document.createElement('div')
                div.className = 'hovering'
                div.innerHTML = `
                    <p>x=${x}</p>
                    <p>y=$${y}</p>
                `
                chart.appendChild(div);  
            })

            circle.addEventListener('mouseleave', () => {
                const all = [...document.getElementsByClassName('hovering')];

                all.map((div) => {
                    div.remove()
                })

            })
        }
    }
    
    class Table {
        constructor() {
            this.headers = []
            this.table = document.createElement("div")
            // Initializing
            this.initTable()
        }

        initTable () {
            this.table.className = "inventoryTable"
            this.table.innerHTML = `
                <div class="table-body">
                    <div class="table-header">
                        <p class="col1">Sneaker</p>
                        <p class="col2">Date purchased</p>
                        <p class="col3">Cost</p>
                        <p class="col4">Sale price</p>
                    </div>
                </div>
            `
            document.body.appendChild(this.table)
        }

        insertRow(shoe) {

            let tableBody = this.table.firstElementChild;
            let row = this.createDivWithClass("table-row")
            tableBody.appendChild(row);
           
            row.innerHTML = `
                <div class=cellContent>
                    <p class="col1">${shoe.sneakerName}</p>
                    <p class="col2">${shoe.purchaseDate}</p>
                    <p class="col3">$${shoe.cost}</p>
                    <p class="col4">$${shoe.salePrice}</p>
                </div>
            `
            const img = document.createElement('img')
            img.src = "app/result.svg"
            img.class = "dragIcon"
            row.appendChild(img)

            for (let i = 1; i < 4; i++) {
                const col = this.table.getElementsByClassName(`col${i}`);
                let col_minWidth = col[0].offsetWidth
                let newColCell = col[col.length - 1]
                
                if (newColCell.offsetWidth > col_minWidth) {
                    for (let i = 0; i < col.length; i++) {
                        col[i].style.minWidth = `${newColCell.offsetWidth}px`
                    }
                } else {
                    col[col.length - 1].style.minWidth = `${col_minWidth}px`
                }
            }
        }

        createDivWithClass(className) {
            let div = document.createElement('div');
            div.className = className;
            div.draggable = "true"
            return div;
        }

        makeDraggable() {
            const rowContainers = document.querySelectorAll('.table-body');
            const draggables = document.querySelectorAll('.table-row');
            
            draggables.forEach(row => {
                row.addEventListener('dragstart', () => {
                    log('start')
                    row.classList.add('dragging') // add a class when user drags.
                })

                row.addEventListener('dragend', () => {
                    log('done')
                    row.classList.remove('dragging') // remove the class when user is done dragging.
                })
            })

            rowContainers.forEach(container => {
                // Inside a rows container, execute the callback
                container.addEventListener('dragover', (e) => {
                    // log('inside row container') 
                    e.preventDefault()
                    
                    const closestFrontElement = getClosestRowInFront(container, e.clientY)
                    const currentRow = document.querySelector('.dragging') // row currently being dragged

                    if (closestFrontElement == null) {
                        // Being dragged to the bottom
                        container.appendChild(currentRow)
                    } else { 
                        container.insertBefore(currentRow, closestFrontElement)
                    }

                })
            })
        }
        
    }

    function getClosestRowInFront(container, y) {
        const draggableRows = [...container.querySelectorAll('.table-row:not(.dragging)')] // every draggable except the one we are dragging
        
        return draggableRows.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2 // Center
            // log(offset)

            // Hovering over the item being dragged, offset is negative.
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child}
            } else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element

    }

    global.Shoevintory = global.Shoevintory || Shoevintory
    global.Shoe = global.Shoe || Shoe;
})(window, window.document);


