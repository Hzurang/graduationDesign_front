import service from '@/api/request'

export const logout = (data) => {
  return service({
    url: '/admin/v1/backend/logout',
    method: 'POST'
  })
}
