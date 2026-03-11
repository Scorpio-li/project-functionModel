export default (el: any, binding: { value: any }) => {
  const menuId = binding.value
  if (!hasAuth(menuId)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}
