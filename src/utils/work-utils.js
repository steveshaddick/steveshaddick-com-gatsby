import storage from 'local-storage-fallback'

const UPDATED_THRESHOLD = (1 * 60 * 60 * 1000) // 1 hour

export function getRandomWorkId(works, options) {
  const {
    num,
    checkCache,
    excludeContentfulIds,
    filterTypes
  } = Object.assign({
    num: 1,
    checkCache: true,
    excludeContentfulIds: [],
    filterTypes: []
  }, options)



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