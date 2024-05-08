/**
* 检测权限点工具
*
*/

/**
 * 检查用户权限
 * @param {string | string[]} permissionCode - 需要检查的权限代码，可以是一个字符串或字符串数组。
 * @param {string[]} permissions - 用户拥有的权限列表。
 * @return {boolean} - 如果用户拥有指定权限，则返回true，否则返回false。
 */
export function checkAuthority(permissionCode, permissions) {
    let hasPermission = true;
    // 检查permissionCode是否提供，并根据其类型进行权限检查
    if (permissionCode) {
        // 如果permissionCode是数组且不为空，检查permissions中是否包含任何一个权限
        if (permissionCode instanceof Array && permissionCode.length > 0) {
            hasPermission = permissions.some(permissions =>
                permissionCode.includes(permissions)
            );
        } else {
            // 如果permissionCode是单个字符串，检查permissions中是否包含此权限
            hasPermission = permissions.some(item => item === permissionCode);
        }
    }
    return hasPermission;
}