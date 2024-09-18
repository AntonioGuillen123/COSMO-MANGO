let allProductsContainer
let allProducts

const updatePriceCart = (position, initialPrice, amount) => document.querySelectorAll('.product-total-price')[position].innerHTML = `${fixedPrice(initialPrice * parseInt(amount))} €`

const fixedPrice = (initialPrice) => initialPrice.toFixed(2)

const applyDiscount = (totalPrice, discount = 0) => (totalPrice * parseInt(discount)) / 100

const addItemCart = (data) => {
    const sessionCart = sessionStorage.getItem('cart')

    let shoppingCart = JSON.parse(sessionCart) ?? {
        totalAmount: 0,
        products: []
    }

    let newItem = true

    let product = JSON.parse(data)

    delete product.id

    let alertMessage = `${product.name} añadido correctamente al carrito :)`
    let alertType = 'alert-dark'

    shoppingCart.totalAmount++

    shoppingCart.products.map((item) => {
        if (item.product.name === product.name) {
            let amount = item.amount
            let stock = item.product.stock

            if (amount < stock) {
                item.amount = ++amount
            } else {
                alertMessage = 'No se ha podido añadir el producto, VAS A COMPRAR TODOOOOOOOOOOS RELAJATEEE'
                alertType = 'alert-danger'

                shoppingCart.totalAmount--
            }

            newItem = false
        }

        return item
    })

    if (newItem) shoppingCart.products.push({
        product: product,
        amount: 1
    })


    sessionStorage.setItem('cart', JSON.stringify(shoppingCart))

    updateCartNumber(shoppingCart.totalAmount)

    displayAlert({alertMessage, alertType})
}

const displayAlert = ({alertMessage, alertType, alertTime = 1500}) => {
    const alert = createAlert(alertMessage, alertType)

    setTimeout(() => alert.remove(), alertTime)
}

const createAlert = (message, alertType) => {
    const body = document.querySelector('body')

    const alert = document.createElement('div')
    alert.classList.add('alert', alertType, 'alert-dismissible', 'position-fixed', 'z-2', 'w-75', 'mt-5', 'bs-alert')

    const alertContent = document.createElement('span')
    alertContent.style.fontWeight = 'bold'
    alertContent.innerHTML = message

    const alertButton = document.createElement('button')
    alertButton.classList.add('btn', 'btn-close')
    alertButton.setAttribute('data-bs-dismiss', 'alert')
    alertButton.setAttribute('aria-label', 'Close')

    alert.appendChild(alertContent)
    alert.appendChild(alertButton)
    body.insertBefore(alert, body.firstChild)

    return alert
}

const getHomePage = async () => {
    const sessionCart = sessionStorage.getItem('cart')

    const shoppingCart = JSON.parse(sessionCart) ?? {
        totalAmount: 0
    }

    updateCartNumber(shoppingCart.totalAmount)

    allProductsContainer = document.querySelector('#products-container')
    allProducts = allProductsContainer.innerHTML
}

const getShoppingCart = () => {
    const mainPage = document.querySelector('main')

    const fullCart = document.getElementById('full-cart')

    const sessionCart = sessionStorage.getItem('cart')

    const shoppingCart = JSON.parse(sessionCart) ?? {
        totalAmount: 0,
        products: []
    }

    updateCartNumber(shoppingCart.totalAmount)

    mainPage.style.display = 'block'

    if (shoppingCart.products.length > 0) {
        createShoppingCart(shoppingCart)

        updateTotalNumber()
    } else {
        fullCart.innerHTML = '<h1>NINGÚN PRODUCTO EN EL CARRITO :(</h1>'
    }
}

const createShoppingCart = (shoppingCart) => {
    const productsContainer = document.querySelectorAll('.card.rounded-3.mb-4')
    const finalElement = document.getElementById('cart-products')

    productsContainer.forEach((node) => node.parentNode.removeChild(node))

    shoppingCart.products.sort((a, b) => a.product.name < b.product.name ? -1 : a.product.name > b.product.name ? 1 : 0)

    shoppingCart.products.forEach((item, index) => {
        const amount = item.amount
        const thumbnail = item.product.thumbnail
        const name = item.product.name
        const stock = item.product.stock
        const price = item.product.price

        const product = document.createElement('div')
        product.classList.add('card', 'rounded-3', 'mb-4')

        const productBody = document.createElement('div')
        productBody.classList.add('card-body', 'p-4')

        const productRow = document.createElement('div')
        productRow.classList.add('row', 'd-flex', 'justify-content-between', 'align-items-center')

        const productImageContainer = document.createElement('div')
        productImageContainer.classList.add('col-md-2', 'col-lg-2', 'col-xl-2')

        const productImage = document.createElement('img')
        productImage.classList.add('img-fluid', 'rounded-3')
        productImage.setAttribute('src', thumbnail)
        productImage.setAttribute('alt', name)

        const productNameStockContainer = document.createElement('div')
        productNameStockContainer.classList.add('col-md-3', 'col-lg-3', 'col-xl-3')

        const productName = document.createElement('p')
        productName.classList.add('lead', 'fw-normal', 'mb-2')
        productName.innerHTML = name

        const productStock = document.createElement('p')
        productStock.classList.add('text-muted')
        productStock.innerHTML = `<b>Stock:</b> ${stock} ${stock === 1 ? 'Unidad' : 'Unidades'}`

        const productAmountContainer = document.createElement('div')
        productAmountContainer.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex')

        const productMinusButtonContainer = document.createElement('button')
        productMinusButtonContainer.classList.add('btn', 'btn-link', 'px-2')

        const productMinusButton = document.createElement('i')
        productMinusButton.classList.add('fa', 'fa-minus')
        productMinusButton.addEventListener('click', () => updateAmountCart(name, index, 'minus'))

        const productInputButton = document.createElement('input')
        productInputButton.classList.add('form-control', 'form-control-sm', 'amount-value', 'text-center')
        productInputButton.setAttribute('min', 0)
        productInputButton.setAttribute('max', item.stock)
        productInputButton.setAttribute('value', amount)
        productInputButton.readOnly = true

        const productPlusButtonContainer = document.createElement('button')
        productPlusButtonContainer.classList.add('btn', 'btn-link', 'px-2')

        const productPlusButton = document.createElement('i')
        productPlusButton.classList.add('fa', 'fa-plus')
        productPlusButton.addEventListener('click', () => updateAmountCart(name, index, 'plus'))

        const productPriceContainer = document.createElement('div')
        productPriceContainer.classList.add('ms-sm-0', 'p-sm-0', 'd-flex', 'gap-4', 'col-md-3', 'col-lg-2', 'col-xl-2', 'offset-lg-1')

        const productPrice = document.createElement('h5')
        productPrice.classList.add('mb-0', 'product')
        productPrice.innerHTML = `${fixedPrice(price)} €`

        const productTotalPrice = document.createElement('h5')
        productTotalPrice.classList.add('mb-0', 'product-total-price')
        productTotalPrice.innerHTML = `${fixedPrice(price)} €`

        const productDeleteButtonContainer = document.createElement('div')
        productDeleteButtonContainer.classList.add('col-md-1', 'col-lg-1', 'col-xl-1', 'text-end')

        const productDeleteContainer = document.createElement('button')
        productDeleteContainer.classList.add('btn', 'btn-link', 'px-2')

        const productDelete = document.createElement('i')
        productDelete.classList.add('fa', 'fa-trash', 'fa-lg')
        productDelete.style.color = 'red'
        productDelete.addEventListener('click', () => deleteProductCart(name, index))

        productImageContainer.appendChild(productImage)

        productNameStockContainer.appendChild(productName)
        productNameStockContainer.appendChild(productStock)

        productMinusButtonContainer.appendChild(productMinusButton)
        productPlusButtonContainer.appendChild(productPlusButton)

        productAmountContainer.appendChild(productMinusButtonContainer)
        productAmountContainer.appendChild(productInputButton)
        productAmountContainer.appendChild(productPlusButtonContainer)

        productPriceContainer.appendChild(productPrice)
        productPriceContainer.appendChild(productTotalPrice)

        productDeleteButtonContainer.appendChild(productDeleteContainer)
        productDeleteContainer.appendChild(productDelete)

        productRow.appendChild(productImageContainer)
        productRow.appendChild(productNameStockContainer)
        productRow.appendChild(productAmountContainer)
        productRow.appendChild(productPriceContainer)
        productRow.appendChild(productDeleteButtonContainer)
        productBody.appendChild(productRow)

        product.appendChild(productBody)

        finalElement.insertAdjacentElement('beforebegin', product)

        updatePriceCart(index, price, amount)
    })
}

const deleteProductCart = (name, index) => {
    const shoppingCart = JSON.parse(sessionStorage.getItem('cart'))

    const product = document.querySelectorAll('.card.rounded-3.mb-4')[index]

    product.remove()

    const indexSession = shoppingCart.products.findIndex((item) => item.product.name === name)

    const totalAmount = shoppingCart.totalAmount

    shoppingCart.totalAmount = totalAmount - shoppingCart.products[indexSession].amount

    shoppingCart.products.splice(indexSession, 1)

    shoppingCart.products.length !== 0 ? sessionStorage.setItem('cart', JSON.stringify(shoppingCart)) : sessionStorage.clear()

    getShoppingCart()
}

const deleteCart = (buy) => {
    const fullCart = document.getElementById('full-cart')
    fullCart.innerHTML = '<h1>NINGÚN PRODUCTO EN EL CARRITO :(</h1>'

    const totalAmountContainer = document.querySelector('#cart-amount-color')
    totalAmountContainer.innerHTML = 0

    const alertMessage = 'Su carrito se ha vaciado correctamente :)'
    const alertType = 'alert-success'

    sessionStorage.clear()

    if (!buy) displayAlert({alertMessage, alertType})
}

const updateAmountCart = (name, position, option) => {
    let shoppingCart = JSON.parse(sessionStorage.getItem('cart'))

    let amountContainer = document.querySelectorAll('.amount-value')[position]

    let amountValue = parseInt(option === 'plus' ? ++amountContainer.value : --amountContainer.value)

    shoppingCart.products.map((item) => {
        const stock = item.product.stock

        if (item.product.name === name) {
            if (amountValue <= stock) {
                updatePriceCart(position, item.product.price, amountContainer.value)

                if (option === 'plus') {
                    shoppingCart.totalAmount++

                    item.amount++
                } else {
                    shoppingCart.totalAmount--

                    item.amount--
                }

                updateCartNumber(shoppingCart.totalAmount)
            } else {
                amountContainer.value = stock
            }
        }
    })

    updateTotalNumber()

    amountContainer.value !== '0' ? sessionStorage.setItem('cart', JSON.stringify(shoppingCart)) : deleteProductCart(name, position)
}

const updateCartNumber = (value) => {
    const cartNumber = document.querySelector('#cart-amount-color')

    cartNumber.innerHTML = value <= 99 ? value : '99+'
}

const getDiscountValue = () => {
    const discountContainer = document.querySelectorAll('.discount-value')

    let useDiscount

    if (discountContainer.length === 1) {
        const useDiscountContainer = discountContainer[0]

        useDiscount = useDiscountContainer.innerHTML.split('%')[0]
    }

    return useDiscount
}

const updateTotalNumber = () => {
    const totalContainer = document.querySelector('#total-price')
    const totalValueProducts = document.querySelectorAll('.product-total-price')

    const useDiscount = getDiscountValue()

    let totalValue = 0

    totalValueProducts.forEach((item) => {
        const value = parseFloat(item.innerHTML.split(' ')[0])

        totalValue += value
    })

    totalContainer.innerHTML = `${fixedPrice(!useDiscount ? totalValue : totalValue - applyDiscount(totalValue, useDiscount))} €`
}

const buy = async () => {
    const useDiscountName = getUseDiscount()

    const alertBuy = await fetch('/buy/checkWinner', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            discountName: useDiscountName
        })
    }).then((res) => res.json())

    deleteCart(true)

    displayAlert(alertBuy)
}

const showDiscounts = (data) => {
    data = data.replace(/&#34;/g, '"')

    const useDiscountName = getUseDiscount()

    const discountsContainer = document.getElementById('discountContainer')

    JSON.parse(data).forEach((item) => {
        const element = document.createElement('div')
        element.classList.add('d-flex', 'flex-row', 'justify-content-around', 'w-100')

        const name = document.createElement('span')
        name.classList.add('discount-name')
        name.innerHTML = item.name

        const value = document.createElement('span')
        value.classList.add('discount-value')
        value.innerHTML = item.value

        if (item.name === useDiscountName) {
            element.style.color = 'green'
            element.style.fontWeight = 'bold'
        }

        element.appendChild(name)
        element.appendChild(value)

        discountsContainer.appendChild(element)
    })
}

const getUseDiscount = () => {
    const params = window.location.search

    const uri = new URLSearchParams(params)

    const useDiscountName = uri.get('discountName')

    return useDiscountName
}

const search = (input) => {
    allProductsContainer.innerHTML = ''

    const temporalProductsContainer = document.createElement('div')
    temporalProductsContainer.innerHTML = allProducts

    const products = Object.values(temporalProductsContainer.childNodes).filter((item, index) => index % 2 != 0)

    products.forEach((product) => {
        const productName = product.querySelector('.product-name').innerHTML.trim()

        allProductsContainer.innerHTML += productName.toUpperCase().includes(input.toUpperCase()) ? product.outerHTML : ''
    })

    const isSearch = allProductsContainer.innerHTML !== ''

    if (!isSearch) {
        allProductsContainer.classList.add('bg-light')
        allProductsContainer.setAttribute('id', 'product-not-found')
        allProductsContainer.innerHTML = `
            <div class="w-100 text-center d-flex align-items-center justify-content-center fs-5">
                <h1>NINGÚN PRODUCTO LLAMADO: ${input} :( </h1>
            </div>
        `
    }else{
        allProductsContainer.classList.remove('bg-light')
        allProductsContainer.removeAttribute('id')
    }
}