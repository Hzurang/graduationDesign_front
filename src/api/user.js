import request from './request'

export const getUser = (params) => {
  return request({
    url: '/admin/v1/users',
    method: 'GET',
    params
  })
}

export const prohibitUser = (userId) => {
  return request({
    url: '/admin/v1/user/prohibit',
    method: 'DELETE',
    params: {
      user_id: userId
    }
  })
}

export const recoveryUser = (userId) => {
  return request({
    url: '/admin/v1/user/recovery',
    method: 'PUT',
    params: {
      user_id: userId
    }
  })
}

export const searchUser = (params) => {
  return request({
    url: '/admin/v1/user/signal',
    method: 'GET',
    params
  })
}
