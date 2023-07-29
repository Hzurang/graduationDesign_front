import request from './request'

export const getWord = (params) => {
  return request({
    url: '/admin/v1/words',
    params
  })
}

export const addWord = (data) => {
  return request({
    url: '/admin/v1/word/insertion',
    method: 'POST',
    data: data
  })
}

export const showWordInfo = (wordId) => {
  return request({
    url: '/admin/v1/word',
    method: 'GET',
    params: {
      word_id: wordId
    }
  })
}

export const searchWord = (params) => {
  return request({
    url: '/admin/v1/word/signal',
    method: 'GET',
    params
  })
}

export const modifyWord = (data) => {
  return request({
    url: '/admin/v1/word/modify',
    method: 'PUT',
    data: data
  })
}

export const deleteWord = (wordId) => {
  console.log(wordId)
  return request({
    url: '/admin/v1/word/delete',
    method: 'DELETE',
    params: {
      word_id: wordId
    }
  })
}
