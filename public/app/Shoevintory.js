'use strict'
const log = console.log;


(function (global, document) {
    const styleSheet = document.createElement('style1')
    document.head.appendChild(styleSheet)

    function ShoevintoryFactory() {
        this.instances = [];
    }

    ShoevintoryFactory.prototype.create = function() {
        let shoevintory = new Shoevintory(this);
        this.instances.push(shoevintory);
        return shoevintory
    }

    ShoevintoryFactory.prototype.get = function(i) {
        return this.instances[i]
    }

    function Shoevintory(factory) {
        this.shoevintoryFactory = factory
        this.sneakers = []
        this.table = null;
        this.plot = null;
    }

    // Incase a shoe was dragged to another table
    Shoevintory.prototype.updateSneakers = function (containerId, dragId) {
        const table = this.table

        if (table.table.firstElementChild.id !== containerId) {
            const movedSneaker = this.sneakers[parseInt(dragId) - 1]
            this.sneakers.splice(dragId - 1, 1)
            const otherTable = this.shoevintoryFactory.get(containerId)
            otherTable.sneakers.push(movedSneaker)
        }
    }
    
    Shoevintory.prototype.insertTable = function (tableProps, parentElement) {
        this.table = new Table(tableProps, this, parentElement);
        if (tableProps.data) { 
            tableProps.data.forEach(shoe => {
                this.sneakers.push(shoe)
            })
        }
    }

    Shoevintory.prototype.getTable = function () {
        return this.table;
    }

    Shoevintory.prototype.getShoesArray = function () {
        return this.sneakers;
    }

    Shoevintory.prototype.insertRow = function (shoeData) {
        this.sneakers.push(shoeData)
        requestAnimationFrame(() => {this.table.insertRow(shoeData)})
        
    }

    Shoevintory.prototype.deleteRow = function (rowNum) {
        requestAnimationFrame(() => {
            const rowId = this.table.deleteRow(rowNum)
            this.sneakers.splice(rowId, 1)
        })
    }

    Shoevintory.prototype.editRow = function (rowNum, newData) {
        this.table.editRow(rowNum, newData)
    }

    Shoevintory.prototype.edited = function (rowNum, newData) {
        const shoe = this.sneakers[rowNum - 1]
        Object.keys(newData).forEach((key) => {
            if (key in shoe) {
                shoe[key] = newData[key]
            } else {
                throw new Error("One of the properties in newData does not match the correct format.")
            }
        })

        return shoe
    }


    Shoevintory.prototype.makeDraggable = function () {
        requestAnimationFrame(() => {
            this.table.makeDraggable();
        })
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
        const total = this.sneakers.reduce((total) => {
            return total + 1
        }, 0)

        return total
    }

    Shoevintory.prototype.totalProfits = function () {
        return Shoevintory.prototype.totalSales.call(this) - Shoevintory.prototype.totalSpendings.call(this)
    }

    Shoevintory.prototype.filterByBrand = function (brandName) {
        this.table.filterByBrand(brandName, this.sneakers)
    }

    Shoevintory.prototype.filterReset = function () {
        this.table.filterReset(this.sneakers)
    }

    Shoevintory.prototype.sortBySalePrice = function (ascOrDesc) {
        this.table.sort("salePrice", ascOrDesc, this.sneakers)
    }

    Shoevintory.prototype.sortByCost = function (ascOrDesc) {
        this.table.sort("cost", ascOrDesc, this.sneakers)
    }

    Shoevintory.prototype.chartSalesVsSpendings = function () {
        const plot = new Plot()
        
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

        }
        
        plotPoint(x, y, color) {
            const chart = document.querySelector(".chart");
            
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

    // {data: [{shoe1}, {shoe2}], columnTitles: ["Sneaker", "Date Purchased", "Cost", "Sale price"], includeProfitColumn: true}
    class Table {
        constructor(tableProps, shoevintory, parentElement) {
            this.shoevintory = shoevintory
            this.headers = []
            
            this.table = document.createElement('div')
            this.tableProps = tableProps;
            this.isDraggable = false;

            
            // Initializing
            this.initTable(this.tableProps, parentElement)
        }

        initTable (tableProps, parentElement) {
            if (this.tableProps.include.profits) {
                this.tableProps.columnTitles.push("Profits")
            }

            this.table.className = "inventoryTable"
            this.table.id = "inventoryTable"
            this.table.innerHTML = `
                <div class="table-body" id=${[...document.getElementsByClassName("table-body")].length}>
                    <div class="table-header">
                    </div>
                </div>
            `
            try {
                TableInitError(this.tableProps)
            } catch (e) {
                throw e
            }

            // Column data
            const header = this.table.getElementsByClassName("table-header")[0]

            this.tableProps.columnTitles.map((col, i) => {
                const p = document.createElement("p")
                p.textContent = col
                p.classList.add("col" + (i+1))

                // Initializing col at index margins
                if (i !== 0) {
                    styleSheet.innerText = `.col${i+1} { margin-left: 20px;}`;
                }

                header.appendChild(p)
            })
            
            if (tableProps.data) {
                tableProps.data.forEach(shoe => {
                    // Changes applied to DOM elements are not done immediately, 
                    // Need to wait for repaint to get correct widths of elements.
                    requestAnimationFrame(() => {
                        this.insertRow(shoe)
                    })
                })
            }
            
            if (parentElement) {
                parentElement.appendChild(this.table)
            } else {
                document.body.appendChild(this.table)
            }
        }


        insertRow(shoe, optionalId) {
            const tableProps = this.tableProps
            
            try {
                insertRowError(shoe, tableProps)
            } catch (e) {
                throw e
            }
            
            let tableBody = this.table.firstElementChild;
            let row = this.createDivWithClass("table-row")
            row.draggable = "true"
            let cellContent = this.createDivWithClass("cellContent")
            row.appendChild(cellContent)
            this.rowCount++;
            tableBody.appendChild(row);
          
            this.createRowsWithId(optionalId);
            
            Object.keys(shoe).forEach((key, i) => {
                if (key === "img"){
                    const p = document.createElement("p") 
                    if (shoe[key] !== "") {
                        const img = document.createElement("img")
                        img.classList.add("shoeImage")
                        img.src = shoe[key]
                        p.appendChild(img)
                    }
                    p.classList.add("col" + (i+1))
                    cellContent.appendChild(p)
                } else {
                    const p = document.createElement("p") 
                    p.textContent = shoe[key]
                    
                    p.classList.add("col" + (i+1))
                    
                    cellContent.appendChild(p)
                }
            })
            
            // Including profits column data
            if (tableProps.include.profits) {
                const p = document.createElement("p") 
                p.textContent = "+" + `${shoe.salePrice - shoe.cost}`
                p.classList.add("col" + (tableProps.columnTitles.length))
                cellContent.appendChild(p)
            }
            
            for (let i = 1; i < tableProps.columnTitles.length; i++) {
                console.log('test')
                const col = this.table.getElementsByClassName(`col${i}`);
                console.log(col)
                let col_minWidth = col[0].offsetWidth // column title width
                let newColCell = col[col.length - 1] // newly added cell width
                
                if (newColCell.offsetWidth > col_minWidth) {
                    for (let i = 0; i < col.length; i++) {
                        console.log(col[i].style)
                        col[i].style.minWidth = `${newColCell.offsetWidth}px`
                    }
                } else {
                    col[col.length - 1].style.minWidth = `${col_minWidth}px`
                }
            }

        }

        createRowsWithId(optionalId) {
            let rows = [...this.table.getElementsByClassName('table-row')]
            
            rows.map((row, i) => {
                if ([...row.getElementsByClassName('rowNum')].length === 0) {
                   
                    row.id = optionalId !== undefined ? optionalId : i+1; // Original id's (consistent with original sneakers list indexes)
                   
                    const rowNum = document.createElement("p")
                    rowNum.classList.add("rowNum")
 
                    if (optionalId !== undefined) {
                        rowNum.textContent = optionalId
                        
                        const rowAfter = rows.filter((row) => parseInt(row.id) === parseInt(optionalId) + 1)[0]
                        const rowBefore = rows.filter((row) => parseInt(row.id) === parseInt(optionalId) - 1)[0]
                        
                        const container = this.table.getElementsByClassName('table-body')[0]
                        requestAnimationFrame(() => {
                            if (rowAfter !== undefined) {
                                container.insertBefore(row, rowAfter)
                            }
                        })
                    } else {
                        rowNum.textContent = i+1
                    }

                    row.appendChild(rowNum)
                }
            })  
        }

        updateRowsWithId(otherTable) {
            let rows = [...this.table.getElementsByClassName('table-row')]
            
            rows.map((row, i) => {
                const rowNum = row.getElementsByClassName("rowNum")[0]
                rowNum.innerHTML = i + 1
            })

            if (otherTable === null || otherTable === undefined) {
                return
            }

            let rows2 = [...otherTable.getElementsByClassName('table-row')]
           
            rows2.map((row, i) => {
                const rowNum = row.getElementsByClassName("rowNum")[0]
                rowNum.innerHTML = i + 1
            })
        }

        deleteRow(rowNum) {
            let rows = [...this.table.getElementsByClassName('table-row')]

            const rowId = rows[rowNum - 1].id // original row id (not row number)
            rows[rowNum - 1].remove()
            rows.splice(rowNum-1, 1)

            this.updateRowsWithId(null)

            return rowId
        }

        editRow(rowNum, newData) {
            let rows = [...this.table.getElementsByClassName('table-row')]

            const rowId = rows[rowNum -1].id 
            const newShoe = this.shoevintory.edited(rowId, newData)
            rows[rowNum - 1].remove()
            this.insertRow(newShoe, rowId)
        }

        createDivWithClass(className) {
            let div = document.createElement('div');
            div.className = className;
            return div;
        }

        makeDraggable() {
            this.isDraggable = true;

            const rowContainers = this.table.querySelectorAll('.table-body');
            const draggables = this.table.querySelectorAll('.table-row');
            
            draggables.forEach(row => {
                row.addEventListener('dragstart', () => {
                    log('start')
                    row.classList.add('dragging') // add a class when user drags.
                })

                row.addEventListener('dragend', () => {
                    log('done')
                    row.classList.remove('dragging') // remove the class when user is done dragging.
                    
                    // After dragging, update row id's
                    this.updateRowsWithId(row.parentElement)

                    Shoevintory.prototype.updateSneakers.call(this.shoevintory, row.parentElement.id, row.id)
                })
            })

            rowContainers.forEach(container => {
                // Inside a rows container, execute the callback
                container.addEventListener('dragover', (e) => {
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


        filterByBrand(brandName, shoes) {
            // Remove DOM rows.
            const rows = [...this.table.getElementsByClassName('table-row')]
            rows.forEach(row => row.remove())
            
            // Insert filtered DOM rows.
            const filteredShoes = shoes.filter(shoe => shoe.brand === brandName)
            
            filteredShoes.forEach(shoe => {
                requestAnimationFrame(() => {
                    this.insertRow(shoe)
                    if (this.isDraggable) {
                        this.makeDraggable();
                    }
                })
            })

        }

        // Original shoes for this.sneakers in shoevintory
        filterReset(shoes) {
            const rows = [...this.table.getElementsByClassName('table-row')]
            rows.forEach(row => row.remove())

            shoes.forEach(shoe => {
                requestAnimationFrame(() => {
                    this.insertRow(shoe)
                    if (this.isDraggable) {
                        this.makeDraggable();
                    }
                })
            })
        }

        sort(type, ascOrDesc, shoes) {
            if (type === "salePrice") {
                const rows = [...this.table.getElementsByClassName('table-row')]
                rows.forEach(row => {row.remove()})

                if (ascOrDesc === "ascending") {
                    const sortedByAsc = [...shoes].sort((a, b) => {
                        return a.salePrice - b.salePrice
                    })

                    sortedByAsc.forEach(shoe => this.insertRow(shoe))
                    if (this.isDraggable) { this.makeDraggable() }
                } else if (ascOrDesc === "descending") {
                    const sortedByDesc = [...shoes].sort((a, b) => {
                        return b.salePrice - a.salePrice
                    })

                    sortedByDesc.forEach(shoe => this.insertRow(shoe))
                    if (this.isDraggable) { this.makeDraggable() }
                }
            } else if (type === "cost") {
                const rows = [...this.table.getElementsByClassName('table-row')]
                rows.forEach(row => {row.remove()})

                if (ascOrDesc === "ascending") {
                    const sortedByAsc = [...shoes].sort((a, b) => {
                        return a.cost - b.cost
                    })

                    sortedByAsc.forEach(shoe => this.insertRow(shoe))
                    if (this.isDraggable) { this.makeDraggable() }
                } else if (ascOrDesc === "descending") {
                    const sortedByDesc = [...shoes].sort((a, b) => {
                        return b.cost - a.cost
                    })

                    sortedByDesc.forEach(shoe => this.insertRow(shoe))
                    if (this.isDraggable) { this.makeDraggable() }
                }
            }
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

    /******* ERRORS *********/ 
    /*
    Shoe is optional (only in insertRow) 
    */

    const DataColumnsError = new Error("Shoe data length and column titles length must be equal.")
    
    function TableInitError(tableProps) {
        const data = tableProps.data
        const columnsLength = tableProps.include.profits ? tableProps.columnTitles.length - 1 : tableProps.columnTitles.length
        
        if (tableProps.data === undefined || data.length === 0) {
            return;
        }
        
        data.forEach(shoe => {
            if (Object.keys(shoe).length !== columnsLength) {
                throw DataColumnsError
            }
        })
    }

    function insertRowError(shoe, tableProps) {
        // Required props
        const validShoeProps = ["salePrice", "cost", "date", "name"]
        const columnLength = tableProps.include.profits ? tableProps.columnTitles.length - 1 : tableProps.columnTitles.length
        if (Object.keys(shoe).length !== columnLength) {
            throw DataColumnsError
        }

        validShoeProps.map(key => {
            if (!(key in shoe)) {
                throw new Error("Required properties of shoe data must match one of " + validShoeProps)
            }
        })
            
    }
    

    global.Shoevintory = global.Shoevintory || Shoevintory
    global.ShoevintoryFactory = global.ShoevintoryFactory || ShoevintoryFactory
})(window, window.document);
