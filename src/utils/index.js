
// 限制文件 大小 & 格式
export const isSuitable = (file, _this) => {
  if (!file) return false;
  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    _this.$message({
      message: '不支持该文件格式，请重新选择！',
      type: 'warning'
    })
    return false;
  }
  // 限制文件上传的大小
  if (file.size > 1 * 1024 * 1024) {
    _this.$message({
      message: '文件超出大小限制，请重新选择！',
      type: 'warning'
    })
    return false;
  }
  return true
};

// 文件转为 BASE64 格式 (Promise)
export const changeToBase64 = file => {
  return new Promise(resolve => {
    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function() {
      resolve(this.result)
    };
  });
};