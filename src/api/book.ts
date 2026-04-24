import request from '@/utils/request'
// fetch / create / update / delete

// // 批量寄样
// export const batchSample = (data: any) => {
//   return request({
//     url: '/project/batchSample',
//     method: 'post',
//     data,
//   })
// }

// // 获取项目
// export const getProject = (params: any) => {
//   return request({
//     url: '/project/list',
//     method: 'get',
//     params,
//   })
// }

export const fetchBook = async () => {
  return Promise.resolve({
    code: 200,
    data: 'mock数据',
  })
}
