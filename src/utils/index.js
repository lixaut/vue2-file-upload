import SparkMD5 from "spark-md5";

// 限制文件 大小 & 格式
/**
 * 
 * @param {File} file 
 * @param {Vm} _this 
 * @returns 合适 true, 不合适 false
 */
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

// 根据文件内容生成 HASH 值 (Promise)
export const changeToHash = file => {
  return new Promise(resolve => {
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = function() {
      let buffer = this.result,
        HASH,
        spark,
        suffix;
      spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      HASH = spark.end();
      suffix = /\.([0-9a-zA-Z]+)$/.exec(file.name)[1];
      resolve({
        buffer,
        HASH,
        suffix,
        fileName: `${HASH}.${suffix}`
      });
    };
  });
};

// 延迟函数 (Promise)
export const delay = (interval = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};