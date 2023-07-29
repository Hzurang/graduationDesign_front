import service from '@/api/request'

export const resetDb = (data) => {
  return service({
    url: '/admin/v1/ljr/delete/empty/db',
    method: 'POST',
    data: data
  })
}
