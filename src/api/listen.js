import request from '@/api/request'

export const getListen = (params) => {
  return request({
    url: '/admin/v1/listens',
    method: 'GET',
    params
  })
}

export const addListen = (data) => {
  return request({
    url: '/admin/v1/listen/insertion',
    method: 'POST',
    data: data
  })
}

export const modifyListen = (data) => {
  return request({
    url: '/admin/v1/listen/modify',
    method: 'PUT',
    data: data
  })
}

export const showListenInfo = (listenId) => {
  return request({
    url: '/admin/v1/listen',
    method: 'GET',
    params: {
      listen_id: listenId
    }
  })
}

export const deleteListen = (listenId) => {
  return request({
    url: '/admin/v1/listen/delete',
    method: 'DELETE',
    params: {
      listen_id: listenId
    }
  })
}
