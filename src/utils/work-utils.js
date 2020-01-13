import storage from 'local-storage-fallback'

const UPDATED_THRESHOLD = (1 * 60 * 60 * 1000) // 1 hour

export function getRandomWork(works, options) {
  const {
    num,
    excludeContentfulIds,
    filterTypes
  } = Object.assign({
    num: 1,
    excludeContentfulIds: [],
    filterTypes: []
  }, options)

  let filteredWorks = []
  let lowestViewCount = Number.MAX_SAFE_INTEGER
  const workViewsStore = storage.getItem('workViews')
  const workViews = workViewsStore ? JSON.parse(workViewsStore) : {}
  for (let i=0, len=works.length; i<len; i++) {
    const work = works[i];
    if (excludeContentfulIds.includes(work.contentful_id)) {
      continue
    }
    if (filterTypes.length && work.type) {
      if (!filterTypes.includes(work.type)) {
        continue
      }
    }

    const workViewCount = workViews[work.contentful_id] ? workViews[work.contentful_id].views : 0;
    if (workViewCount < lowestViewCount) {
      lowestViewCount = workViewCount
    }

    filteredWorks.push(Object.assign(work, { views: workViewCount }))
  }

  let lowestViewedWorks = []
  let viewedWorks = []
  lowestViewedWorks = filteredWorks.filter(function(work) {
    if (work.views === lowestViewCount) {
      return work
    } else {
      viewedWorks.push(work)
      return null
    }
  })

  viewedWorks.sort(function (a, b) {
    if (a.views > b.views) {
      return -1;
    } else if (a.views < b.views) {
      return 1;
    }
    return 0;
  })

  // create an array with the least viewed works at the front, followed by the most viewed works in descending order
  filteredWorks = lowestViewedWorks.concat(viewedWorks)
  let returnArray = []
  for (let i=0; i<num; i++) {
    if (filteredWorks.length < 1) {
      break
    }
    // create random index, favouring heavily lower numbers
    const randomIndex = Math.floor(Math.sqrt(Math.random() * filteredWorks.length ^ 2))
    returnArray.push(filteredWorks[randomIndex])
    filteredWorks.splice(randomIndex, 1)
  }

  if (num === 1) {
    if (returnArray.length) {
      return returnArray[0]
    } else {
      return null
    }
  } else {
    return returnArray
  }
}

export function updateWorkView(contentful_id) {
  const workViewsStore = storage.getItem('workViews')
  const workViews = workViewsStore ? JSON.parse(workViewsStore) : {}
  const workViewObj = workViews[contentful_id] ? workViews[contentful_id] : {
    id: contentful_id,
    views: 0,
    lastUpdated: null
  }
  if (!workViews[contentful_id]) {
    workViews[contentful_id] = workViewObj
  }

  const lastUpdated = new Date(workViewObj.lastUpdated)
  const now = new Date()

  console.log('updating work view', contentful_id, workViewObj, lastUpdated, now)

  if (now.getTime() - lastUpdated.getTime() > UPDATED_THRESHOLD) {
    workViewObj.views += 1
    workViewObj.lastUpdated = new Date()

    storage.setItem('workViews', JSON.stringify(workViews))
  }

}