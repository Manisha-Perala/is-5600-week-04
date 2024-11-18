const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')
async function list (options = {}) {
    const { offset = 0, limit = 25, tag } = options;
    const data = await fs.readFile(productsFile)
    return JSON.parse(data)
    .filter(product => {
        if(!tag) {
            return product
        }

        return product.tags.find(( {title}) => title == tag)
    })
    .slice(offset, offset + limit)
  }

  async function get (id) {
    const products = await JSON.parse(fs.readFile(productsFile))

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
  }

  module.exports = {
    list,
    get,
  }