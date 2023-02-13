
import request from "./axios";

// FormData 格式请求 api
export const reqFormdata = data => {
  let fmData = new FormData;
  fmData.append('file', data.file);
  fmData.append('fileName', data.fileName);
  return request({
    url: '/upload_single_formdata',
    method: 'post',
    data: fmData
  });
};

// x-www-form-urlencoded 格式请求 api
export const reqUrlencoded = data => request({
    url: '/upload_single_base64',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 缩略图上传api
export const reqUploadHash = data => request({
  url: '/upload_single_hash',
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 进度管理上传
export const reqProgress = data => {
  let formData = new FormData();
  formData.append('file', data.file);
  formData.append('fileName', data.fileName);
  return request({
    url: '/upload_single_formdata',
    method: 'post',
    data: formData,
    onUploadProgress: data.func
  });
};

// 大文件上传 & 合并切片
export const reqSliceMerge = data => request({
  url: '/upload_merge',
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// 大文件上传 & 切片上传
export const reqSliceUpload = data => {
  let fd = new FormData();
  fd.append('file', data.file);
  fd.append('fileName', data.fileName);
  return request({
    url: '/upload_chunk',
    method: 'post',
    data: fd
  });
};

// 大文件上传 & 已上传切片
export const reqAlreadyUpload = params => request({
  url: '/upload_already',
  method: 'get',
  params
});