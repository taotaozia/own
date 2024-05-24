import request, { download, uploadPost } from "@/api/request";

// ============= 用户接口 =============
// 登录
export const postLogin = (loginUser) => {
  return request.post("/admin/login", loginUser);
};

// 根据用户获取所有的用户
export const getAdmins = (adminID) => {
  return request.get("/admin/admins?code=" + adminID);
};

export const getAdminByUUID = (adminID) => {
  return request.get("/admin/adminByuuid?uuid=" + adminID);
};

// 获取某个用户
export const getAdmin = (id) => {
  return request.get("/admin/adminByid?id=" + id);
};

// 添加用户
export const postAddAdmin = (admin) => {
  return request.post("/admin/addadmin", admin);
};

// 更新某个用户
export const putUpdateAdmin = (admin) => {
  return request.put("/admin/updateadmin", admin);
};

// 删除某个用户
export const deleteAdmin = (id) => {
  return request.delete("/admin/deleteadmin?id=" + id);
};

export const getLog = (log) => {
  return request.post("/admin/getlog", log);
};
export const addLog = (DayLog) => {
  return request.post("/admin/addlog", DayLog);
};
export const deleteLog = (id) => {
  return request.delete("/admin/deletelog?id=" + id);
};


// ============ 权限管理 ===============
// 获取所有需要限制的路由信息
export const getRouterList = () => {
  return request.get("/system/getrouterlist");
};
// 根据用户信息获取应有的权限路由
export const getRouters = (adminID) => {
  return request.get("/system/getrouters?adminID=" + adminID);
};
// 编辑页面中获取某个的权限路由信息
export const getRouter = (id) => {
  return request.get("/system/getrouter?id=" + id);
};
// 编辑页面 -- 更新路由信息
export const putUpdateRouter = (navrouter) => {
  return request.put("/system/updaterouter", navrouter);
};
// 编辑页面 -- 更新路由信息
export const postAddRouter = (navrouter) => {
  return request.post("/system/addrouter", navrouter);
};
// 编辑页面 -- 更新路由信息
export const deleteRouter = (id) => {
  return request.delete("/system/deleterouter?id=" + id);
};


// =========== 产品类别接口 ===========
//获取所有的产品类别
export const getCategorys = () => {
  return request.get("/product/category");
};
//获取某事业部的产品类别
export const getCategoryClass = (classify) => {
  return request.get("/product/categoryClass?classify=" + classify);
};
// 获取某个产品类别
export const getCategory = (id) => {
  return request.get("/product/getcategory?id=" + id);
};

// 添加产品类别
export const postAddCategory = (category) => {
  return request.post("/product/addcategory", category);
};

// 更新产品类别
export const putUpdateCategory = (category) => {
  return request.put("/product/updatecategory", category);
};

// 删除产品类别
export const deleteCategory = (id) => {
  return request.delete("/product/deletecategory?id=" + id);
};

// ============= 产品信息接口 ==========
// 获取产品信息列表
export const putProductList = (proListRes) => {
  return request.put("/product/getlist", proListRes);
};

// 获取产品列表的选项信息
export const getProductSelect = (CUID) => {
  return request.get("/product/getselect?cuid=" + CUID);
};

// 获取所有产品
export const getProducts = () => {
  return request.get("/product/getproducts");
};

// 根据产品id获取产品信息
export const getProduct = (id) => {
  return request.get("/product/getproduct?id=" + id);
};

// 添加产品信息
export const postAddProduct = (product) => {
  return request.post("/product/addproduct", product);
};

// 更新产品信息
export const putUpdateProduct = (product) => {
  return request.put("/product/updateproduct", product);
};

// 删除产品信息
export const deleteProduct = (id) => {
  return request.delete("/product/deleteproduct?id=" + id);
};

// 获取所有产品的类型编号
export const getProTypeSelect = () => {
  return request.get("/product/getprotypeselects");
};

// 获取产品关联选项 -- 详情页 + 产品类型
export const getDetailProTypeSelect = (classify) => {
  return request.get("/product/getdetproselects?classify=" + classify);
};

export const getJointList = (category) => {
  return request.get("/product/getjointlist?category=" + category);
};
export const getJoints = () => {
  return request.get("/product/getjoints");
};
export const getJoint = (id) => {
  return request.get("/product/getjoint?id=" + id);
};
export const postAddJoint = (joint) => {
  return request.post("/product/addjoint", joint);
};

export const putUpdateJoint = (joint) => {
  return request.put("/product/updatejoint", joint);
};

export const deleteJoint = (id) => {
  return request.delete("/product/deletejoint?id=" + id);
};

export const getStorageList = (category) => {
  return request.get("/product/getstoragelist?category=" + category);
};
export const getStorages = () => {
  return request.get("/product/getstorages");
};
export const getStorage = (id) => {
  return request.get("/product/getstorage?id=" + id);
};
export const postAddStorage = (storage) => {
  return request.post("/product/addstorage", storage);
};

export const putUpdateStorage = (storage) => {
  return request.put("/product/updatestorage", storage);
};

export const deleteStorage = (id) => {
  return request.delete("/product/deletestorage?id=" + id);
};
// ============ 详情页接口 ============
// 获取详情页表格内容
export const getDetailTable = (DUID) => {
  return request.get("/product/getDetailTable?duid=" + DUID);
};

// 获取所有详情页
export const getDetails = () => {
  return request.get("/product/getdetails");
};

// 获取某个详情页
export const getDetail = (id) => {
  return request.get("/product/getdetail?id=" + id);
};

// 添加详情页
export const postAddDetail = (detail) => {
  return request.post("/product/adddetail", detail);
};

// 更新详情页
export const putUpdateDetail = (detail) => {
  return request.put("/product/updatedetail", detail);
};

// 删除详情页
export const deleteDetail = (id) => {
  return request.delete("/product/deletedetail?id=" + id);
};

// ================= 下载内容接口 =============
// 根据产品 id 获取下载内容
export const getDownloadTable = (PUID) => {
  return request.get("/product/getdownloadtable?puid=" + PUID);
};

// 获取所有下载内容
export const getDownloads = () => {
  return request.get("/product/getdownloads");
};
// 选择某个下载内容
export const getDownloadSQL = (id) => {
  return request.get("/product/getdownload?id=" + id);
};
export const getDownloadSelect = () => {
  return request.get("/product/getprotypeselects");
};

// 添加下载内容
export const postAddDownload = (download) => {
  return request.post("/product/adddownload", download);
};

// 更新下载内容
export const putUpdateDownload = (download) => {
  return request.put("/product/updatedownload", download);
};

// 删除下载内容
export const deleteDownload = (id) => {
  return request.delete("/product/deletedownload?id=" + id);
};

// 获取公司资料下载内容
export const getCompany = () => {
  return request.get("/product/getproduct?id=1");
};

// 下载 文件
export const getDownload = (id) => {
  return download("/product/downloadfile?id=" + id);
};
//加载前端渲染照片
export const getLoadPng = (url) => {
  return download("/product/loadpng?url=" + url);
};

// 前端照片上传
export const postUploadPng = (formData) => {
  return uploadPost("/product/uploadpng", formData);
};

// 单文件上传
export const postUploadOne = (formData) => {
  return uploadPost("/product/uploadone", formData);
};

// 多文件上传
export const postUploadMul = (formData) => {
  return uploadPost("/product/uploadmul", formData);
};

//大文件上传 检查
export const getUploadQuery = (name) => {
  return request.get("/product/uploadquery?name=" + name);
};
//大文件上传 分片上传
export const postUploadShard = (formData) => {
  return uploadPost("/product/uploadshard", formData);
};
//大文件上传 合并分片
export const getUploadMerge = (name, path, type) => {
  return request.get("/product/uploadquery?name=" + name + "?path=" + path + "?type=" + type);
};

// ================= system 接口 ==============
//获取所有的系统日志信息
export const getNotices = () => {
  return request.get("/system/notices");
};
//获取所有的系统日志信息
export const getUserNotices = (adminID) => {
  return request.get("/system/userNotices?adminID=" + adminID);
};
// 获取某个系统日志
export const getNotice = (id) => {
  return request.get("/system/noticeByid?id=" + id);
};

// 添加系统日志
export const postAddNotice = (notice) => {
  return request.post("/system/addnotice", notice);
};

// 更新系统日志
export const putUpdateNotice = (notice) => {
  return request.put("/system/updatenotice", notice);
};

// 删除系统日志
export const deleteNotice = (id) => {
  return request.delete("/system/deletenotice?id=" + id);
};