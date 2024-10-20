const checker = (currentRole,permissionRoleArr)=>{
    const idx = permissionRoleArr.findIndex(roleItem=>roleItem === currentRole);

    return idx > -1;
}

module.exports = checker
