const tagMapper = {
  combineTags: (global, restaurant) => {
    const combinedTags = {}

    if (global) {
      const globalTagKeys = Object.keys(global)
      globalTagKeys.forEach((key) => {
        combinedTags[key] = {
          key,
          title: global[key].title,
          icon: {
            type: 'class',
            value: global[key].icon
          }
        }
      })
    }

    if (restaurant) {
      const restaurantKeys = Object.keys(restaurant)
      restaurantKeys.forEach((key) => {
        combinedTags[key] = {
          key,
          title: restaurant[key].title,
          icon: {
            type: 'image',
            value: restaurant[key].icon
          }
        }
      })
    }

    return combinedTags
  }
}

export default tagMapper
