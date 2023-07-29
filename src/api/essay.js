import request from '@/api/request'

export const getEssay = (params) => {
  return request({
    url: '/admin/v1/essays',
    method: 'GET',
    params
  })
}

export const addEssay = (data) => {
  return request({
    url: '/admin/v1/essay/insertion',
    method: 'POST',
    data: data
  })
}

export const showEssayInfo = (essayId) => {
  return request({
    url: '/admin/v1/essay',
    method: 'GET',
    params: {
      essay_id: essayId
    }
  })
}

export const deleteEssay = (essayId) => {
  return request({
    url: '/admin/v1/essay/delete',
    method: 'DELETE',
    params: {
      essay_id: essayId
    }
  })
}

export const modifyEssay = (data) => {
  return request({
    url: '/admin/v1/essay/modify',
    method: 'PUT',
    data: data
  })
}
