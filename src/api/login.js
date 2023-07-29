import service from '@/api/request'

export const login = (data) => {
  return service({
    url: '/admin/v1/backend/login',
    method: 'POST',
    params: {
      user_name: data.username,
      password: data.password
    }
  })
}
