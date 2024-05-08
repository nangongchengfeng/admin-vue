/**
* 获取权限配置
*
*/
/**
 * 权限控制指令，用于在页面元素插入时根据用户权限决定是否显示该元素。
 * 
 * @param {HTMLElement} el - 被绑定指令的元素。
 * @param {Object} binding - 绑定的对象，包含权限值。
 * @param {Object} vnode - 虚拟节点，用于操作DOM。
 */
import { checkAuthority } from '@/utils/authority'
import storage from "@/utils/storage";
export default {
    inserted(el, binding, vnode) {
        // 获取绑定的权限值
        const { value } = binding;
        // 从本地存储获取用户权限列表
        const permissions = storage.getItem('permissionList') || []
        // 检查当前用户是否有权限
        const hasPermission = checkAuthority(value, permissions);
        // 无权限时移除元素或清空内容
        if (!hasPermission) {
            if (el.parentNode) {
                el.parentNode.removeChild(el); // 如果有父节点，则从DOM中移除
            } else {
                el.innerHTML = ''; // 如果没有父节点，清空元素内容
            }
        } else {
            // 有权限时设置元素属性
            el && el.setAttribute('code', value)
        }
    }

}