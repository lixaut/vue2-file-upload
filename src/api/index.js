
import request from "./axios"

// FormData 格式请求 api
export const reqFormdata = (data) => {
  let fmData = new FormData
  fmData.append('file', data.file)
  fmData.append('fileName', data.fileName)
  return request({
    url: '/upload_single_formdata',
    method: 'post',
    data: fmData
  })
}

// x-www-form-urlencoded 格式请求 api
export const reqUrlencoded = data => request({
    url: '/upload_single_base64',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})