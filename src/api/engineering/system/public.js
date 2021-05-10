

import request from "@/utils/request"

// 系统维护-评定细则维护列表
export function evaluationList (query) {
    return request({
        url: "/train/rubrics/list",
        method: "get",
        params: query
    })
}

// 系统维护-评定细则维护新增
export function evaluationAdd (data) {
    return request({
        url: "/train/rubrics/insert",
        method: "post",
        data: data
    })
}

// 系统维护-评定细则维护修改
export function evaluationEdit (data) {
    return request({
        url: "/train/rubrics/update",
        method: "put",
        data: data
    })
}

// 系统维护-评定细则维护删除
export function evaluationDel (query) {
    return request({
        url: "/train/rubrics/" + query,
        method: "delete",
    })
}



// 系统维护-迎汛物资维护列表
export function suppliesList (query) {
    return request({
        url: "/train/detail/list",
        method: "get",
        params: query
    })
}

// 系统维护-迎汛物资维护新增
export function suppliesAdd (data) {
    return request({
        url: "/train/detail/insert",
        method: "post",
        data: data
    })
}

// 系统维护-迎汛物资维护修改
export function suppliesEdit (data) {
    return request({
        url: "/train/detail/update",
        method: "put",
        data: data
    })
}

// 系统维护-迎汛物资维护删除
export function suppliesDel (query) {
    return request({
        url: "/train/detail/" + query,
        method: "delete",
    })
}



// 系统维护-迎汛物资维护列表
export function checkList (query) {
    return request({
        url: "/train/content/list",
        method: "get",
        params: query
    })
}

// 系统维护-迎汛物资维护新增
export function checkAdd (data) {
    return request({
        url: "/train/content/insert",
        method: "post",
        data: data
    })
}

// 系统维护-迎汛物资维护修改
export function checkEdit (data) {
    return request({
        url: "/train/content/update",
        method: "put",
        data: data
    })
}

// 系统维护-迎汛物资维护删除
export function checkDel (query) {
    return request({
        url: "/train/content/" + query,
        method: "delete",
    })
}




// 系统维护-亮点类型维护列表
export function typeMaintenanceList (query) {
    return request({
        url: "/train/project/ld",
        method: "get",
        params: query
    })
}

// 系统维护-亮点类型维护新增
export function typeMaintenanceAdd (data) {
    return request({
        url: "/train/project/insert",
        method: "post",
        data: data
    })
}

// 系统维护-亮点类型维护修改
export function typeMaintenanceEdit (data) {
    return request({
        url: "/train/project/update",
        method: "put",
        data: data
    })
}

// 系统维护-亮点类型维护删除
export function typeMaintenanceDel (query) {
    return request({
        url: "/train/project/" + query,
        method: "delete",
    })
}




// 系统维护-收费工程信息维护列表
export function chargeInformationList (query) {
    return request({
        url: "/train/chargeunder/list",
        method: "get",
        params: query
    })
}

// 系统维护-收费工程信息维护列表
export function chargeInformationFormList (query) {
    return request({
        url: "/train/underground/rf",
        method: "get",
        params: query
    })
}

// 系统维护-收费工程信息维护-新增
export function chargeInformationAdd (data) {
    return request({
        url: "/train/chargeunder/insert",
        method: "post",
        data: data
    })
}

// 系统维护-收费工程信息维护-修改
export function chargeInformationEdit (data) {
    return request({
        url: "/train/chargeunder/update",
        method: "put",
        data: data
    })
}

// 系统维护-收费工程信息维护-删除
export function chargeInformationDel (query) {
    return request({
        url: "/train/chargeunder/" + query,
        method: "delete",
    })
}





// 系统维护-资质人员管理列表
export function quapersonList (query) {
    return request({
        url: "/train/quaperson/list",
        method: "get",
        params: query
    })
}

// 系统维护-资质人员管理-新增-
export function quapersonAdd (data) {
    return request({
        url: "/train/quaperson/insert",
        method: "post",
        data: data
    })
}

// 系统维护-资质人员管理-修改
export function quapersonEdit (data) {
    return request({
        url: "/train/quaperson/update",
        method: "put",
        data: data
    })
}

// 系统维护-资质人员管理-删除
export function quapersonDel (query) {
    return request({
        url: "/train/quaperson/" + query,
        method: "delete",
    })
}




// 系统维护-风险评估维护列表
export function riskList (query) {
    return request({
        url: "/train/assess/list",
        method: "get",
        params: query
    })
}

// 系统维护-风险评估维护-新增-
export function riskAdd (data) {
    return request({
        url: "/train/assess/insert",
        method: "post",
        data: data
    })
}

// 系统维护-风险评估维护-修改
export function riskEdit (data) {
    return request({
        url: "/train/assess/update",
        method: "put",
        data: data
    })
}

// 系统维护-风险评估维护-删除
export function riskDel (query) {
    return request({
        url: "/train/assess/" + query,
        method: "delete",
    })
}



// 系统维护- 统计查询-统计报表--防空地下室综合统计列表
export function basementList (query) {
    return request({
        url: "/train/rfgc/list",
        method: "get",
        params: query
    })
}

// 系统维护- 统计查询-统计报表--汽车库利用率统计列表
export function utilizationList (query) {
    return request({
        url: "/train/garage/list",
        method: "get",
        params: query
    })
}

// 系统维护- 统计查询-统计报表--汽车库利用率统计列表
export function chargeList (query) {
    return request({
        url: "/train/chargeunder/all",
        method: "get",
        params: query
    })
}




